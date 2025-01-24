import { useBlog } from "../blog/blog.ts";
import { useAppHtml } from "./app.html.tsx";

export function blogIndexRoute() {
  return function* () {
    let blog = yield* useBlog();

    let [latest] = blog.slice(0, 1);

    let recent = blog.slice(1, 4);

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
        <div class="flex flex-col justify-self-center !max-w-none prose">
          <section class="mb-4 p-4">
            <h1>Latest</h1>
            <a
              class="flex md:flex-row flex-col no-underline prose-lg"
              href={`/blog/${latest.id}`}
            >
              <img
                class="flex-shrink-0 w-[100%] max-w-[500px] h-auto"
                src={latest.image
                  ? `blog/${latest.id}/${latest.image}`
                  : "/assets/fs-logo-no-text.svg"}
                alt="Blog image"
              />
              <div class="max-w-prose">
                <span class="bg-blue-primary p-2 rounded-lg text-white">
                  New
                </span>
                <h3 class="font-black text-3xl">{latest.title}</h3>
                <p>
                  {latest.author} - {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(latest.date)}
                </p>
                <p class="max-w-prose font-normal">{latest.description}</p>
                <strong>&rarr; Read Article</strong>
              </div>
            </a>
          </section>
          <section>
            <h2>Last Three</h2>
            <ol class="md:gap-6 lg:gap-11 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl">
              {recent.map((post) => (
                <li class="md:mt-0 p-2 md:p-4 border prose">
                  <a
                    class="no-underline"
                    href={`/blog/${post.id}`}
                  >
                    <img
                      class="flex-shrink-0 rounded-lg md:w-[500px] md:h-[200px] object-cover"
                      src={post.image
                        ? `blog/${post.id}/${post.image}`
                        : "/assets/fs-logo-no-text.svg"}
                      alt="Blog image"
                    />
                    <div>
                      <h3 class="font-black text-2xl">{post.title}</h3>
                      <p>
                        {post.author} - {new Intl.DateTimeFormat("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }).format(latest.date)}
                      </p>
                      <p class="max-w-prose font-normal">
                        {post.description}
                      </p>
                      <strong>&rarr; Read Article</strong>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2>All</h2>
            <ol class="md:gap-6 lg:gap-11 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl">
              {blog.getPosts().map((post) => (
                <li class="md:mt-0 p-2 md:p-4 border prose">
                  <a class="no-underline prose" href={`/blog/${post.id}`}>
                    <img
                      class="flex-shrink-0 rounded-lg md:w-[500px] md:h-[200px] object-cover"
                      src={post.image
                        ? `blog/${post.id}/${post.image}`
                        : "/assets/fs-logo-no-text.svg"}
                      alt="Blog image"
                    />
                    <div>
                      <h3 class="font-black text-2xl">{post.title}</h3>
                      <p>
                        {post.author} - {new Intl.DateTimeFormat("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }).format(latest.date)}
                      </p>
                      <p class="max-w-prose font-normal">
                        {post.description}
                      </p>
                      <strong>&rarr; Read Article</strong>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </App>
    );
  };
}
