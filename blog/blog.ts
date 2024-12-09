import { evaluate } from "npm:@mdx-js/mdx@3.1.0";
import remarkGfm from "npm:remark-gfm@4.0.0";
import remarkFrontmatter from "npm:remark-frontmatter@5.0.0";
import remarkMdxFrontmatter from "npm:remark-mdx-frontmatter@5.0.0";
import rehypePrismPlus from "npm:rehype-prism-plus@1.5.1";
import { selectAll } from "npm:hast-util-select@6.0.1";
import { Fragment, jsx, JSXElement, jsxs } from "revolution/jsx-runtime";
import { call, createContext, Operation } from "effection";

export interface Blog {
  get(id: string): BlogPost | undefined;
  getPosts(): BlogPost[];
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
  let matches = [...entries].map((
    entry,
  ) => [...entry.name.matchAll(/(\d{4})-(\d{2})-(\d{2})-.*\.md$/g)]).filter((
    [match],
  ) => !!match).map(([match]) => {
    let [filename, yearstring, monthstring, daystring] = match;
    let date = new Date(
      Number(yearstring),
      Number(monthstring) - 1,
      Number(daystring),
    );
    let datestring = `${yearstring}-${monthstring}-${daystring}`;
    let id = filename.slice(0, -3);
    return { filename, date, datestring, id };
  });

  let posts = new Map<string, BlogPost>();

  for (let match of matches.toReversed()) {
    let { date, id } = match;
    let location = new URL(import.meta.resolve(`../blog/${match.filename}`));
    let source = yield* call(() => Deno.readTextFile(location));
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
          [rehypePrismPlus, { showLineNumbers: true }],
        ],
      })
    );

    let frontmatter = mod.frontmatter as Frontmatter;

    posts.set(id, {
      ...frontmatter,
      image: frontmatter.image ? `${id}/${frontmatter.image}` : undefined,
      id,
      date,
      content: () => {
        let element = mod.default({}) as JSXElement;
        let elements = selectAll("[href],[src]", element);

        for (let element of elements) {
          let properties = element.properties!;

          if (typeof properties.href === 'string' && !properties.href.startsWith("/")) {
            properties.href = `${id}/${properties.href}`;
          }
          if (properties.src) {
            properties.src = `${id}/${properties.src}`;
          }
        }
        return element;
      },
    });
  }

  yield* BlogContext.set({
    get: (id) => posts.get(id),
    getPosts: () => [...posts.values()],
  });
}
