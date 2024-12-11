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
        <div class="prose">
          <section>
            <h1>Latest</h1>
            <a href={`/blog/${latest.id}`}>{latest.title}</a>
          </section>
          <section>
            <h2>Last Three</h2>
            <ol>
              {recent.map((post) => (
                <li>
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </li>
              ))}
            </ol>
          </section>
          <section>
	    <h2>All</h2>
            <ol>
              {blog.getPosts().map((post) => (
                <li>
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </App>
    );
  };
}
