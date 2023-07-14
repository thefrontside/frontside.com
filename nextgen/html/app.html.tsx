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
        <meta name="twitter:image" content={yield* url("assets/fs-logo.svg")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href={logoNoText} />
        <link rel="canonical" href={siteURL} />
        <link rel="alternate" href={siteURL} hreflang="en" />
        <link rel="alternate" href={siteURL} hreflang="x-default" />
      </head>
      <body>
        <header class="w-full">
          <nav aria-label="Site Nav">
            <ul class="flex items-center gap-6">
              <NavLink
                href="/"
                text="Frontside"
              />
            </ul>
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

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <a
        class=" "
        href={href}
      >
        {text}
      </a>
    </li>
  );
}
