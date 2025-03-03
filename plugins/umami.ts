import { HASTHtmlNode, RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";
import { createContext, type Operation } from "effection";
import type { Root } from "hast";

export interface UmamiOptions {
  enabled: boolean;
  websiteID?: string;
}

const UmamiContext = createContext<Required<UmamiOptions>>("umami");

export function* umamiPlugin(
  options: UmamiOptions,
): Operation<RevolutionPlugin> {
  if (options.enabled && !options.websiteID) {
    throw new Error(
      "UmamiPlugin: 'websiteId' is required but was not provided. Please pass it in as an option.",
    );
  }

  yield* UmamiContext.set(options as Required<UmamiOptions>);

  return {
    *html(request, next) {
      let html = yield* next(request);

      return yield* injectUmami(html);
    },
  };
}

export function* injectUmami(html: Root): Operation<HASTHtmlNode> {
  let head = select("head", html);

  let { enabled, websiteID } = yield* UmamiContext.expect();

  if (enabled) {
    head?.children.push({
      type: "element",
      tagName: "script",
      properties: {
        src: "https://cloud.umami.is/script.js",
        defer: true,
        "data-website-id": websiteID,
      },
      children: [],
    });
  }

  return html;
}
