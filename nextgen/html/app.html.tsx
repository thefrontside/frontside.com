import type { Operation } from "effection";
import { outlet, url } from "freejack/view.ts";

import { ProjectSelect } from "../components/project-select.tsx";

import { PAGE_SENSE_SCRIPT_SRC } from "./env.ts";

export interface Options {
  title: string;
  description: string;
  ogImage?: string;
  twitterXImage?: string;
  author?: string;
}

export default function* AppHtml(options: Options): Operation<JSX.Element> {
  let { title, description, ogImage, twitterXImage, author } = options;
  let siteURL = yield* url();
  let ogImageMeta = yield* url(ogImage);
  let twitterXImageMeta = yield* url(twitterXImage);
  let logoNoText = yield* url("assets/fs-logo-no-text.svg");
  let logoURL = yield* url("assets/fs-logo.svg");

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
        <meta property="og:url" content={yield* url()} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="twitter:image" content={twitterXImageMeta} />
        <meta name="twitter:description" content={description} />
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
        {PageSenseScriptTag}
      </head>
      <body>
        <header class="p-5 max-w-screen-sm lg:max-w-screen-2xl m-auto lg:p-12">
          <nav
            class="flex flex-wrap items-center justify-end lg:gap-x-10"
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
            <menu class="w-full mt-14 font-bold leading-5 tracking-wide text-blue-primary text-sm flex justify-between order-3 lg:order-2 lg:mt-0 lg:w-auto lg:gap-x-12">
              <li>
                <a href="/consulting">DX Consulting</a>
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
              class="btn-contact uppercase rounded-lg font-bold py-2 md:py-1.5 px-2 md:px-2.5 bg-contain text-white text-sm md:text-base order-2"
              href="/contact"
            >
              Contact
            </a>
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
