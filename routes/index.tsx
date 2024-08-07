import type { JSXHandler } from "revolution";

import { useAppHtml } from "./app.html.tsx";

export function indexRoute(): JSXHandler {
  return function* () {
    let homeRethink = "../assets/home-rethink.png";
    let homeshiftleft = "../assets/home-shift-left.png";
    let homeinject = "../assets/home-inject.png";
    let backstageSight = "../assets/home-backstage-sight.png";
    let backstageDerisk = "../assets/home-backstage-derisk.png";
    let backstageShiftleft = "../assets/home-backstage-shift-left.png";
    let homeTensionGraph = "../assets/home-graph-tension.png";

    let AppHtml = yield* useAppHtml({
      title: "Frontside",
      description: "Frontside creates cohesive developer experiences for Cloud Native Teams",
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <header class="lg:gap-x-8 lg:grid lg:grid-cols-12 mx-auto mt-10 lg:px-8 max-w-screen-2xl">
            <div class="lg:col-span-7 xl:col-span-6 lg:px-0 pt-10 lg:pt-24 pb-24 sm:pb-32 lg:pb-56">
              <div class="mx-auto lg:mx-0 max-w-2xl">
                <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl tracking-tight">Empower your Developers from Onboarding to Production Release</h1>
                <p class="mt-6 text-gray-600 text-xl leading-8">Frontside creates cohesive development experiences for Cloud native teams – from local setup and testing to deployment and developer portals, we have you covered</p>
              </div>
            </div>
            <div class="relative lg:col-span-6">
              <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
              <lottie-player src="/assets/animations/home-hero.json" background="transparent" speed=".5" style="width: 100%; height: 100%" direction="1" mode="normal" loop autoplay></lottie-player>
            </div>
          </header>
          <section class="mx-auto mt-20 px-10 max-w-screen-2xl">
            {/* Client and Partner logos will go here */}
            <h2 class="font-bold text-blue-primary text-center text-xl">Trusted by the best companies in the world</h2>
            <div class="justify-items-center items-center gap-y-20 grid grid-cols-4 mx-auto mt-10">
              <img src="../assets/client-logos/grayscale-client-logos/apple-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/hp-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/ericcson-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/resideo-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/honeywell-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/hsbc-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/dell-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/altschool-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/ebsco-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/sxsw-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/condenast-logo-grayscale.svg" />
              <img src="../assets/client-logos/grayscale-client-logos/indeed-logo-grayscale.svg" />
            </div>
          </section>
          <section class="bg-gray-50 mt-24 px-4 py-15 md:py-20 lg:py-24 xl:py-30">
            <div class="items-center gap-24 md:grid md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  <span class="text-[#26abe8]">Re-think</span> productivity after Kubernetes
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Being Cloud native comes with its own challenges, especially for
                  your developers. Frontside brings in cross-functional consultants
                  who'll help you remove bottlenecks throughout your workflow and
                  propose game-changing strategies to boost your teams' success.
                </p>
              </div>
              <img class="order-first" src={homeRethink} alt="" />
            </div>
            <div class="items-center gap-24 md:grid md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  <span class="text-[#26abe8]">Shift-left</span> your testing strategy
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Automated testing is a cornerstone for on-time deliveries that work, but QA is a significant source of frustration. Using Open Source technologies, Frontside helps teams move tests inside the development cycle while making them both fast and reliable.
                </p>
              </div>
              <img src={homeshiftleft} alt="" />
            </div>
            <div class="items-center gap-24 md:grid md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  <span class="text-[#26abe8]">Inject</span> leadership into your team
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Most companies have great developers on their teams but lack the leadership to identify improvement opportunities and implement change. Frontside offers solutions cultivated from our network of enterprise partners and Open Source maintainers to create and nurture an Inner Source culture within your organization.
                </p>
              </div>
              <img class="order-first" src={homeinject} alt="" />
            </div>
          </section>
          <section class="grid grid-cols-2 max-w-6xl mx-auto">
            <div class="flex justify-center items-center">
                <h2 class="font-bold text-5xl sm:text-5xl text-blue-primary tracking-tight">
                  We help <br />
                  Developers thrive <br />
                  in complexity
                </h2>
            </div>
            <div class="">
              <img src={homeTensionGraph} alt="" />
            </div>
          </section>
          <section>
            <div class="bg-white py-24 sm:py-32">
              <div class="mx-auto px-6 lg:px-8 max-w-7xl">
                <div class="mx-auto max-w-2xl lg:text-center">
                  <h2 class="font-semibold text-[#f74d7b] text-base leading-7">Internal Developer Platforms & Developer Experience</h2>
                  <p class="mt-2 font-bold text-3xl text-blue-primary sm:text-4xl tracking-tight">Bring infrastructure, services, and people together with Backstage.</p>
                  <p class="mt-6 text-gray-600 text-lg leading-8">We help you adopt and extend Backstage to fit your organization's unique ecosystem</p>
                </div>
                <div class="mx-auto mt-16 sm:mt-20 lg:mt-24 max-w-2xl lg:max-w-none">
                  <dl class="gap-x-24 gap-y-16 grid grid-cols-1 lg:grid-cols-3 max-w-xl lg:max-w-none">
                    <div class="flex flex-col">
                      <dt class="flex items-center gap-x-3 font-semibold text-gray-900 text-lg leading-7">
                        Every Service in Sight.
                      </dt>
                      <dd class="flex flex-col flex-auto mt-4 text-base text-gray-600 leading-7">
                        <p class="flex-auto text-lg">With Backstage, you can align your organization's code, collaborators, and Cloud services and make the relationship visible and actionable for everyone.</p>
                        <img class="w-60 sm:w-60" src={backstageSight} alt="" />
                      </dd>
                    </div>
                    <div class="flex flex-col">
                      <dt class="flex items-center gap-x-3 font-semibold text-gray-900 text-lg leading-7">
                        Smarten up infrastructure cost
                      </dt>
                      <dd class="flex flex-col flex-auto mt-4 text-base text-gray-600 leading-7">
                        <p class="flex-auto text-lg">Backstage allows your teams to move faster but prevents costs from growing as well by bringing optimization closer to your developers.</p>
                        <img class="w-60 sm:w-60" src={backstageShiftleft} alt="" />
                      </dd>
                    </div>
                    <div class="flex flex-col">
                      <dt class="flex items-center gap-x-3 font-semibold text-gray-900 text-lg leading-7">
                        Derisk your implementation
                      </dt>
                      <dd class="flex flex-col flex-auto mt-4 text-base text-gray-600 leading-7">
                        <p class="flex-auto text-lg">Our deep expertise with Backstage’s constantly evolving alpha software means we can open up new frontiers for software organizations that guarantee long-term success.</p>
                        <img class="w-60 sm:w-60 h-auto" src={backstageDerisk} alt="" />
                      </dd>
                    </div>
                  </dl>
                  <div class="mt-16 text-center">
                    <a class="inline-flex items-center bg-gradient-to-r from-[#36baa2] to-[#44378a] p-8 rounded-lg font-bold text-lg text-white" href="/backstage">
                      <span class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.49 14.14" class="w-4 h-4">
                          <path d="M12.78 6.36c-.59-.58-1.19-1.16-1.78-1.72S9.74 3.51 9.09 3A33 33 0 0 0 5 0a32.16 32.16 0 0 0 3 4.08c.51.66 1.08 1.26 1.64 1.92l.1.11c-1.54 0-3.39.1-4.74.21a33.28 33.28 0 0 0-5 .78 33.28 33.28 0 0 0 5 .78c1.34.12 3.19.12 4.74.18l-.11.11C9.08 8.8 8.51 9.4 8 10.05a32.93 32.93 0 0 0-3 4.09 32.21 32.21 0 0 0 4.09-3c.65-.53 1.25-1.1 1.88-1.65s1.22-1.15 1.81-1.73l.71-.71Z" style="fill:#fff" />
                        </svg>
                      </span>
                      Learn how we implement Backstage
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </article>
      </AppHtml>
    )

  }
}