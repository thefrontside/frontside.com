import type { Operation } from "effection";
import { url } from "freejack/view.ts";

export function* AdvancedBackstagePluginDevelopmentHtml(): Operation<
JSX.Element
> {
  return (
    <article class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Currently under development
          </div>
        </div>
        <section class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become an Advanced Backstage Plugin Developer
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Our Advanced Plugin Development workshop is more than just a
            training program - it's a transformative experience designed to
            provide you with the skills, knowledge, and confidence to fully
            harness the power of Backstage. Be it integrating new
            functionalities or optimizing existing processes, this workshop will
            prepare you to tackle real-world challenges with ease.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              data-tf-popup="fNHxMLVS"
              data-tf-opacity="100"
              data-tf-size="100"
              data-tf-iframe-props="title=Advanced Plugin Develop Sign up Form"
              data-tf-transitive-search-params
              data-tf-medium="snippet"
              id="signup-for-workshop"
              href="#"
              class="w-full md:w-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Signup for waitlist ➡
            </a>
          </div>
        </section>
        <script src="//embed.typeform.com/next/embed.js"></script>
      </div>
      <section class="mt-12 md:grid md:grid-cols-2">
        <hgroup class="order-1">
          <h1 class="font-bold text-3xl leading-7">What you'll learn</h1>
          <p class="mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Etiam dolor justo, auctor sit amet odio at, efficitur consequat
            massa. Donec velit urna, tempor vitae libero eget, dignissim rutrum
            sem.
          </p>
        </hgroup>
        <img class="my-auto" alt="imagery depicting what you will learn" src={yield* url("assets/home-rethink.png")} />
      </section>
      <section class="mt-12 md:grid md:grid-cols-2">
        <hgroup>
          <h1 class="font-bold text-3xl leading-7">Why take this workshop?</h1>
          <p class="mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Etiam dolor justo, auctor sit amet odio at, efficitur consequat
            massa. Donec velit urna, tempor vitae libero eget, dignissim rutrum
            sem.
          </p>
        </hgroup>
        <img class="my-auto" alt="imagery depicting why take this workshop" src={yield* url("assets/home-shift-left.png")} />
      </section>
    </article>
  );
}
