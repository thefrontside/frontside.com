import type { JSXElement } from "revolution";

import { useAppHtml } from "./app.html.tsx";
import { sitemapped } from "../plugins/sitemap.ts";

export function backstageServicesRoute() {
  return sitemapped<JSXElement>(function* () {
    let backstageDomain = "../assets/img/q3-2021/backstage-map-domain.png";
    let deriskBackstage = "../assets/animations/backstage-derisk.json";
    let backstageDx = "../assets/img/q3-2021/backstage-integrate-dx.png";
    let backstageHeroAnimation = "../assets/animations/backstage-hero.json";

    let AppHtml = yield* useAppHtml({
      title: "Adopt Backstage your way with Frontside",
      description: "We help you get the most out of Backstage for the long-run",
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <header class="lg:gap-x-8 lg:grid lg:grid-cols-12 mx-auto mt-4 lg:px-8 p-8 lg:p-16 max-w-screen-2xl">
            <div class="lg:col-span-7 xl:col-span-6 lg:px-0 pt-10 lg:pt-2 pb-24 sm:pb-8">
              <div class="mx-auto lg:mx-0 max-w-2xl">
                <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                  <span class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#8c7db3] text-transparent">
                    We help you Own
                  </span>{" "}
                  your Backstage Implementation without Forking it
                </h1>
                <p class="mt-6 text-gray-600 text-xl leading-8">
                  We help enterprise teams get the most out of Backstage for the
                  long-run
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
                  class="inline-flex justify-center items-center bg-gradient-to-r from-[#099279] to-[#322678] shadow-blue-box m-auto mt-16 px-14 py-7 rounded-md hover:ring w-full md:w-auto font-semibold text-center text-sm text-white text-xl hover:outline-indigo-600"
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
              </div>
            </div>
            <div class="relative lg:col-span-6 mx-auto sm:w-3/4 md:w-3/4 lg:w-full h-64 md:h-3/4 lg:h-full">
              <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
              </script>
              <lottie-player
                src={backstageHeroAnimation}
                background="transparent"
                speed=".5"
                style="width: 100%; height: 100%"
                direction="1"
                mode="normal"
                loop
                autoplay
              >
              </lottie-player>
            </div>
          </header>
          <section class="mx-auto mt-20 px-10 max-w-screen-2xl">
            <h2 class="font-bold text-blue-primary text-center text-xl">
              Trusted by the best companies in the world
            </h2>
            <div class="justify-items-center items-center gap-y-20 grid grid-cols-2 lg:grid-cols-4 mx-auto mt-10">
              <img
                src="../assets/client-logos/grayscale-client-logos/apple-logo-grayscale.svg"
                alt="client logo Apple"
              />
              <img
                src="../assets/client-logos/grayscale-client-logos/hp-logo-grayscale.svg"
                alt="client logo HP"
              />
              <img
                src="../assets/client-logos/grayscale-client-logos/ericcson-logo-grayscale.svg"
                alt="client logo ericsson"
              />
              <img
                src="../assets/client-logos/grayscale-client-logos/indeed-logo-grayscale.svg"
                alt="client logo Indeed"
              />
            </div>
          </section>
          <section class="bg-gray-50 mt-24 px-4 py-15 md:py-20 lg:py-24 xl:py-30">
            <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  <span class="text-[#26abe8]">Master</span>{" "}
                  your ecosystem with Backstage
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Your combination of tech stack, services, and people is unique
                  to your organization. But you don't have to compromise your
                  needs to fit them into what Backstage supports today. As an
                  active contributor to Backstage, Frontside can help you cover
                  all your use-cases—even those not yet in platform—without
                  moving away from OSS.
                </p>
              </div>
              <img class="md:order-first" src={backstageDomain} alt="" />
            </div>
            <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  <span class="text-[#26abe8]">De-risk</span>{" "}
                  your Backstage adoption
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Avoid getting locked out of future Backstage upgrades with
                  uninformed early choices in your Backstage adoption. Frontside
                  understands Backstage's current alpha software limitations and
                  can help you set up the platform so you can get what you need
                  now and keep getting value in the long term.
                </p>
              </div>
              <lottie-player
                src={deriskBackstage}
                background="transparent"
                speed=".5"
                style="width: 100%; height: 100%"
                direction="1"
                mode="normal"
                loop
                autoplay
              >
              </lottie-player>
            </div>
            <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  <span class="text-[#26abe8]">Integrate</span>{" "}
                  Backstage in your DX
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Setting up Backstage's Catalog unleashes its power, but it's
                  only the beginning of the journey. Once developers familiarize
                  themselves with Backstage’s affordances, they'll uncover new
                  opportunities for growth and optimization. Frontside helps
                  your teams integrate more tools into Backstage and streamline
                  their workflow to take advantage of their new self-service
                  capabilities.
                </p>
              </div>
              <img class="md:order-first" src={backstageDx} alt="" />
            </div>
          </section>
          <section class="flex justify-center px-4 py-15 md:py-20 lg:py-24 xl:py-30">
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
              class="inline-flex justify-center items-center bg-gradient-to-r from-[#099279] to-[#322678] shadow-blue-box m-auto mt-20 mb-20 px-14 py-7 rounded-md hover:ring w-full md:w-auto font-semibold text-sm text-white text-xl hover:outline-indigo-600"
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
              Make Backstage work for you
            </a>
          </section>
          <section class="p-4">
            <div class="bg-[url('/assets/img/q3-2021/backgruond-blue-bubbles.png')] bg-no-repeat bg-center mx-auto p-10 rounded-lg text-center text-pretty text-white container">
              <header>
                <h3 class="mb-4 text-lg uppercase">Case Study</h3>
                <h2 class="mb-4 font-bold text-4xl">
                  Boosting Resideo's Developer Experience <br /> with Backstage
                </h2>
              </header>
              <p class="mx-auto mb-10 max-w-prose text-center text-xl leading-relaxed">
                Frontside helped Resideo set up and customize Backstage to
                enable org-wide service discoverability, standardize access to
                documentation across teams and languages, and kick-start
                ship-ready projects.
              </p>
              <a
                href="work/case-studies/resideo"
                class="inline-flex justify-center items-center bg-gradient-to-r from-[#f74d7b] via-[#44378a] to-[#26abe8] shadow-blue-box m-auto px-14 py-7 rounded-md hover:ring w-full md:w-auto font-semibold text-sm text-white text-xl justif hover:outline-indigo-600"
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
                Read More
              </a>
            </div>
          </section>
          <script defer src="//embed.typeform.com/next/embed.js"></script>
        </article>
      </AppHtml>
    );
  });
}
