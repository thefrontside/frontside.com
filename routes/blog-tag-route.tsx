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

    console.log(posts);

    return (
      <App>
        <div class="flex flex-col justify-self-center !max-w-none prose prose">
          <section>
            <h2>Tag: {tag}</h2>
            <ol class="md:gap-6 lg:gap-11 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl">
              {posts.map((post) => {
                console.log("helloo Post image--- " + post.image);
                return (
                  <li class="md:mt-0 p-2 md:p-4 border prose">
                    <a class="no-underline" href={`/blog/${post.id}`}>
                      <img
                        src={post.image
                          ? `blog/${post.id}/${post.image}`
                          : "/assets/fs-logo-no-text.svg"}
                        alt="blog image"
                      />
                      <div>
                        <h3>{post.title}</h3>
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
