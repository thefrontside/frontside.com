import type { SitemapRoute } from "../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";

export function contactRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate() }];
    },
    handler: function* () {
      let AppHtml = yield* useAppHtml({
        title: "Contact Frontside",
        description:
          "Get in touch with Frontside to discuss your project needs",
        ogImage: "/assets/index-meta-home-cloud-native.png",
        twitterXImage: "/assets/index-meta-home-cloud-native.png",
        author: "Frontside",
      });

      return (
        <AppHtml>
          <article>
            <section class="mx-auto px-8 lg:px-16 py-16 max-w-screen-2xl">
              <header class="mb-8 text-center">
                <h2 class="font-bold text-4xl text-blue-primary">Contact us</h2>
              </header>

              <div
                data-tf-widget="n5Hz8E9N"
                data-tf-opacity="100"
                data-tf-iframe-props="title=Contact Frontside"
                data-tf-transitive-search-params
                data-tf-medium="snippet"
                style="width: 100%; height: 600px;"
              >
              </div>
            </section>
            <script src="//embed.typeform.com/next/embed.js"></script>
          </article>
        </AppHtml>
      );
    },
  };
}
