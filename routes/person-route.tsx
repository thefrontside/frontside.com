import { respondNotFound, useParams } from "revolution";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";
import { usePeople } from "../people/people.ts";
import { useBlog } from "../blog/blog.ts";
import { usePodcast } from "../podcast/podcast.ts";
import type { RoutePath, SitemapRoute } from "../plugins/sitemap.ts";

export function personRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      let people = yield* usePeople();
      let paths: RoutePath[] = people.getAll().map((p) => ({
        pathname: generate({ name: p.slug.replace(/^\/people\//, "") }),
      }));
      return paths;
    },
    handler: function* () {
      let { name } = yield* useParams<{ name: string }>();
      let peopleData = yield* usePeople();
      let person = peopleData.getBySlug(name)!;

      if (typeof person === "undefined") {
        yield* respondNotFound();
      }

      // Get blog posts by this person
      let blog = yield* useBlog();
      let allPosts = blog.getPosts();
      let blogPosts = allPosts.filter((post) =>
        post.author.toLowerCase().includes(person.name.toLowerCase())
      );

      // Get podcast episodes by this person
      let podcast = yield* usePodcast();
      let allEpisodes = podcast.getEpisodes();
      let episodes = allEpisodes.filter((episode) =>
        episode.authors.some((author) =>
          author.name.toLowerCase().includes(person.name.toLowerCase())
        )
      );

      let AppHtml = yield* useAppHtml({
        title: `${person.name} - Frontside`,
        description: person.intro,
        ogImage: person.img ? `/people/images/${person.img}` : "/assets/index-meta-home-cloud-native.png",
        twitterXImage: person.img ? `/people/images/${person.img}` : "/assets/index-meta-home-cloud-native.png",
        author: person.name,
      });

      // Alumni page is simpler - just name and subtitle with image
      if (person.alumnus) {
        return (
          <AppHtml>
            <article>
              <header class="mx-auto mt-4 lg:px-8 p-8 lg:p-16 max-w-screen-2xl">
                <div class="mx-auto max-w-2xl text-center">
                  <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                    {person.name}
                  </h1>
                  <h2 class="mt-4 font-bold text-2xl text-gray-600">
                    Frontside alumnus
                  </h2>
                  {person.img && (
                    <div class="mt-8">
                      <img
                        src={`/people/images/${person.img}`}
                        alt={person.imgAlt || person.name}
                        class="mx-auto rounded-lg w-full max-w-md h-auto"
                      />
                    </div>
                  )}
                </div>
              </header>
            </article>
          </AppHtml>
        );
      }

      // Current team member page with full details
      return (
        <AppHtml>
          <article>
            <header class="lg:gap-x-8 lg:grid lg:grid-cols-12 mx-auto mt-4 lg:px-8 p-8 lg:p-16 max-w-screen-2xl">
              <div class="lg:col-span-7 xl:col-span-6 lg:px-0 pt-10 lg:pt-2 pb-24 sm:pb-8">
                <div class="mx-auto lg:mx-0 max-w-2xl">
                  <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                    {person.name}
                  </h1>
                  <h2 class="mt-4 font-bold text-2xl text-blue-primary">
                    {person.title}
                  </h2>
                  <p class="mt-6 text-gray-600 text-xl leading-8">
                    {person.intro}
                  </p>
                  <p class="flex gap-4 mt-4">
                    {person.twitter && (
                      <a
                        href={`https://twitter.com/${person.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-block bg-gradient-to-r from-[#26abe8] to-[#f74d7b] hover:opacity-80 px-6 py-2 rounded-full font-semibold text-white transition-opacity"
                      >
                        Twitter
                      </a>
                    )}
                    {person.github && (
                      <a
                        href={`https://github.com/${person.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-block bg-gradient-to-r from-[#26abe8] to-[#f74d7b] hover:opacity-80 px-6 py-2 rounded-full font-semibold text-white transition-opacity"
                      >
                        GitHub
                      </a>
                    )}
                  </p>
                </div>
              </div>
              <div class="relative lg:col-span-6 mx-auto sm:w-3/4 md:w-3/4 lg:w-full">
                {person.img && (
                  <img
                    src={`/people/images/${person.img}`}
                    alt={person.imgAlt}
                    class="rounded-lg w-full h-auto"
                  />
                )}
              </div>
            </header>

            <div class="mx-auto px-8 lg:px-16 pb-16 max-w-screen-2xl">
              {person.bio && (
                <div class="mb-12 text-gray-700 text-lg leading-relaxed">
                  <p>{person.bio}</p>
                </div>
              )}

              {blogPosts.length > 0 && (
                <div class="mb-12">
                  <h2 class="mb-6 font-bold text-3xl text-blue-primary">
                    Blog Posts
                  </h2>
                  <ul class="space-y-3">
                    {blogPosts.map((post) => (
                      <li>
                        <a
                          href={`/blog/${post.id}`}
                          class="text-[#26abe8] text-lg hover:underline"
                        >
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {episodes.length > 0 && (
                <div class="mb-12">
                  <h2 class="mb-6 font-bold text-3xl text-blue-primary">
                    Podcast Episodes
                  </h2>
                  <ul class="space-y-3">
                    {episodes.map((episode) => (
                      <li>
                        <a
                          href={`/podcast/${episode.slug}`}
                          class="text-[#26abe8] text-lg hover:underline"
                        >
                          {episode.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </AppHtml>
      );
    },
  };
}
