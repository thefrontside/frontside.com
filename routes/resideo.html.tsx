import type { JSXHandler } from "revolution";

import { useAppHtml } from "./app.html.tsx";

export function resideoBackstageCaseStudyRoute(): JSXHandler {
  return function* () {
    let backstageDomain = "../assets/img/q3-2021/backstage-map-domain.png";

    let AppHtml = yield* useAppHtml({
      title: "Case study: Boosting Resideo's Developers Experience with Backstage",
      description: "Discover how we enhanced Resideo's Developer Experience using Backstage. Our approach ensures long-term success by maximizing the potential of Backstage for your team.",
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <header>
            <span>Case Study</span>
            <h2>Boosting Resideo's Developers Experience with Backstage</h2>
          </header>
        </article>
      </AppHtml >
    )

  }
}