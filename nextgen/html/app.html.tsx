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
  let CRO = yield* url("feedback/js/cro-script.js");

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

        <link rel="stylesheet" href="https://use.typekit.net/ugs0ewy.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href={logoNoText} />
        <link rel="canonical" href={siteURL} />
        <link rel="alternate" href={siteURL} hreflang="en" />
        <link rel="alternate" href={siteURL} hreflang="x-default" />
        <script async src={CRO}></script>
      </head>
      <body>
        <header class="p-5 lg:max-w-5xl lg: m-auto">
          <nav aria-label="Site Nav">
            <menu class="flex justify-between">
              <a href="/">
                <img
                  width={137}
                  height={34.172}
                  src={logoURL}
                  alt="Frontside Logo"
                />
              </a>
              <a href="/contact">Contact</a>
            </menu>
          </nav>
          <nav
            class="mt-14 font-bold leading-5 tracking-wide text-blue-primary text-xs lg:text-sm"
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
        <footer class="mt-20 mb-16">
          <menu class="font-bold text-lg grid grid-cols-2 ml-12 gap-y-5 justify-around lg:flex lg:m-0">
            <li>
              <a href={yield* url("/")}>Home</a>
            </li>
            <li>
              <a href={yield* url("/about")}>About</a>
            </li>
            <li>
              <a href={yield* url("/consulting")}>Consulting</a>
            </li>
            <li>
              <a href={yield* url("/backstage")}>Backstage</a>
            </li>
            <li>
              <a href={yield* url("/blog")}>Blog</a>
            </li>
            <li>
              <a href={yield* url("/contact")}>Contact</a>
            </li>
          </menu>
          <section class="text-center text-xs tracking-wide leading-5 mt-20 grid grid-cols-1 gap-y-12 ">
            <a href={yield* url("/")}>
              <img
                alt="Frontside Logo"
                class="mx-auto"
                src={yield* url("/assets/fs-logo-no-text.svg")}
                height={32.5}
                width={32.5}
              />
            </a>

            <address class="whitespace-pre-line not-italic">
              2301 W Anderson Ln #102-8
              {"\n"}
              Austin, Texas 78757
              {"\n"}
              <a href="tel:+15124000318">+1 (512) 400 - 0318</a>
            </address>
            <p class="uppercase">
              © 2005 - {new Date().getFullYear()}{" "}
              The Frontside Software, Inc. All Rights Reserved.
            </p>
            <p class="uppercase">
              <a href={yield* url("/code-of-conduct")}>Code of Conduct</a>
              —
              <a href={yield* url("/privacy-policy")}>Privacy Policy</a>
            </p>
          </section>
        </footer>
      </body>
    </html>
  );
}
