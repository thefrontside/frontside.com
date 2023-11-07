import { serve } from "freejack/server.ts";
import { html } from "freejack/html.ts";
import { render } from "freejack/view.ts";

import { GatsbyWebsite } from "../legacy/gatsby-website.ts";

import { AdvancedBackstagePluginDevelopmentHtml, AppHtml } from "../html.ts";

import { proxy } from "./proxy.ts";

export default () =>
  serve({
    "/workshops/advanced-backstage-plugin-development": html.get(() =>
      render(
        AppHtml({
          title: "Frontside: Advanced Backstage Plugin Development",
          description:
            "Harness Backstage's Potential: Become an Advanced Plugin Developer",
          ogImage: "/assets/pluginWorkshopHeaderImagev2.png",
          twitterXImage: "/assets/pluginWorkshopHeaderImagev2.png",
          author: "Frontside",
        }),
        AdvancedBackstagePluginDevelopmentHtml(),
      )
    ),
    "/effection(.*)": proxy({
      prefix: "effection",
      website: "https://effection.deno.dev",
    }),
    "/graphgen(.*)": proxy({
      prefix: "graphgen",
      website: "https://graphgen.deno.dev",
    }),
    "(.*)": GatsbyWebsite,
  });
