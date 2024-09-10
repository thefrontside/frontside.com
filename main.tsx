import { main, suspend } from "effection";

import { createRevolution, route } from "revolution";

// Routes
import { proxyRoute } from "./routes/proxy-route.ts";
import { assetsRoute }  from "./routes/assets-route.ts";
import { indexRoute } from "./routes/index.tsx";
import { backstageServicesRoute } from "./routes/backstage.html.tsx";
import { pluginWorkshopRoute } from "./routes/advanced-backstage-plugin-development-route.tsx";
import { resideoBackstageCaseStudyRoute } from "./routes/case-study-resideo.html.tsx";

import { etagPlugin } from "./plugins/etag.ts";
import { currentRequestPlugin } from "./plugins/current-request.ts";
import { twindPlugin } from "./plugins/twind.ts";
import { config } from "./twind.config.ts";


await main(function* () {
  let proxies = proxySites();

  let revolution = createRevolution({
    app: [
      route("/",indexRoute()),
      route("/backstage", backstageServicesRoute()),
      route("/work/case-studies/resideo", resideoBackstageCaseStudyRoute()),
      route(
        "/workshops/advanced-backstage-plugin-development",
        pluginWorkshopRoute(),
      ),
      route("/effection(.*)", proxyRoute(proxies.effection)),
      route("/graphgen(.*)", proxyRoute(proxies.graphgen)),
      route("/assets(.*)", assetsRoute("assets")),
      proxyRoute(proxies.legacy),
    ],

    plugins: [
      etagPlugin(),
      currentRequestPlugin(),
      twindPlugin({ config }),
    ],
  });

  let server = yield* revolution.start({port: 8005});
  console.log(`www -> http://${server.hostname}:${server.port}`);

  yield* suspend();
});

function proxySites() {
  return {
    effection: {
      prefix: "effection",
      website: Deno.env.get("EFFECTION_URL") ?? "https://effection.deno.dev",
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
