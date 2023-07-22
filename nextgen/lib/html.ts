import type { Params, ServeHandler } from "./types.ts";
import type { Operation } from "effection";

import { toHtml } from "https://esm.sh/hast-util-to-html@8.0.4";
import { assert } from "https://deno.land/std@0.148.0/_util/assert.ts";

import { twind } from "freejack/twind.ts";
import { URLContext } from "freejack/view.ts";

export interface HtmlHandler {
  (options: { params: Params; request: Request }): Operation<JSX.Element>;
}

export const html = {
  get(handler: HtmlHandler): ServeHandler {
    return {
      method: "GET",
      *middleware(params, request) {
        yield* URLContext.set(new URL(request.url));

        let top = yield* handler({ params, request });

        assert(top.type === "element");
        twind(top);

        let text = `<!DOCTYPE html>${toHtml(top)}<html>`;

        return new Response(text, {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "text/html",
          },
        });
      },
    };
  },
};
