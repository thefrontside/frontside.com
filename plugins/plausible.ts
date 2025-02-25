import { RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";

export function plausiblePlugin(): RevolutionPlugin {
  return {
    *html(request, next) {
      let html = yield* next(request);

      let body = select("body", html);

      body?.children.push({
        type: "element",
        tagName: "script",
        properties: {
          src: "https://plausible.io/js/script.js",
          defer: true,
          "data-domain": "frontside.com",
        },
        children: [],
      });

      return html;
    },
  };
}
