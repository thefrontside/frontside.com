import type { JSXHandler } from "revolution";

import { useAppHtml } from "./app.html.tsx";
import { usePodcast } from "../podcast/podcast.ts";

export function podcastIndexRoute(): JSXHandler {
  return function* () {
    let podcast = yield* usePodcast();
    let episodes = podcast.getEpisodes();

    let AppHtml = yield* useAppHtml({
      title: "The Frontside Podcast",
      description:
        "Conversations with developers about the art and practice of software development",
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
      author: "Frontside",
    });

    return (
      <AppHtml>
        <article>
          <section class="mx-auto px-8 lg:px-16 py-16 max-w-screen-2xl">
            <header class="mb-12 text-center">
              <h1 class="mb-4 font-bold text-5xl text-blue-primary">
                <span class="bg-clip-text bg-gradient-to-r from-[#8c7db3] to-[#26abe8] text-transparent">
                  Podcast
                </span>{" "}
                episodes
              </h1>
              <p class="mx-auto max-w-2xl text-gray-600 text-xl">
                Conversations with developers about the art and practice of
                software development
              </p>
            </header>

            <div class="flex flex-col justify-center items-center gap-6 mx-auto mb-12 max-w-2xl">
              <a
                href="https://podcasts.apple.com/us/podcast/the-frontside-podcast/id827250386"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block"
              >
                <img
                  src="../assets/img/apple-podcasts-badge.svg"
                  alt="Listen on Apple Podcasts"
                  class="w-48 h-auto"
                />
              </a>

              <div class="w-full text-center">
                <p class="mb-2 text-gray-700 text-sm">Subscribe via RSS:</p>
                <code class="bg-gray-100 px-3 py-1 rounded font-mono text-gray-600 text-xs">
                  https://rss.simplecast.com/podcasts/96/rss
                </code>
              </div>
            </div>

            <ul class="gap-12 grid grid-cols-1 mx-auto max-w-4xl">
              {episodes.map((episode) => {
                let date = episode.publishedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <li class="border-gray-200 border-b pb-12 last:border-b-0">
                    <a
                      href={`/podcast/${episode.slug}`}
                      class="block hover:opacity-80 transition-opacity"
                    >
                      <h2 class="mb-2 font-bold text-2xl text-blue-primary hover:text-[#26abe8]">
                        {episode.title}
                      </h2>
                      <p class="mb-4 text-gray-500 text-sm uppercase tracking-wide">
                        Hosted by {episode.authors.map((a, i) =>
                          i === 0
                            ? a.name
                            : i === episode.authors.length - 1
                            ? ` and ${a.name}`
                            : `, ${a.name}`
                        ).join("")} • {date}
                      </p>
                      <p class="mb-4 text-gray-600 leading-relaxed">
                        {episode.description.replace(/<[^>]*>/g, "")}
                      </p>
                      <span class="font-semibold text-[#26abe8]">
                        Listen to episode →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </article>
      </AppHtml>
    );
  };
}
