import { useParams } from "revolution";
import { useBlog } from "../blog/blog.ts";
import { useAppHtml } from "./app.html.tsx";

export function blogTagRoute() {
  return function* () {
    let blog = yield* useBlog();

    let { tag } = yield* useParams<{ tag: string}>();
    
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
        <div class="prose">
          <section>
	    <h2>Tag: {tag}</h2>
            <ol>
              {posts.map((post) => (
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
