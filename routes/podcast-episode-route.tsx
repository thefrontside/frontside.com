import { respondNotFound, useParams } from "revolution";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";
import { usePodcast } from "../podcast/podcast.ts";
import type { RoutePath, SitemapRoute } from "../plugins/sitemap.ts";

export function podcastEpisodeRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      let podcast = yield* usePodcast();
      let paths: RoutePath[] = podcast.getEpisodes().map((ep) => ({
        pathname: generate({ slug: ep.slug }),
      }));
      return paths;
    },
    handler: function* () {
      let { slug } = yield* useParams<{ slug: string }>();
      let podcast = yield* usePodcast();
      let episode = podcast.getEpisode(slug)!;

      if (typeof episode === "undefined") {
        yield* respondNotFound();
      }

      let date = episode.publishedAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      let AppHtml = yield* useAppHtml({
        title: `${episode.title} - The Frontside Podcast`,
        description: episode.description.replace(/<[^>]*>/g, "").slice(0, 160),
        ogImage: episode.imageUrl || "/assets/index-meta-home-cloud-native.png",
        twitterXImage: episode.imageUrl ||
          "/assets/index-meta-home-cloud-native.png",
        author: episode.authors.map((a) => a.name).join(", "),
      });

      return (
        <AppHtml>
          <article class="mx-auto px-8 lg:px-16 py-16 max-w-4xl">
            <header class="mb-8">
              <a
                href="/podcast"
                class="inline-block mb-4 font-semibold text-[#26abe8] hover:underline"
              >
                ← Back to all episodes
              </a>
              <h1 class="mb-4 font-bold text-4xl text-blue-primary">
                {episode.title}
              </h1>
              <p class="text-gray-500 text-sm uppercase tracking-wide">
                Hosted by {episode.authors.map((a, i) =>
                  i === 0
                    ? a.name
                    : i === episode.authors.length - 1
                    ? ` and ${a.name}`
                    : `, ${a.name}`
                ).join("")} • {date}
              </p>
            </header>

            {episode.id && (
              <div class="mb-8">
                <iframe
                  style="height: 200px; width: 100%;"
                  src={`https://player.simplecast.com/${episode.id}`}
                  title={`Audio player for ${episode.title}`}
                >
                </iframe>
              </div>
            )}

            <div class="mb-8 text-gray-700 text-lg leading-relaxed prose prose-lg max-w-none">
              <p>{episode.description.replace(/<[^>]*>/g, "")}</p>
            </div>

            <footer class="border-gray-200 pt-8 border-t">
              <div class="flex flex-col gap-4">
                <h3 class="font-bold text-gray-900 text-lg">
                  Subscribe to The Frontside Podcast
                </h3>
                <div class="flex flex-wrap gap-4">
                  <a
                    href="https://podcasts.apple.com/us/podcast/the-frontside-podcast/id827250386"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block"
                  >
                    <img
                      src="../../assets/img/apple-podcasts-badge.svg"
                      alt="Listen on Apple Podcasts"
                      class="w-40 h-auto"
                    />
                  </a>
                  <div>
                    <p class="mb-2 text-gray-700 text-sm">Subscribe via RSS:</p>
                    <code class="bg-gray-100 px-3 py-1 rounded font-mono text-gray-600 text-xs">
                      https://rss.simplecast.com/podcasts/96/rss
                    </code>
                  </div>
                </div>
              </div>
            </footer>
          </article>
        </AppHtml>
      );
    },
  };
}
