import type { JSXHandler } from "revolution";

import { useAppHtml } from "./app.html.tsx";
import { usePeople } from "../people/people.ts";

export function aboutRoute(): JSXHandler {
  return function* () {
    let hero = "../assets/img/q3-2021/about-hero.png";
    let decor1 = "../assets/img/q3-2021/about-decor-1.png";
    let decor2 = "../assets/img/q3-2021/about-decor-2.png";
    let decor3 = "../assets/img/q3-2021/about-decor-3.png";
    let decor4 = "../assets/img/q3-2021/about-decor-4.png";
    let decor5 = "../assets/img/q3-2021/about-decor-5.png";
    let decor6 = "../assets/img/q3-2021/about-decor-6.png";

    let peopleData = yield* usePeople();
    let people = peopleData.getAll();

    let AppHtml = yield* useAppHtml({
      title: "About Frontside",
      description:
        "We've been improving engineering orgs since 2005. A purposefully small group of engineers who want to create scale-ready tools.",
      ogImage: "/assets/img/q3-2021/about-hero.png",
      twitterXImage: "/assets/img/q3-2021/about-hero.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <header class="lg:gap-x-8 lg:grid lg:grid-cols-12 mx-auto mt-4 lg:px-8 p-8 lg:p-16 max-w-screen-2xl">
            <div class="lg:col-span-7 xl:col-span-6 lg:px-0 pt-10 lg:pt-2 pb-24 sm:pb-8">
              <div class="mx-auto lg:mx-0 max-w-2xl">
                <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                  We've been{" "}
                  <span class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#8c7db3] text-transparent">
                    improving
                  </span>{" "}
                  engineering orgs{" "}
                  <span class="text-[#26abe8]">since 2005</span>
                </h1>
                <p class="mt-6 text-gray-600 text-xl leading-8">
                  We are a purposefully small group of engineers who want to
                  create scale-ready tools.
                </p>
              </div>
            </div>
            <div class="relative lg:col-span-6 mx-auto sm:w-3/4 md:w-3/4 lg:w-full">
              <img src={hero} alt="" class="w-full h-auto" />
            </div>
          </header>

          <section class="mx-auto mt-20 px-8 lg:px-16 max-w-screen-2xl">
            <blockquote class="border-l-4 border-[#26abe8] pl-6 my-12 text-2xl text-gray-700 leading-relaxed italic">
              "Everyone at Frontside has a great attitude of{" "}
              <strong class="font-extrabold">can do</strong> and{" "}
              <strong class="font-extrabold">we will solve this</strong>. Their
              work ethic is strong, coupled with the desire to be a great
              partner."
            </blockquote>
            <p class="text-gray-600 text-lg italic">
              &mdash; Brian Beale, Director of Software Engineering at Resideo
            </p>

            <ul class="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20">
              <li class="relative p-8">
                <h3 class="mb-4 font-bold text-2xl text-blue-primary">
                  <span class="text-[#f74d7b]">We build</span>
                  <br />
                  long-lasting software
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  High-quality applications should not require re-writing every
                  few months or years. We design future-forward software system
                  with predictable long-term maintenance.
                </p>
                <img
                  src={decor1}
                  class="top-0 right-0 absolute w-16 h-16"
                  alt=""
                />
              </li>
              <li class="relative p-8">
                <h3 class="mb-4 font-bold text-2xl text-blue-primary">
                  <span class="text-[#26abe8]">We plan</span>
                  <br />
                  for evolution
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  The best version of your software always exists in the future.
                  We provide robust architectures and tools that enable your
                  team to experiment and pivot quickly.
                </p>
                <img
                  src={decor2}
                  class="top-0 right-0 absolute w-16 h-16"
                  alt=""
                />
              </li>
              <li class="relative p-8">
                <h3 class="mb-4 font-bold text-2xl text-blue-primary">
                  <span class="text-[#f74d7b]">We favor</span>
                  <br />
                  delivering consistently
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  Not delivering features fast enough can have costly
                  consequences. We equip your teams with the tools and know-how
                  to minimize regressions and shorten feedback loops.
                </p>
                <img
                  src={decor3}
                  class="top-0 right-0 absolute w-16 h-16"
                  alt=""
                />
              </li>
              <li class="relative p-8">
                <h3 class="mb-4 font-bold text-2xl text-blue-primary">
                  <span class="text-[#26abe8]">We care</span>
                  <br />
                  about developer experience
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  The right tools get more done swiftly and effortlessly. We
                  reduce bottlenecks and untangle technical complexities by
                  automating deployments and other repetitive tasks.
                </p>
                <img
                  src={decor4}
                  class="top-0 right-0 absolute w-16 h-16"
                  alt=""
                />
              </li>
              <li class="relative p-8">
                <h3 class="mb-4 font-bold text-2xl text-blue-primary">
                  <span class="text-[#f74d7b]">We lead</span>
                  <br />
                  with insight
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  The most substantial challenges in software design are not at
                  the codebase level. We develop deep relationships with our
                  clients to help them improve their velocity across the
                  organization.
                </p>
                <img
                  src={decor5}
                  class="top-0 right-0 absolute w-16 h-16"
                  alt=""
                />
              </li>
              <li class="relative p-8">
                <h3 class="mb-4 font-bold text-2xl text-blue-primary">
                  <span class="text-[#26abe8]">We work</span>
                  <br />
                  with OSS contributors
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  Our long-standing relationships with top performing experts
                  from the Open Source community allows us to bring you elite
                  level talent who can address short term needs and identify
                  issues on the horizon.
                </p>
                <img
                  src={decor6}
                  class="top-0 right-0 absolute w-16 h-16"
                  alt=""
                />
              </li>
            </ul>
          </section>

          <section class="mx-auto mt-32 px-8 lg:px-16 max-w-screen-2xl">
            <header class="mb-16 text-center">
              <h2 class="mb-4 font-bold text-4xl">
                <strong class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#f74d7b] text-transparent">
                  Meet the team
                </strong>
              </h2>
              <p class="text-gray-600 text-xl">
                We bring together people from interdisciplinary backgrounds.
              </p>
            </header>
            <ul class="gap-16 grid grid-cols-1">
              {people.map((person) => (
                <li class="items-center gap-12 grid grid-cols-1 md:grid-cols-2">
                  <div class="order-2 md:order-1">
                    <h3 class="mb-2 font-bold text-3xl text-blue-primary">
                      <a
                        href={person.slug}
                        class="hover:text-[#26abe8] hover:underline"
                      >
                        {person.name}
                      </a>
                    </h3>
                    <strong class="block mb-2 text-gray-700">
                      {person.title}
                    </strong>
                    <p class="mb-4 text-gray-600">{person.location}</p>
                    <p class="text-gray-600 leading-relaxed">{person.intro}</p>
                  </div>
                  <div class="order-1 md:order-2">
                    {person.img && (
                      <img
                        src={person.img}
                        alt={person.imgAlt}
                        class="rounded-lg w-full max-w-md h-auto"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </AppHtml>
    );
  };
}
