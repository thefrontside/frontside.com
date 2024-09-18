import type { JSXHandler } from "revolution";

import { useAppHtml } from "./app.html.tsx";

export function dxConsultingServicesRoute(): JSXHandler {
  return function* () {
    let heroAnimation = "../assets/animations/consulting-hero.json";
    let frustrationAnimation =
      "../assets/animations/consulting-frustration.json";
    let cycleAnimation = "../assets/animations/consulting-cycle.json";

    let dxProblems = "../assets/img/q3-2021/dx-problems.png";
    let dxFrustration = "../assets/img/q3-2021/dx-frustration.png";
    let dxTools = "../assets/img/q3-2021/dx-tools.png";
    let dxCycle = "../assets/img/q3-2021/dx-cycle.png";
    let dxDecoupled = "../assets/img/q3-2021/dx-decoupled.png";
    let dxLocalDev = "../assets/img/q3-2021/dx-local-dev.png";
    let dxTesting = "../assets/img/q3-2021/dx-shift-left-testing.png";

    let AppHtml = yield* useAppHtml({
      title: "DX Consulting for Cloud native teams",
      description:
        "Frontside helps Cloud native orgs create Developer Experiences that put the joy back in productivity",
      ogImage: "../assets/img/q3-2021/meta-backstage.png",
      twitterXImage: "../assets/img/q3-2021/meta-backstage.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <header class="items-start lg:items-end lg:gap-x-8 grid xl:grid-cols-2 mx-auto mb-36 lg:px-8 p-8 max-w-screen-2xl">
            <div class="lg:px-0 pt-10 lg:pt-2 pb-12 sm:pb-8">
              <div class="mx-auto lg:mx-0 max-w-2xl">
                <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                  <span class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#8c7db3] text-transparent">
                    Developer Experience:
                  </span>{" "}
                  where product delivery and talent rentention meet
                </h1>
                <p class="mt-6 text-gray-600 text-xl leading-8">
                  Frontside helps Cloud Native orgs create Developer Experiences
                  that put the joy back in productivity
                </p>
                <a
                  data-tf-popup="n5Hz8E9N"
                  data-tf-opacity="100"
                  data-tf-size="100"
                  data-tf-iframe-props="title=Request a DX assessment"
                  data-tf-transitive-search-params
                  data-tf-medium="snippet"
                  data-tf-hidden="topic=dx"
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
                  Request a DX assessment
                </a>
              </div>
            </div>
            <div class="relative mx-auto md:w-3/4 xl:w-full md:h-3/4 xl:h-full self-start">
              <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
              </script>
              <lottie-player
                src={heroAnimation}
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
          <section class="mt-36 mb-36 p-8">
            <figure class="mx-auto max-w-screen-md text-center">
              <svg
                class="mx-auto mb-3 w-10 h-10 text-gray-400 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <blockquote>
                <p class="font-medium text-3xl text-gray-700 dark:text-white italic">
                  “Frontside has an unwavering commitment to Developer
                  Experience and quality. They make sure everything we do is
                  repeatable and scalable.”
                </p>
              </blockquote>
              <figcaption class="flex justify-center items-center mt-6">
                <footer class="flex items-center space-x-3">
                  <cite class="font-medium text-gray-900 dark:text-white pe-8">
                    Brian Beale
                  </cite>
                  <span class="text-gray-500">|</span>
                  <cite class="text-gray-500 text-sm dark:text-gray-400 ps-10">
                    Director of Software Engineering at Resideo
                  </cite>
                </footer>
              </figcaption>
            </figure>
          </section>
          <section class="bg-gray-50 mt-24 md:py-20 lg:py-24 xl:py-30 p-8">
            <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  Developers' problems are{" "}
                  <span class="text-[#26abe8]">business problems</span>
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  There’s a clear path from engineers complaining about being
                  blocked to managers concerned about burnout rates to
                  leadership worried about deadlines being continuously pushed
                  back. Frontside implements strategies that allow developers to
                  decouple their work from external dependencies to keep
                  shipping smoothly.
                </p>
              </div>
              <img class="md:order-first" src={dxProblems} alt="" />
            </div>
            <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
              <div class="px-4">
                <h3 class="font-bold text-3xl text-blue-primary">
                  Engineers have{"  "}
                  <span class="text-[#26abe8]">less patience</span>{" "}
                  for frustrating jobs
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Developers don’t just get frustrated with workflow
                  obstacles—they leave. When roadblocks hinder progress, they
                  seek new opportunities where they can rediscover the joy of
                  coding. Frontside proactively identifies pain points in your
                  development process, helping your team stay productive,
                  engaged, and on time.
                </p>
              </div>
              <lottie-player
                src={frustrationAnimation}
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
                  Sharp engineers need{" "}
                  <span class="text-[#26abe8]">sharp tools</span>
                  {" "}
                </h3>
                <p class="py-4 text-gray-600 text-lg leading-8">
                  Dealing with unreliable CI/CD integrations or outdated
                  patterns turns development into a bureaucratic chore rather
                  than a creative pursuit. Frontside helps transform your
                  development workflow into an inspiring experience for both
                  developers and management.
                </p>
              </div>
              <img class="md:order-first" src={dxTools} alt="" />
            </div>
          </section>

          <section>
            <div class="mx-auto pt-24 sm:pt-32 text-center">
              <div class="mx-auto px-6 lg:px-8 max-w-7xl">
                <div class="mx-auto max-w-2xl">
                  <p class="font-semibold text-base text-indigo-600 leading-7">
                    Need a tag Line
                  </p>
                  <h2 class="mt-2 font-bold text-4xl text-gray-900 sm:text-6xl tracking-tight">
                    Ship faster &amp; happier
                  </h2>
                  <p class="mt-6 text-gray-600 text-lg leading-8">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div class="mx-auto px-6 lg:px-8 max-w-7xl">
                <div class="mx-auto mt-16 sm:mt-20 lg:mt-24 max-w-2xl lg:max-w-none">
                  <dl class="gap-x-8 gap-y-16 grid grid-cols-1 max-w-xl lg:max-w-none">
                    <div class="flex flex-col">
                      <dt class="flex items-center gap-x-3 font-semibold text-xl leading-7 gray-900">
                        <svg
                          class="flex-none w-5 h-5 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Decoupled teams are happier teams
                      </dt>
                      <dd class="flex flex-col flex-auto mt-4 text-base text-gray-600 leading-7">
                        <p class="flex-auto prose prose-lg">
                          The obstacles preventing developers from feeling
                          productive can appear outside of your control. Typical
                          development processes can lead to engineers being
                          blocked while another team rushes to finish a backend
                          service or waiting for an external API to get
                          upgraded. Frontside helps your team implement
                          decoupling strategies via simulation and
                          future-forward architecture advice so your developers
                          can continue working despite external dependencies.
                        </p>
                      </dd>
                    </div>
                    <div class="flex flex-col">
                      <dt class="flex items-center gap-x-3 font-semibold text-base text-gray-900 leading-7">
                        <svg
                          class="flex-none w-5 h-5 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Reliable local setup = sound production release
                      </dt>
                      <dd class="flex flex-col flex-auto mt-4 text-base text-gray-600 leading-7">
                        <p class="flex-auto prose prose-lg">
                          The success of Cloud native teams can feel
                          increasingly fragile when they depend on Cloud vendors
                          for crucial workflows such as authentication. These
                          services oftentimes lead to frustrations in the
                          development experience like integration blind spots or
                          security and compliance risks when using Cloud service
                          tokens. Frontside helps teams create a local
                          development environment that matches production
                          faithfully without exposing sensitive data.
                        </p>
                      </dd>
                    </div>
                    <div class="flex flex-col">
                      <dt class="flex items-center gap-x-3 font-semibold text-base text-gray-900 leading-7">
                        <svg
                          class="flex-none w-5 h-5 text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Simplified testing &rarr; shorter feedback loops{" "}
                      </dt>
                      <dd class="flex flex-col flex-auto mt-4 text-base text-gray-600 leading-7">
                        <p class="flex-auto prose prose-lg">
                          Frustration with testing in the development cycle
                          seems inevitable because too often tests are slow and
                          unreliable. At the same time, test data management can
                          be burdensome and quickly become outdated if not
                          managed correctly. Frontside helps teams structure a
                          robust testing strategy by making it easier for
                          developers to write and maintain meaningful tests that
                          reduce QA workload and minimize feedback loops.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>
          <section class="flex justify-center px-4 py-15 md:py-20 lg:py-24 xl:py-30">
            <a
              data-tf-popup="n5Hz8E9N"
              data-tf-opacity="100"
              data-tf-size="100"
              data-tf-iframe-props="title=Request a DX assessment"
              data-tf-transitive-search-params
              data-tf-medium="snippet"
              data-tf-hidden="topic=dx"
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
              Request a DX Assessment
            </a>
          </section>
          <script defer src="//embed.typeform.com/next/embed.js"></script>
        </article>
      </AppHtml>
    );
  };
}
