import { JSXHandler, respondNotFound, useParams } from "revolution";
import { useAppHtml } from "./app.html.tsx";
import { Operation } from "effection";
import { initBlog, useBlog } from "../blog/blog.ts";

export function* blogRoute(): Operation<JSXHandler> {
  yield* initBlog();

  return function* route() {
    let { id } = yield* useParams<{ id: string }>();

    let blog = yield* useBlog();

    let post = blog.get(id)!;

    if (typeof post === 'undefined') {
      yield* respondNotFound();
    }

    let AppHtml = yield* useAppHtml({
      title: post.title,
      description: post.description,
      ogImage: "/assets/index-meta-home-cloud-native.png",
      twitterXImage: "/assets/index-meta-home-cloud-native.png",
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
                    {tag}
                  </span>
                ))}
              </div>
            </section>
            <img src={post.image} class="rounded-xl max-w-xl "/>
          </header>
          <section class="mx-auto text-blue-primary prose">
            <link rel="stylesheet" href="/assets/prism-atom-one-dark.css" />
            <post.content />
          </section>
        </article>
      </AppHtml>
    );
  };
}

