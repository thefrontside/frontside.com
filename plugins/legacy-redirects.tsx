import { compile, match } from "path-to-regexp";
import type { RevolutionPlugin } from "revolution";
import type { JSXElement } from "revolution/jsx-runtime";
import { toHtml } from "hast-util-to-html";
import type { SitemapRoute } from "./sitemap.ts";

const mappings: Record<string, string> = {
  "/bigtest/docs/interactors{/*rest}": "/interactors{/*rest}",
  "/bigtest{/*rest}": "https://bigtest.netlify.app/bigtest/:rest",
  "/talks{/*rest}": "/blog",
  "/ember-consulting": "/consulting",
  "/ember-training": "/consulting",
  "/services": "/consulting",
  "/tools": "/consulting",
  "/case-studies/": "/consulting",
  "/calendar": "/blog",
  "/calendar{/*rest}": "/blog",
  "/lunch-and-learn{/*rest}": "/blog",
  "/learning{/*rest}": "/blog",
  "/open-source": "/about",
  "/careers": "/about",
  "/style-guide": "/",

  "/people": "/about",
  "/people/arash-zafarnia": "/about",
  "/about/:name": "/people/:name",

  "/blog/tags/javascript/page/2/": "/tags",
  "/blog/tags/frp/": "/tags",
  "/blog/tags/mvc/": "/tags",
  "/blog/tags/javascript-functional-programming/": "/tags",
  "/blog/tags/component/": "/tags",
  "/blog/tags/awesome/": "/tags",
  "/blog/tags/ember-a11y/": "/tags",
  "/blog/tags/tvos/": "/tags",
  "/blog/2014/09/21/reactive-modeling-with-ember.html": "/blog",
  "/blog/2014/03/06/a-sprinkling-of-ember.html": "/blog",
  "/blog/2017-12-22-frontside-forecast-the-growing-importance-of-blockchains":
    "/blog",

  "/blog/:year/:month/:day/:slug": "/blog/:year-:month-:day-:slug",
  "/blog/tags/:slug": "/tags/:slug",
  "/blog/page/:page": "/blog/:page",

  "/podcast/page{/*rest}": "/podcast",
  "/podcast/115-testing-issues-and-bigtest-solutions":
    "/podcast/115-testing-issues-and-big-test-solutions",
  "/podcast/109-what-do-you-need-in-a-javascript-framework":
    "/podcast/109-what-do-you-need-in-a-java-script-framework",
  "/podcast/105-automating-github-with-probot":
    "/podcast/105-automating-git-hub-with-probot",
  "/podcast/100-100th-episode-celebration-with-brandon-hays":
    "/podcast/100-100-th-episode-celebration-with-brandon-hays",
  "/podcast/091-rxjs-with-ben-lesh-and-tracy-lee":
    "/podcast/091-rx-js-with-ben-lesh-and-tracy-lee",
  "/podcast/090-big-testing-in-javascript":
    "/podcast/090-big-testing-in-java-script",
  "/podcast/085-webassembly-with-jay-phelps":
    "/podcast/085-web-assembly-with-jay-phelps",
  "/podcast/080-resin-io-with-alison-davis-and-ronald-mccollam":
    "/podcast/080-resin-io-with-alison-davis-and-ronald-mc-collam",
  "/podcast/051-rust-and-apis-with-steve-klabnik":
    "/podcast/051-rust-and-ap-is-with-steve-klabnik",
  "/podcast/049-learning-elm-for-better-javascript-with-jamison-dance":
    "/podcast/049-learning-elm-for-better-java-script-with-jamison-dance",
  "/podcast/044-women-in-tech-and-shenomads-with-latoya-allen":
    "/podcast/044-women-in-tech-and-she-nomads-with-la-toya-allen",
  "/podcast/038-emberconf-2016-recap-and-highlights":
    "/podcast/038-ember-conf-2016-recap-and-highlights",
  "/podcast/032-working-remotely-with-allison-mcmillan":
    "/podcast/032-working-remotely-with-allison-mc-millan",
  "/podcast/021-best-of-emberconf-2015-part-2":
    "/podcast/021-best-of-ember-conf-2015-part-2",
  "/podcast/020-best-of-emberconf-2015-part-1":
    "/podcast/020-best-of-ember-conf-2015-part-1",
  "/podcast/015-domstep-with-jamison-dance":
    "/podcast/015-dom-step-with-jamison-dance/",
  "/podcast/013-ember-metal-htmlbars-and-the-death-of-script-tags":
    "/podcast/012-is-it-ok-to-not-love-programming-with-sarah-mei",
  "/podcast/009-how-to-tell-if-a-jquery-plugin-is-about-to-stab-you":
    "/podcast/009-how-to-tell-if-a-j-query-plugin-is-about-to-stab-you",
  "/podcast/004-emberconf-recap": "/podcast/004-ember-conf-recap",
};

const rules = Object.entries(mappings).map(([from, to]) => ({
  match: match(from, { decode: false }),
  generate: to.startsWith("http")
    ? (params: Record<string, string | string[]>) =>
        to.replace(/:(\w+)/g, (_, key) => {
          let val = params[key];
          return Array.isArray(val) ? val.join("/") : (val ?? "");
        })
    : compile(to, { encode: false }),
}));

const exactRedirects = Object.keys(mappings).filter(
  (from) => !from.includes(":") && !from.includes("*"),
);

export function redirectsRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate() }];
    },
    handler: function* () {
      return (
        <html>
          <head>
            <title>Redirects</title>
          </head>
          <body>
            <ul>
              {exactRedirects.map((path) => (
                <li>
                  <a href={path}>{path}</a>
                </li>
              ))}
            </ul>
          </body>
        </html>
      );
    },
  };
}

export function legacyRedirectsPlugin(): RevolutionPlugin {
  return {
    *http(request, next) {
      let url = new URL(request.url);
      let pathname = url.pathname.replace(/\/$/, "") || "/";

      for (let rule of rules) {
        let result = rule.match(pathname);
        if (result) {
          let target = rule.generate(result.params);
          let tree = (
            <html>
              <head>
                <meta http-equiv="refresh" content={`0;url=${target}`} />
                <link rel="canonical" href={target} />
              </head>
              <body>
                <a href={target}>Moved to {target}</a>
              </body>
            </html>
          );
          return new Response(`<!DOCTYPE html>${toHtml(tree)}`, {
            headers: { "content-type": "text/html; charset=utf-8" },
          });
        }
      }

      return yield* next(request);
    },
  };
}
