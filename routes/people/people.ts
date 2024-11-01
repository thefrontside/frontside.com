import type { Operation } from "effection";
import { isFile } from "https://deno.land/x/deno_cache@0.4.1/util.ts";
import { parse, stringify } from "jsr:@std/yaml@1.0.5";
export interface Person {
  name: string;
  title: string;
  location: string;
  image: string;
  imgAlt: string;
  twitter: string;
  github: string;
  intro: string;
  order: number;
  alumnus: boolean;
}

export const people: Person[] = [];

const decoder = new TextDecoder();

for (const entry of Deno.readDirSync(import.meta.dirname!)) {
  if (entry.isFile && entry.name.endsWith(".yml")) {
    let content = Deno.readFileSync(`${import.meta.dirname}/${entry.name}`);

    let person = parse(decoder.decode(content));

    people.push(person as Person);
  }
}
