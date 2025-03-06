import { HASTHtmlNode, RevolutionPlugin } from "revolution";
import { select } from "npm:hast-util-select";
import { createContext, type Operation } from "effection";
import { type Root } from "hast";

export interface MatomoOptions {
  enabled: boolean;
}

const MatomoContext = createContext<MatomoOptions>("Matomo");

export function* matomoPlugin(
  options: MatomoOptions,
): Operation<RevolutionPlugin> {
  yield* MatomoContext.set(options);

  return {
    *html(request, next) {
      let html = yield* next(request);

      return yield* injectMatomo(html);
    },
  };
}

export function* injectMatomo(html: Root): Operation<HASTHtmlNode> {
  let { enabled } = yield* MatomoContext.expect();

  if (enabled) {
    let head = select("head", html);

    head?.children.push({
      type: "element",
      tagName: "script",
      properties: {
        defer: true,
      },
      children: [
        {
          type: "text",
          value: `
           var _mtm = window._mtm = window._mtm || [];
           _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
           (function() {
             var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
             g.async=true; g.src='https://cdn.matomo.cloud/frontside.matomo.cloud/container_ORAOYPKO.js'; s.parentNode.insertBefore(g,s);
           })();
          `,
        },
      ],
    });
  }

  return html;
}
