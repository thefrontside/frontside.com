import {
  JSXHandler,
  Middleware,
  respondNotFound,
  respondRedirect,
  useParams,
} from "revolution";
import { useAppHtml } from "./app.html.tsx";
import { useBlog } from "../blog/blog.ts";

export function blogPostRoute(): JSXHandler {
  return directory(function* route() {
    let { id } = yield* useParams<{ id: string }>();

    let blog = yield* useBlog();

    let post = blog.get(id)!;

    if (typeof post === "undefined") {
      yield* respondNotFound();
    }

    let image = post.image ? post.image : "/assets/fs-logo-no-text.svg";

    let AppHtml = yield* useAppHtml({
      title: post.title,
      description: post.description,
      ogImage: image,
      twitterXImage: image,
      author: post.author,
    });

    return (
      <AppHtml>
        <article class="p-6 lg:p-0 text-blue-primary">
          <header class="flex md:flex-row flex-col justify-between mx-auto mb-8 max-w-6xl">
            <section class="basis-1/2">
              <h1 class="mb-4 font-black text-2xl md:text-5xl uppercase">
                {post.title}
              </h1>
              <p class="mb-2">{post.author}</p>
              <div class="mb-6">
                {post.date.toLocaleString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div class="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span class="px-3 py-1 border border-blue-300 rounded-full text-blue-primary text-sm capitalize">
                    <a href={`../tags/${tag}`}>{tag}</a>
                  </span>
                ))}
              </div>
            </section>
            <img src={image} class="rounded-xl w-1/3" />
          </header>
          <section class="mx-auto text-blue-primary prose">
            <link rel="stylesheet" href="/assets/prism-atom-one-dark.css" />
            <post.content />
          </section>
        </article>
      </AppHtml>
    );
  });
}

// ensure that the blog post entry ends with `/`. That way, all JS,CSS, and image
// assets will be loaded relative to the blog post and self containment is
// trivial.
function directory<T>(middleware: Middleware<Request, T>): Middleware<Request, T> {
  return function* (request, next) {
    if (!request.url.endsWith("/")) {
      return yield* respondRedirect(`${request.url}/`);
    } else {
      return yield* middleware(request, next);
    }
  };
}
