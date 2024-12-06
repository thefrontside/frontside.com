import { JSXHandler, useParams } from "revolution";
import { useAppHtml } from "./app.html.tsx";
import { Operation } from "effection";
import { initBlog, useBlog } from "../blog/blog.ts";

export function* blogRoute(): Operation<JSXHandler> {
  yield* initBlog();

  return function* route() {
    let { id } = yield* useParams<{ id: string }>();

    let blog = yield* useBlog();

    let post = blog.get(id);
    if (!post) {
      throw new Error("Not Found");
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
        <article class="text-blue-primary p-10 lg:p-0">
          <header class="flex flex-col md:flex-row justify-between mx-auto max-w-5xl">
            <section class="basis-1/2">
              <span class="uppercase text-4xl md:text-5xl font-black">{post.title}</span>
              <div>{post.author}</div>
	      <span>{post.date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric'})}</span>
            </section>
            <div>Hello</div>
          </header>
          <section class="prose mx-auto text-blue-primary">
            <link rel="stylesheet" href="/assets/prism-atom-one-dark.css" />
            <post.content />
          </section>
        </article>
      </AppHtml>
    );
  };
}
