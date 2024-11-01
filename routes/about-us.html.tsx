import type { JSXHandler } from "revolution";

import { useAppHtml } from "./app.html.tsx";

import { people } from "./people/people.ts";

export function aboutUsRoute(): JSXHandler {
  return function* () {
    let aboutHero = "../assets/img/q3-2021/about-hero.png";
    let cycleAnimation = "../assets/animations/consulting-cycle.json";

    let decor1 = "../assets/img/q3-2021/about-decor-1.png";
    let decor2 = "../assets/img/q3-2021/about-decor-2.png";
    let decor3 = "../assets/img/q3-2021/about-decor-3.png";
    let decor4 = "../assets/img/q3-2021/about-decor-4.png";
    let decor5 = "../assets/img/q3-2021/about-decor-5.png";
    let decor6 = "../assets/img/q3-2021/about-decor-6.png";

    let AppHtml = yield* useAppHtml({
      title:
        "Engineering Solutions for Future-Forward Organizations | Frontside",
      description:
        "Frontside partners with engineering teams to build long-lasting, scalable software solutions. With a focus on developer experience, we empower organizations to innovate quickly and consistently by providing robust architectures, tools, and insights that ensure success.",
      ogImage: "../assets/img/q3-2021/meta-backstage.png",
      twitterXImage: "../assets/img/q3-2021/meta-backstage.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <header class="items-start lg:items-end lg:gap-x-8 grid xl:grid-cols-2 mx-auto mb-36 lg:px-8 p-8 max-w-screen-2xl">
            <div class="lg:px-0 pt-10 lg:pt-2 pb-12 sm:pb-8 self-center">
              <div class="mx-auto lg:mx-0 max-w-2xl">
                <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                  We've been{" "}
                  <span class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#8c7db3] text-transparent">
                    improving engineering
                  </span>{" "}
                  orgs since 2005
                </h1>
                <p class="mt-6 text-gray-600 text-xl leading-8">
                  We are a purposefully small group of engineers who want to
                  create scale-ready tools.
                </p>
              </div>
            </div>
            <div class="relative mx-auto md:w-3/4 xl:w-full md:h-3/4 xl:h-full self-start">
              <img src={aboutHero} alt="" />
            </div>
          </header>
          <section class="mx-auto mt-20 px-10 max-w-screen-2xl">
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
                  “Everyone at Frontside has a great attitude of{" "}
                  <strong class="font-black">can do</strong> and{" "}
                  <strong class="font-black">we will solve this</strong>. Their
                  work ethic is strong, coupled with the desire to be a great
                  partner.”
                </p>
              </blockquote>
              <figcaption class="flex justify-center items-center mt-6">
                <footer class="flex items-center space-x-3">
                  <cite class="font-medium text-blue-primary dark:text-white pe-8">
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

          <section class="bg-gray-50 mt-24 md:py-20 lg:py-24 xl:py-30 p-8 pb-10">
            <ul class="grid md:grid-cols-2 max-w-screen-2xl">
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor1} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We build</span>
                    <span class="block">long-lasting software</span>
                  </h3>
                  <p class="prose">
                    Our goal is to create software that thrives—not just today
                    but in years to come. We prioritize thoughtful design and
                    long-term maintainability, minimizing technical debt and
                    ensuring resilience as needs evolve.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor2} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We plan</span>
                    <span class="block">for continuous evolution</span>
                  </h3>
                  <p class="prose">
                    Growth and change are part of every business. The best
                    version of your software always exists in the future. We
                    provide robust architectures and tools that enable your team
                    to experiment and pivot quickly.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor3} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We deliver</span>
                    <span class="block">
                      Sustainable and predictable outcomes
                    </span>
                  </h3>
                  <p class="prose">
                    Shipping features are critical, but consistency and quality
                    are essential. We focus on predictable, incremental
                    delivery, helping your team to develop tight feedback loops.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor4} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We care</span>
                    <span class="block">about developer experience</span>
                  </h3>
                  <p class="prose">
                    Developers perform their best with the right tools and
                    processes. We remove bottlenecks, automate repetitive tasks,
                    and streamline workflows to keep your team productive and
                    focused.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor6} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We lead</span>
                    <span class="block">with insight</span>
                  </h3>
                  <p>
                    The most substantial challenges in software design are not
                    at the codebase level. We develop deep relationships with
                    our clients to help them improve their velocity across the
                    organization.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor1} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We test</span>
                    <span class="block">throughly, everytime.</span>
                  </h3>
                  <p>
                    We don't cut corners when it comes to testing. Rigorous
                    testing practices—both are central to our process, ensuring
                    reliability, stability, and confidence in every release.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor2} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="font-black">We research</span>
                    <br />
                    with OSS community
                  </h3>
                  <p>
                    Our commitment to research and development keeps us ahead of
                    the curve. We continuously explore and evaluate emerging
                    technologies to assess their value and usefulness for our
                    clients and future projects. Beyond client work, we create
                    solutions that benefit the community at large.
                  </p>
                </div>
              </li>
              <li class="flex items-start mt-6">
                <div class="flex-shrink-0 mr-4 w-10 h-10">
                  <img src={decor6} alt="" />
                </div>
                <div>
                  <h3 class="mb-2 uppercase">
                    <span class="block font-black">We collaborate</span>
                    <span class="block">with OSS community</span>
                  </h3>
                  <p>
                    Our involvement in open-source connects us to the latest
                    innovations. By collaborating with top contributors, we
                    offer expertise that anticipates and solves challenges
                    early.
                  </p>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <div class="mx-auto pt-24 sm:pt-32">
              <div class="mx-auto px-6 lg:px-8 max-w-7xl">
                <div class="mx-auto max-w-2xl">
                  <p class="font-semibold text-[#f74d7b] text-base leading-7">
                    We punch above our weight class
                  </p>
                  <h2 class="mt-2 font-bold text-4xl text-blue-primary sm:text-4xl">
                    Meet the team
                  </h2>
                  <p class="mt-6 text-gray-600 text-lg leading-8">
                    The obstacles preventing developers from feeling productive
                    can appear outside of your control. Typical development
                    processes can lead to engineers being blocked while another
                    team rushes to finish a backend service or waiting for an
                    external API to get upgraded. Frontside helps your team
                    implement decoupling strategies via simulation and
                    future-forward architecture advice so your developers can
                    continue working despite external dependencies.
                  </p>
                </div>
              </div>

              <div>
                <ul class="flex flex-col items-center">
                  {people
                    .filter((person) => !person.alumnus)
                    .map((person) => {
                      return (
                        <li class="flex flex-col">
                          <div>
                            <img
                              src="person.image"
                              alt={person.imgAlt}
                              class="w-full h-full object-cover"
                            />
                          </div>
                          <div class="mt-4">
                            <h3 class="font-semibold text-lg">{person.name}</h3>
                            <strong class="block text-gray-700">
                              {person.title}
                            </strong>
                            <p class="text-gray-500">{person.location}</p>
                            <p class="mt-2 text-gray-600 text-sm prose">
                              {person.intro}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </section>
          <section class="flex justify-center px-4 py-15 md:py-10 lg:py-24 xl:py-12">
            <div class="bg-white">
              <div class="lg:flex lg:justify-between lg:items-center mx-auto px-6 lg:px-8 py-24 sm:py-32 max-w-7xl">
                <h2 class="md:mr-24 font-bold text-3xl text-blue-primary sm:text-4xl tracking-tight">
                  Ready to improve your DX?<br />{" "}
                  Let's talk about DX Consulting.
                </h2>
                <div class="flex items-center mt-10 lg:mt-0">
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
                </div>
              </div>
            </div>
          </section>
          <script defer src="//embed.typeform.com/next/embed.js"></script>
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
          </script>
        </article>
      </AppHtml>
    );
  };
}
