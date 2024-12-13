import { evaluate } from "npm:@mdx-js/mdx@3.1.0";
import remarkGfm from "npm:remark-gfm@4.0.0";
import remarkFrontmatter from "npm:remark-frontmatter@5.0.0";
import remarkMdxFrontmatter from "npm:remark-mdx-frontmatter@5.0.0";
import rehypePrismPlus from "npm:rehype-prism-plus@1.5.1";
import rehypeSlug from "npm:rehype-slug@5.1.0";
import { Fragment, jsx, JSXElement, jsxs } from "revolution/jsx-runtime";
import { call, createContext, Operation } from "effection";
import { existsSync } from "jsr:@std/fs";

export interface Blog {
  slice(...args: Parameters<Array<unknown>["slice"]>): BlogPost[];
  get(id: string): BlogPost | undefined;
  getPosts(): BlogPost[];
  getPostsByTag(tag: string): BlogPost[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string | undefined;
  date: Date;
  author: string;
  tags: Array<string>;
  content: () => JSXElement;
}

interface Frontmatter {
  title: string;
  image: string;
  description: string;
  author: string;
  tags: string[];
}

const BlogContext = createContext<Blog>("blog");

export function* useBlog(): Operation<Blog> {
  return yield* BlogContext;
}

export function* initBlog(): Operation<void> {
  let directory = new URL(import.meta.resolve("./")).pathname;
  let entries = Deno.readDirSync(directory);
  let matches = [...entries].flatMap((entry) => {
    let markdownfile = new URL(
      "index.md",
      import.meta.resolve(`./${entry.name}/`),
    );
    if (entry.isDirectory && existsSync(markdownfile)) {
      let [match] = [...entry.name.matchAll(/(\d{4})-(\d{2})-(\d{2})-.*/g)];
      if (match) {
        let [dirname, yearstring, monthstring, daystring] = match;
        let date = new Date(
          Number(yearstring),
          Number(monthstring) - 1,
          Number(daystring),
        );
        let datestring = `${yearstring}-${monthstring}-${daystring}`;
        let id = dirname;

        return [{ markdownfile, dirname, date, datestring, id }];
      }
    }
    return [];
  });

  let posts = new Map<string, BlogPost>();
  let tags = new Map<string, BlogPost[]>();

  for (let match of matches.toReversed()) {
    let { date, id } = match;
    let source = yield* call(() => Deno.readTextFile(match.markdownfile));
    let mod = yield* call(() =>
      evaluate(source, {
        jsx,
        jsxs,
        jsxDEV: jsx,
        Fragment,
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkGfm,
        ],
        rehypePlugins: [
	  rehypeSlug,
          [rehypePrismPlus, { showLineNumbers: true }],
        ],
      })
    );

    let frontmatter = mod.frontmatter as Frontmatter;

    let post = {
      ...frontmatter,
      id,
      date,
      content: () => {
        return mod.default({});
      },
    } satisfies BlogPost;

    posts.set(id, post);

    for (let tag of post.tags) {
      if (tags.has(tag)) {
        tags.get(tag.toLowerCase())!.push(post);
      } else {
        tags.set(tag.toLowerCase(), [post]);
      }
    }
  }

  let values = [...posts.values()].sort((a, b) =>
    b.date.getTime() - a.date.getTime()
  );

  yield* BlogContext.set({
    slice: (...args) => values.slice(...args),
    get: (id) => posts.get(id),
    getPosts: () => values,
    getPostsByTag: (tag) => tags.get(tag.toLowerCase()) ?? [],
  });
}
