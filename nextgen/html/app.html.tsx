import type { Operation } from "effection";
import { outlet, url } from "freejack/view.ts";

export interface Options {
  title: string;
  description: string;
}

export default function* AppHtml(options: Options): Operation<JSX.Element> {
  let { title, description } = options;
  let siteURL = yield* url();
  let logoNoText = yield* url("assets/fs-logo-no-text.svg");
  let logoURL = yield* url("assets/fs-logo.svg");

  return (
    <html lang="en-US" dir="ltr">
      <head>
        <meta charset="UTF-8" />
        <title>{title}</title>
        <meta property="og:image" content={logoNoText} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={yield* url()} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
        <meta name="twitter:image" content={logoURL} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href={logoNoText} />
        <link rel="canonical" href={siteURL} />
        <link rel="alternate" href={siteURL} hreflang="en" />
        <link rel="alternate" href={siteURL} hreflang="x-default" />
      </head>
      <body class="p-5 md:mx-auto md:max-w-xl">
        <header class="w-full">
          <nav aria-label="Site Nav">
            <menu class="flex justify-between">
              <a href="/">
                <img width={137} src={logoURL} alt="Frontside Logo" />
              </a>
              <a href="/contact">Contact</a>
            </menu>
          </nav>
          <nav
            class="mt-14 font-bold leading-5 tracking-wide text-indigo-900 text-xs"
            arial-label="Home Nav"
          >
            <menu class="flex justify-between">
              <li>
                <a href="/consulting">DX Consulting</a>
              </li>
              <li>
                <a href="/backstage">Backstage</a>
              </li>
              <li>
                <a href="/opensource">Open Source</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </menu>
          </nav>
        </header>
        <main>
          {yield* outlet}
        </main>
        <footer>
          <p>
            Copyright © 2005 - {new Date().getFullYear()}{" "}
            The Frontside Software, Inc.
          </p>
        </footer>
      </body>
    </html>
  );
}
