import { main, suspend } from "effection";

import { createRevolution, route as $route } from "revolution";
import { route, sitemapPlugin } from "./plugins/sitemap.ts";

// Routes
import { proxyRoute } from "./routes/proxy-route.ts";
import { assetsRoute } from "./routes/assets-route.ts";
import { indexRoute } from "./routes/index.tsx";
import { aboutRoute } from "./routes/about.html.tsx";
import { contactRoute } from "./routes/contact.html.tsx";
import { codeOfConductRoute } from "./routes/code-of-conduct.html.tsx";
import { privacyPolicyRoute } from "./routes/privacy-policy.html.tsx";
import { backstageServicesRoute } from "./routes/backstage.html.tsx";
import { backstageSupportRoute } from "./routes/backstage/backstage-support.html.tsx";
import { dxConsultingServicesRoute } from "./routes/dx-consulting.html.tsx";
import { pluginWorkshopRoute } from "./routes/advanced-backstage-plugin-development-route.tsx";
import { resideoBackstageCaseStudyRoute } from "./routes/work/case-studies/case-study-resideo.html.tsx";
import { llmsTxtRoute } from "./routes/llms-txt-route.ts";
import { platformscriptRoute } from "./routes/platformscript-route.tsx";

import { etagPlugin } from "./plugins/etag.ts";
import { currentRequestPlugin } from "./plugins/current-request.ts";
import { twindPlugin } from "./plugins/twind.ts";
import { config } from "./twind.config.ts";
import { blogPostRoute } from "./routes/blog-post-route.tsx";
import { blogIndexRoute } from "./routes/blog-index-route.tsx";
import { blogTagRoute } from "./routes/blog-tag-route.tsx";
import { tagsRoute } from "./routes/tags-route.tsx";
import { initBlog } from "./blog/blog.ts";
import { initPeople } from "./people/people.ts";
import { personRoute } from "./routes/person-route.tsx";
import { podcastIndexRoute } from "./routes/podcast-index-route.tsx";
import { podcastEpisodeRoute } from "./routes/podcast-episode-route.tsx";
import { plausiblePlugin } from "./plugins/plausible.ts";
import { umamiPlugin } from "./plugins/umami.ts";
import { matomoPlugin } from "./plugins/matomo.ts";
import {
  legacyRedirectsPlugin,
  redirectsRoute,
} from "./plugins/legacy-redirects.tsx";

function redirect(to: string) {
  return function* () {
    return (
      <html>
        <head>
          <meta http-equiv="refresh" content={`0;url=${to}`} />
          <link rel="canonical" href={to} />
        </head>
        <body>
          <a href={to}>Moved to {to}</a>
        </body>
      </html>
    );
  };
}

await main(function* (args) {
  let dev = !!args.includes("--dev");
  let proxies = proxySites();

  yield* initBlog();
  yield* initPeople();

  let revolution = createRevolution({
    app: [
      route("/llms.txt", llmsTxtRoute()),
      route("/", indexRoute()),
      route("/about", aboutRoute()),
      route("/contact", contactRoute()),
      route("/code-of-conduct", codeOfConductRoute()),
      route("/privacy-policy", privacyPolicyRoute()),

      route("/people/:name", personRoute()),
      $route("/people/images/:file.(jpg|jpeg|png)", assetsRoute("people")),
      route("/blog", blogIndexRoute()),
      route("/blog/:id", blogPostRoute()),
      route("/blog/tags/:tag", blogTagRoute()),
      $route("/blog(.*)", assetsRoute("blog")),
      route("/tags", tagsRoute()),
      route("/podcast", podcastIndexRoute()),
      route("/podcast/:slug", podcastEpisodeRoute()),
      $route("/consulting", redirect("/dx-consulting")),
      route("/backstage", backstageServicesRoute()),
      route("/backstage/support", backstageSupportRoute()),
      $route("/backstage/resideo", redirect("/work/case-studies/resideo")),
      route("/dx-consulting", dxConsultingServicesRoute()),
      route("/work/case-studies/resideo", resideoBackstageCaseStudyRoute()),
      route(
        "/workshops/advanced-backstage-plugin-development",
        pluginWorkshopRoute(),
      ),
      route("/redirects", redirectsRoute()),
      route("/platformscript", platformscriptRoute()),
      $route("/platformscript/(.*)", redirect("/platformscript")),
      proxyRoute(proxies.effection),
      proxyRoute(proxies.graphgen),
      $route("/assets(.*)", assetsRoute("assets")),
      proxyRoute(proxies.interactors),
    ],

    plugins: [
      legacyRedirectsPlugin(),
      etagPlugin(),
      currentRequestPlugin(),
      sitemapPlugin(),
      twindPlugin({ config }),
      yield* plausiblePlugin({ enabled: !dev }),
      yield* umamiPlugin({
        enabled: !dev,
        websiteID: Deno.env.get("UMAMI_WEBSITE_ID"),
      }),
      yield* matomoPlugin({ enabled: !dev }),
    ],
  });

  let server = yield* revolution.start({ port: 8005 });
  let hostname = server.hostname === "0.0.0.0" ? "localhost" : server.hostname;
  console.log(`www -> http://${hostname}:${server.port}`);

  yield* suspend();
});

function proxySites() {
  return {
    effection: {
      prefix: "effection",
      website: Deno.env.get("EFFECTION_URL") ??
        "https://effection.netlify.app",
    },
    interactors: {
      prefix: "interactors",
      website: Deno.env.get("INTERACTORS_URL") ??
        "https://interactors.netlify.app",
    },
    graphgen: {
      prefix: "graphgen",
      website: Deno.env.get("GRAPHGEN_URL") ?? "https://graphgen-data.netlify.app",
    },
  } as const;
}
