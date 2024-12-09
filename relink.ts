import {fromHtml} from 'npm:hast-util-from-html';
import { toHtml } from "npm:hast-util-to-html";
import { toText } from 'npm:hast-util-to-text';
import { visit } from 'npm:unist-util-visit';
import { select } from "npm:hast-util-select@6.0.1";

let [filename] = Deno.args;

let text = Deno.readFileSync(filename);

let hast = fromHtml(text);

visit(hast, (node, index, parent) => {
  if (node.type === "element" && node.tagName === "a") {
    let text = toText(node);
    let replacement = { type: "text", value: `[${text}](${node.properties.href!})`} as const;
    parent?.children.splice(index!, 1, replacement);
    console.log(`--`, toHtml(node));
    console.log(`++`, toHtml(replacement));
  }
})

let body = select("body", hast)!;

Deno.writeTextFileSync(filename, toHtml(body.children));
