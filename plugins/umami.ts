import { RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";
import process from "node:process";

export interface UmamiOptions {
  enabled: boolean;
}

export function umamiPlugin(options: UmamiOptions): RevolutionPlugin {
  return {
    *html(request, next) {
      let html = yield* next(request);

      if (!options.enabled) {
        return html;
      }

      let head = select("head", html);

      const umamiId = Deno.env.get("UMAMI_WEBSITE_ID");

      if (!umamiId) {
        console.warn("Umami tracking ID is missing");
        return html;
      }

      head?.children.push({
        type: "element",
        tagName: "script",
        properties: {
          src: "https://cloud.umami.is/script.js",
          defer: true,
          "data-website-id": umamiId,
        },
        children: [],
      });

      return html;
    },
  };
}
