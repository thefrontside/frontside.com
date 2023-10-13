import { serve } from "freejack/server.ts";
import { html } from "freejack/html.ts";
import { render } from "freejack/view.ts";

import { GatsbyWebsite } from "../legacy/gatsby-website.ts";

import { AdvancedBackstagePluginDevelopmentHtml, AppHtml } from "../html.ts";

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
    "(.*)": GatsbyWebsite,
  });
