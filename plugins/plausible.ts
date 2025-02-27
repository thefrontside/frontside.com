import { HASTHtmlNode, RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";
import { createContext, type Operation } from "effection";
import { type Root } from "hast";

export interface PlausibleOptions {
  enabled: boolean;
}

const PlausibleContext = createContext<PlausibleOptions>("plausible");

export function* plausiblePlugin(
  options: PlausibleOptions,
): Operation<RevolutionPlugin> {
  yield* PlausibleContext.set(options);

  return {
    *html(request, next) {
      let html = yield* next(request);

      return yield* injectPlausible(html);
    },
  };
}

export function* injectPlausible(html: Root): Operation<HASTHtmlNode> {
  let { enabled } = yield* PlausibleContext.expect();

  if (enabled) {
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
  }

  return html;
}
