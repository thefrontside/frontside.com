import { type JSXHandler } from "revolution/jsx-runtime";
import { usePodcastEpisodes } from "../podcast/podcast.ts";

import { useAppHtml } from "./app.html.tsx";

export function podcastIndexRoute(): JSXHandler {
  return function* () {
    let AppHtml = yield* useAppHtml({
      title:
        "The Frontside Podcast | Engineering, Developer Experience, Testing and Tech Leadership",
      description:
        "The Frontside Podcast dive into engineering, developer experience, and tech leadership. Join industry experts as they share insights on modern software development, testing strategies, and more.",
      ogImage: "../assets/img/frontside-logo.png",
      twitterXImage: "../assets/img/frontside-logo.png",
      author: "Frontside",
    });

    let episodes = yield* usePodcastEpisodes();

    return (
      <AppHtml>
        <article class="mx-auto container">
          <h1 class="ml-12">Podcast</h1>
          <ol class="md:gap-6 lg:gap-11 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl">
            {episodes.map((episode) => (
              <li class="flex flex-col border-[#f0f0f0] bg-[#fcfcfc] md:mt-0 p-2 md:p-4 border rounded-md h-full prose">
                <a class="no-underline" href={`podcast/${episode.linkname}`}>
                  <h2>{episode.title}</h2>
                  <p>{episode.duration}</p>
                  <p>{episode.description}</p>
                </a>
              </li>
            ))}
          </ol>
        </article>
      </AppHtml>
    );
  };
}
