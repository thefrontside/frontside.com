import { useParams } from "revolution";
import { useBlog } from "../blog/blog.ts";
import { useAppHtml } from "./app.html.tsx";

export function blogTagRoute() {
  return function* () {
    let blog = yield* useBlog();

    let { tag } = yield* useParams<{ tag: string }>();

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
              {posts.map((post) => {
                const authorsWithImage = [
                  "charles",
                  "elrick",
                  "taras",
                  "jacob",
                  "min",
                  "jeffrey",
                  "jorge",
                  "paul",
                ];
                const firstName = post.author.split(" ")[0].toLowerCase();
                const isAuthorImageAvailable = authorsWithImage.includes(
                  firstName,
                );
                const authorImage = isAuthorImageAvailable
                  ? `/assets/img/authors/${firstName}.jpg`
                  : "/assets/fs-logo-no-text.svg";

                return (
                  <li class="flex flex-col md:mt-0 p-2 md:p-4 border rounded h-full prose">
                    <a
                      class="flex flex-col h-full no-underline"
                      href={`/blog/${post.id}`}
                    >
                      <img
                        class="flex-shrink-0 rounded-lg md:w-[500px] md:h-[200px] object-cover"
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
                      <div class="flex flex-row items-center pt-4">
                        <div>
                          <img
                            class="mr-4 rounded-full w-10 h-10 object-cover"
                            src={authorImage}
                            alt={`${post.author}'s profile`}
                          />
                        </div>
                        <div>
                          {/* author */}
                          <p class="m-0 font-black">{post.author}</p>
                          <p class="m-0 text-gray-500 text-sm">
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(post.date)}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </App>
    );
  };
}
