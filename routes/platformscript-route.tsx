import type { SitemapRoute } from "../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";

export function platformscriptRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate() }];
    },
    handler: function* () {
      let AppHtml = yield* useAppHtml({
        title: "PlatformScript - A Beautiful Experiment | Frontside",
        description:
          "PlatformScript was a declarative programming language with pure YAML syntax. Though the project has been sunset, the ideas live on in our other work.",
        ogImage: "/assets/index-meta-home-cloud-native.png",
        twitterXImage: "/assets/index-meta-home-cloud-native.png",
        author: "Frontside",
      });

      return (
        <AppHtml>
          <article>
            <header class="mx-auto mt-4 p-8 lg:p-16 lg:px-8 max-w-screen-2xl">
              <div class="mx-auto max-w-3xl text-center">
                <p class="mb-4 font-semibold text-[#f74d7b] text-base leading-7">
                  Sunset Project
                </p>
                <h1 class="font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                  Platform
                  <span class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#8c7db3] text-transparent">
                    Script
                  </span>
                </h1>
                <p class="mx-auto mt-6 max-w-2xl text-gray-600 text-xl leading-8">
                  A declarative programming language with pure YAML syntax.
                  Though the project has concluded, the ideas it explored
                  continue to shape our thinking.
                </p>
              </div>
            </header>

            <section class="mx-auto px-8 lg:px-16 max-w-3xl">
              <div class="border-[#26abe8] bg-blue-50 mb-12 p-8 border-l-4 rounded-r-lg">
                <p class="text-gray-700 text-lg leading-relaxed">
                  PlatformScript is no longer under active development. This
                  page serves as an archive of what we set out to do, what we
                  learned, and where those ideas went next.
                </p>
              </div>

              <h2 class="mb-6 font-bold text-3xl text-blue-primary">
                The Vision
              </h2>
              <p class="mb-4 text-gray-600 text-lg leading-relaxed">
                PlatformScript asked a bold question:{" "}
                <em>
                  what if YAML wasn't just a configuration format, but a
                  full-featured programming language?
                </em>
              </p>
              <p class="mb-4 text-gray-600 text-lg leading-relaxed">
		PlatformScript was born from a frustration shared by
                thousands of developers working with cloud-native
                tooling, drowning in an ocean of configuration
                hell. Instead of bolting templating engines onto YAML
                or escaping into another language entirely,
                PlatformScript treated YAML itself as the syntax for a
                real programming language&mdash;one with lexically
                scoped variables, first-class functions, a type
                system, and structured concurrency all baked in.
              </p>
              <p class="mb-12 text-gray-600 text-lg leading-relaxed">
                Every PlatformScript program was a valid YAML document. No
                magic functions, no magic variables&mdash;just a small,
                consistent set of evaluation rules that turned familiar data
                into executable code.
              </p>

              <h2 class="mb-6 font-bold text-3xl text-blue-primary">
                What We Learned
              </h2>
              <ul class="space-y-6 mb-12">
                <li class="flex items-start gap-4">
                  <span class="flex-shrink-0 mt-1 text-[#26abe8] text-xl">
                    &rarr;
                  </span>
                  <p class="text-gray-600 text-lg leading-relaxed">
                    <strong class="text-blue-primary">
                      Executable YAML changes everything.
                    </strong>{" "}
                    Having YAML that could actually run resolved so many of the
                    common headaches associated with feeding YAML into an
                    interpreter written in another language. Errors became
                    local, feedback was immediate, and the gap between what you
                    wrote and what executed disappeared entirely.
                  </p>
                </li>
                <li class="flex items-start gap-4">
                  <span class="flex-shrink-0 mt-1 text-[#26abe8] text-xl">
                    &rarr;
                  </span>
                  <p class="text-gray-600 text-lg leading-relaxed">
                    <strong class="text-blue-primary">
                      Structured concurrency is essential.
                    </strong>{" "}
                    Building structured concurrency into PlatformScript from
                    the start reinforced our conviction that it belongs at the
                    foundation of every runtime. This directly influenced our
                    continued investment in{" "}
                    <a
                      href="/effection"
                      class="font-semibold text-[#26abe8] hover:underline"
                    >
                      Effection
                    </a>
                    .
                  </p>
                </li>
                <li class="flex items-start gap-4">
                  <span class="flex-shrink-0 mt-1 text-[#26abe8] text-xl">
                    &rarr;
                  </span>
                  <p class="text-gray-600 text-lg leading-relaxed">
                    <strong class="text-blue-primary">
                      Developer tooling is non-negotiable.
                    </strong>{" "}
                    A static type system and language server weren't nice to
                    have&mdash;they were critical to the success of the whole
                    system. Without instant feedback, autocompletion, and
                    type-checked programs, the adoption was just too difficult.
                  </p>
                </li>
              </ul>

              <h2 class="mb-6 font-bold text-3xl text-blue-primary">
                The Archive
              </h2>
              <p class="mb-6 text-gray-600 text-lg leading-relaxed">
                The source code and documentation remain available for anyone
                curious about the approach.
              </p>
              <div class="flex flex-wrap gap-4 mb-12">
                <a
                  href="https://github.com/thefrontside/platformscript"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
                <a
                  href="https://platformscript.deno.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:border-gray-400 transition-colors"
                >
                  Archived Documentation
                </a>
              </div>
            </section>

            <section class="flex justify-center px-4 py-16 md:py-20">
              <div class="text-center">
                <p class="mb-6 text-gray-500 text-lg italic">
                  "Every experiment that ends teaches you where to go next."
                </p>
                <a
                  href="/about"
                  class="inline-flex items-center bg-gradient-to-r from-[#26abe8] to-[#8c7db3] px-8 py-4 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Learn more about Frontside
                </a>
              </div>
            </section>
          </article>
        </AppHtml>
      );
    },
  };
}
