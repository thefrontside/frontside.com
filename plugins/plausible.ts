import { RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";

export interface PlausibleOptions {
  enabled: boolean;
}

export function plausiblePlugin(options: PlausibleOptions): RevolutionPlugin {
  return {
    *html(request, next) {
      let html = yield* next(request);

      if (!options.enabled) {
        return html;
      }

      let head = select("head", html);

      head?.children.push({
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
