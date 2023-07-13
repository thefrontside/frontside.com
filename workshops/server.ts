import { serve } from "freejack/server.ts";
import { html } from "freejack/html.ts";
import { render } from "freejack/view.ts";

import { AppHtml, IndexHtml } from "./html/templates.ts";

export default function* start() {
  return yield* serve({
    "/": html.get(function* () {
      return yield* render(
        AppHtml({ title: "Effection" }),
        IndexHtml(),
      );
    }),
  });
}
