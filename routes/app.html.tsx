import type { Operation } from "effection";
import type { JSXChild, JSXElement } from "revolution";

import {
  useAbsoluteUrl,
  useCurrentRequest,
} from "../plugins/current-request.ts";
import { ProjectSelect } from "../components/project-select.tsx";

const PAGE_SENSE_SCRIPT_SRC = getEnv("PAGE_SENSE_SCRIPT_SRC");

export interface Options {
  title: string;
  description: string;
  ogImage: string;
  twitterXImage: string;
  author: string;
}

export function* useAppHtml(
  options: Options,
): Operation<({ children }: { children: JSXChild }) => JSXElement> {
  let { title, description, author } = options;
  let request = yield* useCurrentRequest();
  let url = new URL(request.url);
  let ogURL = yield* useAbsoluteUrl(url.pathname);
  let ogImageMeta = yield* useAbsoluteUrl(options.ogImage);
  let twitterXImageMeta = yield* useAbsoluteUrl(options.twitterXImage);
  let logoNoText = "/assets/fs-logo-no-text.svg";
  let logoURL = "/assets/fs-logo.svg";

  return function AppHtml({ children }): JSX.Element {
    let PageSenseScriptTag = PAGE_SENSE_SCRIPT_SRC
      ? <script async src={PAGE_SENSE_SCRIPT_SRC}></script>
      : <></>;

    return (
      <html lang="en-US" dir="ltr">
        <head>
          <meta charset="UTF-8" />
          <title>{title}</title>
          <meta name="image" property="og:image" content={ogImageMeta} />
          <meta property="og:title" content={title} />
          <meta property="og:url" content={ogURL} />
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
          <meta name="author" content={author} />
          <meta name="twitter:image" content={twitterXImageMeta} />
          <meta name="twitter:description" content={description} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link rel="stylesheet" href="https://use.typekit.net/ugs0ewy.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Inter&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href={logoNoText} />
          <link rel="canonical" href={ogURL} />
          <link rel="alternate" href={ogURL} hreflang="en" />
          <link rel="alternate" href={ogURL} hreflang="x-default" />
          {PageSenseScriptTag}
        </head>
        <body>
          <header class="m-auto p-5 lg:p-12 max-w-screen-sm lg:max-w-screen-2xl">
            <nav
              class="flex flex-wrap justify-end items-center lg:gap-x-10"
              aria-label="Site Nav"
            >
              <a class="order-1 mr-auto" href="/">
                <img
                  width={137}
                  height={34.172}
                  src={logoURL}
                  alt="Frontside Logo"
                />
              </a>
              <menu class="flex justify-between lg:gap-x-12 order-3 lg:order-2 mt-14 lg:mt-0 w-full lg:w-auto font-bold text-blue-primary text-sm leading-5 tracking-wide">
                <li>
                  <a href="/dx-consulting">DX Consulting</a>
                </li>
                <li>
                  <a href="/backstage">Backstage</a>
                </li>
                <li>
                  <ProjectSelect />
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
              </menu>
              <a
                class="order-2 bg-contain px-2 md:px-2.5 py-2 md:py-1.5 rounded-lg font-bold text-white text-sm md:text-base uppercase btn-contact"
                href="/contact"
              >
                Contact
              </a>
            </nav>
          </header>
          <main>
            {children}
          </main>
          <footer class="mt-20 mb-16">
            <menu class="lg:flex justify-around gap-y-5 grid grid-cols-2 lg:m-0 ml-12 font-bold text-lg">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/consulting">Consulting</a>
              </li>
              <li>
                <a href="/backstage">Backstage</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </menu>
            <section class="gap-y-12 grid grid-cols-1 mt-20 text-xs text-center leading-5 tracking-wide">
              <a href="/">
                <img
                  alt="Frontside Logo"
                  class="mx-auto"
                  src="/assets/fs-logo-no-text.svg"
                  height={32.5}
                  width={32.5}
                />
              </a>

              <address class="not-italic whitespace-pre-line">
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
                <a href="/code-of-conduct">Code of Conduct</a>
                —
                <a href="/privacy-policy">Privacy Policy</a>
              </p>
            </section>
          </footer>
        </body>
      </html>
    );
  };
}

interface Env {
  PAGE_SENSE_SCRIPT_SRC: string;
}

function getEnv(name: keyof Env): string | undefined {
  return Deno.env.get(name);
}
