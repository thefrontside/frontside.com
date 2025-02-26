import { RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";

export interface UmamiOptions {
  enabled: boolean;
  umamiWebsiteID: string;
}

export function umamiPlugin(options: UmamiOptions): RevolutionPlugin {
  return {
    *html(request, next) {
      let html = yield* next(request);

      if (!options.enabled || !options.umamiWebsiteID) {
        return html;
      }

      let head = select("head", html);

      head?.children.push({
        type: "element",
        tagName: "script",
        properties: {
          src: "https://cloud.umami.is/script.js",
          defer: true,
          "data-website-id": options.umamiWebsiteID,
        },
        children: [],
      });

      return html;
    },
  };
}
