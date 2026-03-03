import { call, createContext, Operation } from "effection";
import { existsSync } from "jsr:@std/fs";
import { parse } from "jsr:@std/yaml";

export interface People {
  getAll(): Person[];
  getCurrent(): Person[];
  get(slug: string): Person | undefined;
  getBySlug(slug: string): Person | undefined;
}

export interface Person {
  name: string;
  slug: string;
  title: string;
  location: string;
  img?: string;
  imgAlt?: string;
  intro: string;
  bio?: string;
  twitter?: string;
  github?: string;
  order: number;
  alumnus?: boolean;
}

interface Frontmatter {
  name: string;
  title: string;
  img?: string;
  imgAlt?: string;
  location: string;
  twitter?: string;
  github?: string;
  intro: string;
  bio?: string;
  order: number;
  alumnus?: boolean;
}

const PeopleContext = createContext<People>("people");

export function* usePeople(): Operation<People> {
  return yield* PeopleContext;
}

export function* initPeople(): Operation<void> {
  let dir = new URL(import.meta.resolve("./")).pathname;
  let entries = Deno.readDirSync(dir);
  let people = new Map<string, Person>();

  for (let entry of entries) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      let file = new URL(entry.name, import.meta.resolve("./"));
      if (existsSync(file)) {
        let slug = entry.name.replace(/\.md$/, "");
        let source = yield* call(() => Deno.readTextFile(file));

        // Parse frontmatter (YAML between --- delimiters)
        let frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          let frontmatter = parse(frontmatterMatch[1]) as Frontmatter;

          // Image is now relative to people directory
          let img = frontmatter.img;

          let person: Person = {
            name: frontmatter.name,
            slug: `/people/${slug}`,
            title: frontmatter.title,
            location: frontmatter.location,
            img,
            imgAlt: frontmatter.imgAlt,
            intro: frontmatter.intro,
            bio: frontmatter.bio,
            twitter: frontmatter.twitter,
            github: frontmatter.github,
            order: frontmatter.order || 999,
            alumnus: frontmatter.alumnus,
          };

          people.set(slug, person);
        }
      }
    }
  }

  // Sort by order field
  let sorted = [...people.values()].sort((a, b) => a.order - b.order);
  let current = sorted.filter((p) => !p.alumnus);

  yield* PeopleContext.set({
    getAll: () => sorted,
    getCurrent: () => current,
    get: (slug) => people.get(slug),
    getBySlug: (slug) => people.get(slug),
  });
}
