import { useBlog } from "../blog/blog.ts";
import { useAppHtml } from "./app.html.tsx";

export function blogIndexRoute() {
  return function* () {
    let blog = yield* useBlog();

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
        <ol>
          {blog.getPosts().map((post) => (
            <li>
              <a href={`/blog/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ol>
      </App>
    );
  };
}
