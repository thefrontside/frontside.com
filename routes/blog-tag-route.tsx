import { useParams } from "revolution";
import type { JSXElement } from "revolution/jsx-runtime";
import { useBlog } from "../blog/blog.ts";
import { useAppHtml } from "./app.html.tsx";
import { AuthorSection } from "../components/AuthorSection.tsx";
import { getAuthorImage } from "../lib/getAuthorsImage.ts";
import type { SitemapRoute } from "../plugins/sitemap.ts";

export function blogTagRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap() {
      return [];
    },
    handler: function* () {
    let blog = yield* useBlog();

    let { tag: tagParam } = yield* useParams<{ tag: string }>();

    let tag = decodeURIComponent(tagParam);

    let posts = blog.getPostsByTag(tag);

    let App = yield* useAppHtml({
      title: "Frontside: Blog",
      description:
        "Developer Experience and Backstage consultancy based in Austin, Texas",
      author: "Frontside, Inc.",
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
    });

    return (
      <App>
        <div class="flex flex-col justify-self-center !max-w-none prose prose">
          <section>
            <h2>Tag: {tag}</h2>
            <ol class="md:gap-6 lg:gap-11 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl">
              {posts.map((post) => (
                <li class="flex flex-col md:mt-0 p-2 md:p-4 border rounded h-full prose">
                  <a
                    class="flex flex-col h-full no-underline"
                    href={`/blog/${post.id}`}
                  >
                    <img
                      class="flex-shrink-0 rounded-lg md:w-[500px] md:h-[200px]"
                      src={post.image
                        ? `/blog/${post.id}/${post.image}`
                        : "/assets/fs-logo-no-text.svg"}
                      alt="blog image"
                    />
                    <div class="flex-grow">
                      <h3 class="min-h-[90px] font-black text-2xl">
                        {post.title}
                      </h3>
                      <p class="max-w-prose font-normal">
                        {post.description}
                      </p>
                      <strong>&rarr; Read Article</strong>
                    </div>
                    <AuthorSection
                      author={post.author}
                      date={post.date}
                      authorImage={getAuthorImage(
                        post.author,
                      )}
                    />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </App>
    );
  },
  };
}
