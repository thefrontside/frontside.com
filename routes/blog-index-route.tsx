import { useBlog } from "../blog/blog.ts";
import { AuthorSection } from "../components/AuthorSection.tsx";
import { getAuthorImage } from "../lib/getAuthorsImage.ts";
import { useAppHtml } from "./app.html.tsx";

export function blogIndexRoute() {
  return function* () {
    let blog = yield* useBlog();

    let [latest, ...rest] = blog.getPosts();

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
        <div class="flex flex-col justify-self-center items-center !max-w-none prose">
          <section class="md:mt-12 mb-4">
            <h1>Latest</h1>
            <a
              class="flex md:flex-row flex-col no-underline prose-lg"
              href={`/blog/${latest.id}`}
            >
              <img
                class="flex-shrink-0 mr-8 rounded-lg w-[100%] max-w-[500px] h-auto"
                src={latest.image
                  ? `blog/${latest.id}/${latest.image}`
                  : "/assets/fs-logo-no-text.svg"}
                alt="blog image"
              />
              <div class="max-w-prose">
                <span class="bg-blue-primary p-2 rounded-lg text-white">
                  New
                </span>
                <h3 class="font-black text-3xl">{latest.title}</h3>
                <p class="max-w-prose font-normal">{latest.description}</p>
                <strong>&rarr; Read Article</strong>
                <AuthorSection
                  author={latest.author}
                  date={latest.date}
                  authorImage={getAuthorImage(latest.author)}
                />
              </div>
            </a>
          </section>
          <section>
            <h2>All Posts</h2>
            <ol class="md:gap-6 lg:gap-11 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl">
              {rest.map((post) => (
                <li class="flex flex-col border-[#f0f0f0] bg-[#fcfcfc] md:mt-0 p-2 md:p-4 border rounded-md h-full prose">
                  <a
                    class="flex flex-col h-full no-underline"
                    href={`/blog/${post.id}`}
                  >
                    <img
                      class="box-content flex-shrink-0 rounded-lg w-full h-[250px] overflow-clip object-contain"
                      src={post.image
                        ? `blog/${post.id}/${post.image}`
                        : "/assets/fs-logo-no-text.svg"}
                      alt="blog image"
                    />
                    <div class="flex-grow">
                      <h3 class="font-black text-2xl">{post.title}</h3>
                      <p class="max-w-prose font-normal">{post.description}</p>
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
  };
}
