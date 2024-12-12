import { main, suspend } from "effection";

import { createRevolution, route } from "revolution";

// Routes
import { proxyRoute } from "./routes/proxy-route.ts";
import { assetsRoute } from "./routes/assets-route.ts";
import { indexRoute } from "./routes/index.tsx";
import { backstageServicesRoute } from "./routes/backstage.html.tsx";
import { dxConsultingServicesRoute } from "./routes/dx-consulting.html.tsx";
import { pluginWorkshopRoute } from "./routes/advanced-backstage-plugin-development-route.tsx";
import { resideoBackstageCaseStudyRoute } from "./routes/work/case-studies/case-study-resideo.html.tsx";

import { etagPlugin } from "./plugins/etag.ts";
import { currentRequestPlugin } from "./plugins/current-request.ts";
import { twindPlugin } from "./plugins/twind.ts";
import { config } from "./twind.config.ts";
import { blogPostRoute } from "./routes/blog-post-route.tsx";
import { blogIndexRoute } from "./routes/blog-index-route.tsx";
import { blogTagRoute } from "./routes/blog-tag-route.tsx";

await main(function* () {
  let proxies = proxySites();

  let revolution = createRevolution({
    app: [
      route("/", indexRoute()),
      route("/blog", blogIndexRoute()),
      route("/blog/:id", yield* blogPostRoute()),
      route("/blog/tags/:tag", blogTagRoute()),
      route("/blog(.*)", assetsRoute("blog")),
      route("/backstage", backstageServicesRoute()),
      route("/dx-consulting", dxConsultingServicesRoute()),
      route("/work/case-studies/resideo", resideoBackstageCaseStudyRoute()),
      route(
        "/workshops/advanced-backstage-plugin-development",
        pluginWorkshopRoute(),
      ),
      route("/effection(.*)", proxyRoute(proxies.effection)),
      route("/graphgen(.*)", proxyRoute(proxies.graphgen)),
      route("/assets(.*)", assetsRoute("assets")),
      route("/interactors(.*)", proxyRoute(proxies.interactors)),
      proxyRoute(proxies.legacy),
    ],

    plugins: [
      etagPlugin(),
      currentRequestPlugin(),
      twindPlugin({ config }),
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
      website: Deno.env.get("EFFECTION_URL") ?? "https://effection.deno.dev",
    },
    interactors: {
      prefix: "interactors",
      root: "interactors/",
      website: Deno.env.get("INTERACTORS_URL") ?? "https://interactors.deno.dev"
    },
    graphgen: {
      prefix: "graphgen",
      website: Deno.env.get("GRAPHGEN_URL") ?? "https://graphgen.deno.dev",
    },
    legacy: {
      prefix: "",
      website: Deno.env.get("FS_LEGACY_URL") ?? "https://frontside.netlify.app",
    },
  } as const;
}
