import type { SitemapRoute } from "../../../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "../../app.html.tsx";

export function resideoBackstageCaseStudyRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate() }];
    },
    handler: function* () {
    let greenblueIndicatorScreenshot =
      "../../../assets/img/2021-casestudy-resideo-backstage/backstage-indicator-catalog.png";
    let scaffoldScreenshot =
      "../../../assets/img/2021-casestudy-resideo-backstage/backstage-scaffolding.png";

    let AppHtml = yield* useAppHtml({
      title:
        "Case study: Boosting Resideo's Developers Experience with Backstage",
      description:
        "Discover how we enhanced Resideo's Developer Experience using Backstage. Our approach ensures long-term success by maximizing the potential of Backstage for your team.",
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article class="mx-auto px-12 p-8 text-blue-primary prose prose-lg">
          <header>
            <span class="color-inherit">Case Study</span>
            <h1 class="text-blue-primary">
              Boosting Resideo's Developers Experience with Backstage
            </h1>
          </header>
          <section>
            <p>
              Resideo is a global leader in smart home products and systems.
              With headquarters in Austin, Texas but teams distributed across
              the world, visibility and technical cohesiveness is a system-wide
              challenge. Frontside helped Resideo set up and customize Backstage
              to enable org-wide service discoverability, standardize access to
              documentation across teams and languages, and kick-start
              ship-ready projects.
            </p>
            <h2 class="text-blue-primary">
              All services and releases at sight
            </h2>
            <p>
              Resideo has several dozen Cloud services and uses a Blue-Green
              strategy for new releases. Leveraging the Backstage Catalog,
              Frontside empowered everyone in the engineering organization to
              experience a uniform way of viewing these services and accessing
              their repositories, documentation, and the people behind them.
            </p>
            <p>
              Frontside also introduced a Blue-Green indicator into
              Resideo&#39;s Catalog so anyone could immediately know the release
              status, effectively eliminating the uncertainty teams often
              experienced about the deployment state of their services.
            </p>
            <figure>
              <img
                src={greenblueIndicatorScreenshot}
                alt="Screenshot showing Backstage interface with green and blue indicators representing deployment status of services."
              />
              <figcaption>
                Backstage interface with deployment indicators
              </figcaption>
            </figure>
            <h2 class="text-blue-primary">
              New Projects with miles of a headstart
            </h2>
            <p>
              As Resideo continues to grow, new services need to be developed,
              tested, and deployed regularly. Frontside showed how they could
              build effective templates web UI, infrastructure, and data
              modeling that could quickly spin up a full-stack project and
              provide a helpful starting point—without falling into rigid
              patterns or premature optimizations. Thanks to Backstage
              Scaffolding, Frontside is helping Resideo teams begin projects
              with a ready-to-ship foundation to minimize time-to-market and
              reduce fragmentation in the engineering organization.
            </p>
            <figure>
              <img
                src={scaffoldScreenshot}
                alt="Screenshot of Backstage Scaffolding feature in Resideo"
              />
            </figure>
            <h2 class="text-blue-primary">
              A unified reference for documentation
            </h2>
            <p>
              Like Cloud native organizations, Resideo allows teams to choose
              their toolset and therefore documentation practices, with styles
              ranging from auto-generated JavaDoc APIs to handwritten
              markdown-based guides. Frontside helped Resideo implement
              Backstage’s TechDocs so everyone had a uniform method for
              accessing each project’s documentation. Additionally, Frontside
              introduced a CLI-based command to allow developers to access the
              documentation of any Resideo service without leaving their work
              environment.
            </p>
            <h2 class="text-blue-primary">Discover, use, create</h2>
            <p>
              Backstage enables organizations to discover new possibilities
              through its Catalog, but that&#39;s only the first step. Resideo
              continues to partner with Frontside to help their engineers
              understand how to go beyond Backstage’s available services and use
              its resources to create new apps and features and improve their
              services, code, and infrastructure.
            </p>
            <p>
              Frontside is your go-to partner for adopting Backstage on your
              terms and making the most out of it—without worrying about
              utilizing alpha software or forking out of the OSS community.
            </p>
            <a
              data-tf-popup="n5Hz8E9N"
              data-tf-opacity="100"
              data-tf-size="100"
              data-tf-iframe-props="title=Adopt Backstage without Forking"
              data-tf-transitive-search-params
              data-tf-medium="snippet"
              data-tf-hidden="topic=backstage"
              id="landing-top"
              href="#"
              class="inline-flex justify-center items-center bg-gradient-to-r from-[#099279] to-[#322678] shadow-blue-box m-auto mt-16 px-14 py-7 rounded-md hover:ring w-full md:w-auto font-semibold text-center text-sm text-white text-xl hover:outline-indigo-600 no-underline"
            >
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 13.49 14.14"
                  class="w-4 h-4"
                >
                  <path
                    d="M12.78 6.36c-.59-.58-1.19-1.16-1.78-1.72S9.74 3.51 9.09 3A33 33 0 0 0 5 0a32.16 32.16 0 0 0 3 4.08c.51.66 1.08 1.26 1.64 1.92l.1.11c-1.54 0-3.39.1-4.74.21a33.28 33.28 0 0 0-5 .78 33.28 33.28 0 0 0 5 .78c1.34.12 3.19.12 4.74.18l-.11.11C9.08 8.8 8.51 9.4 8 10.05a32.93 32.93 0 0 0-3 4.09 32.21 32.21 0 0 0 4.09-3c.65-.53 1.25-1.1 1.88-1.65s1.22-1.15 1.81-1.73l.71-.71Z"
                    style="fill:#fff"
                  />
                </svg>
              </span>
              Adopt Backstage with Frontside
            </a>
          </section>
        </article>
        <script defer src="//embed.typeform.com/next/embed.js"></script>
      </AppHtml>
    );
  },
  };
}
