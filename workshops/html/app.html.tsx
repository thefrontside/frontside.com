import type { Operation } from "effection";
import { outlet } from "freejack/view.ts";

export interface Options {
  title: string;
}

export default function* AppHtml({ title }: Options): Operation<JSX.Element> {

  return (
    <html lang="en-US" dir="ltr">
      <head>
        <meta charset="UTF-8" />
        <title>{title}</title>
        {/* TODO: Fill in all these header tags */}
        <meta property="og:image" content="https://frontside.com/graphgen/logo.svg" />
        <meta
          property="og:title"
          content="Introduction | Frontside Workshops"
          data-rh="true"
        />
        <meta
          property="og:url"
          content="https://frontside.com/workshops"
        />
        <meta
          property="og:description"
          content="Harness Backstage's Potential: Become an Advanced Plugin Developer"
        />
        <meta
          name="description"
          content="Harness Backstage's Potential: Become an Advanced Plugin Developer"
        />
        <meta
          name="twitter:image"
          content="https://frontside.com/graphgen/logo.svg"
        />
        <link rel="icon" href="https://frontside.com/graphgen/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href="https://frontside.com/workshops"
        />
        <link
          rel="alternate"
          href="https://frontside.com/workshops"
          hreflang="en"
        />
        <link
          rel="alternate"
          href="https://frontside.com/workshops"
          hreflang="x-default"
        />
      </head>
      <body>
        <header class="w-full">
          <nav aria-label="Site Nav">
            <ul class="flex items-center gap-6">
              <NavLink
                href="./about"
                text="About"
              />
              <NavLink href="/agenda" text="Course Outline" />
              <NavLink
                href="/registration"
                text="Registration"
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
