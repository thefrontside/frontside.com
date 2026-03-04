import type { SitemapRoute } from "../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "./app.html.tsx";
import { useBlog } from "../blog/blog.ts";

export function tagsRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate() }];
    },
    handler: function* () {
      let blog = yield* useBlog();
      let posts = blog.getPosts();

      // Count tags
      let tagCounts = new Map<string, number>();
      for (let post of posts) {
        for (let tag of post.tags) {
          let count = tagCounts.get(tag) || 0;
          tagCounts.set(tag, count + 1);
        }
      }

      // Filter tags with more than 2 posts and sort by count
      let tags = Array.from(tagCounts.entries())
        .filter(([_, count]) => count > 2)
        .sort((a, b) => b[1] - a[1]);

      let AppHtml = yield* useAppHtml({
        title: "Tags - Frontside",
        description: "Browse blog posts by tag",
        ogImage: "/assets/index-meta-home-cloud-native.png",
        twitterXImage: "/assets/index-meta-home-cloud-native.png",
        author: "Frontside",
      });

      return (
        <AppHtml>
          <article>
            <header class="mx-auto px-8 lg:px-16 py-16 max-w-screen-2xl text-center">
              <h1 class="mb-4 font-bold text-5xl">
                <span class="bg-clip-text bg-gradient-to-r from-[#26abe8] to-[#f74d7b] text-transparent">
                  Tags
                </span>
              </h1>
            </header>

            <section class="mx-auto px-8 lg:px-16 pb-16 max-w-screen-2xl">
              <ul class="flex flex-wrap justify-center gap-4">
                {tags.map(([tag, count]) => {
                  let slug = tag.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li>
                      <a
                        href={`/blog/tags/${slug}`}
                        class="inline-block bg-gradient-to-r from-[#26abe8] to-[#f74d7b] hover:opacity-80 px-6 py-3 rounded-full font-semibold text-white text-xl transition-opacity"
                      >
                        {tag} ({count})
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          </article>
        </AppHtml>
      );
    },
  };
}
