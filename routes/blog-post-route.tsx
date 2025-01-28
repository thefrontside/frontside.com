import {
  JSXHandler,
  Middleware,
  respondNotFound,
  respondRedirect,
  useParams,
} from "revolution";
import { useAppHtml } from "./app.html.tsx";
import { useBlog } from "../blog/blog.ts";
import { AuthorSection } from "../components/AuthorSection.tsx";
import { getAuthorImage } from "../lib/getAuthorsImage.ts";

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
        <article class="flex flex-col items-center p-6 lg:p-0 text-blue-primary">
          <header class="flex flex-col justify-center items-center mb-8 max-w-3xl">
            <section class="p-4 md:p-0">
              <h1 class="mb-4 max-w-prose font-black text-2xl md:text-4xl uppercase">
                {post.title}
              </h1>
              <AuthorSection
                author={post.author}
                date={post.date}
                authorImage={getAuthorImage(post.author)}
              />
              <div class="flex flex-wrap gap-2 mt-8 mb-6">
                {post.tags.map((tag) => (
                  <span class="px-3 py-1 border border-blue-300 rounded-full text-blue-primary text-sm capitalize">
                    <a href={`../tags/${tag}`}>{tag}</a>
                  </span>
                ))}
              </div>
            </section>
            <img
              src={image}
              class="rounded-xl max-w-[100%] h-auto object-fit"
              alt=""
              aria-hidden="true"
              width={500}
              height={300}
            />
          </header>
          <section class="mx-auto text-blue-primary lg:prose-lg prose">
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
function directory<T>(
  middleware: Middleware<Request, T>,
): Middleware<Request, T> {
  return function* (request, next) {
    if (!request.url.endsWith("/")) {
      return yield* respondRedirect(`${request.url}/`);
    } else {
      return yield* middleware(request, next);
    }
  };
}
