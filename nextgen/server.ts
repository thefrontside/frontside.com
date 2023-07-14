import { serve } from "freejack/server.ts";
import { html } from "freejack/html.ts";
import { render } from "freejack/view.ts";

import { AppHtml, IndexHtml, WorkshopsHtml } from "./html.ts";

export default () =>
  serve({
    "/": html.get(() =>
      render(
        AppHtml({
          title: "Frontside",
          description:
            "DX Consulting for cloud native teams from best developers on the planet",
        }),
        IndexHtml(),
      )
    ),
    "/workshops/advanced-backstage-plugin-development": html.get(() =>
      render(
        AppHtml({
          title: "Frontside: Advanced Backstage Plugin Development",
          description:
            "Harness Backstage's Potential: Become an Advanced Plugin Developer",
        }),
        WorkshopsHtml(),
      )
    ),
  });
