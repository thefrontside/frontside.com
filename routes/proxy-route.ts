import type { HTTPMiddleware } from "revolution";
import { route as revolutionRoute } from "revolution";
import { call, Operation } from "effection";
import { fromHtml } from "npm:hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { selectAll } from "npm:hast-util-select";
import { posixNormalize } from "https://deno.land/std@0.201.0/path/_normalize.ts";
import { injectPlausible } from "../plugins/plausible.ts";
import { injectUmami } from "../plugins/umami.ts";
import { injectMatomo } from "../plugins/matomo.ts";
import type { RoutePath, SitemapExtension } from "../plugins/sitemap.ts";

export interface ProxyRouteOptions {
  website: string;
  prefix: string;
  pattern?: string;
  root?: string;
}

export function proxyRoute(options: ProxyRouteOptions): HTTPMiddleware {
  let middleware: HTTPMiddleware & SitemapExtension = function* proxy(
    request,
  ): Operation<Response> {
    let website = new URL(options.website);

    let target = new URL(request.url);

    let prefix = new RegExp(`^\/${options.prefix}\/?`);
    target.pathname = target.pathname.replace(prefix, options.root ?? "/");

    target.hostname = website.hostname;
    target.port = website.port;
    target.protocol = website.protocol;

    let base = new URL(`/${options.prefix}`, request.url);

    let response = yield* call(() =>
      fetch(target, {
        redirect: "manual",
      })
    );

    if ([301, 302, 307, 308].includes(response.status)) {
      let location = response.headers.get("location");
      if (location) {
        // Resolve relative Location headers against the upstream website
        // - Netlify returns relative redirects like "/search/""
        // - Deno Deploy returns absolute ones like "https://host/search/"
        let loc = location.startsWith("http")
          ? new URL(location)
          : new URL(location, website);

        if (loc.origin === website.origin) {
          let headers = copyHeaders(response);
          let url = new URL(request.url);

          if (!options.root) {
            loc.pathname = `${options.prefix}${loc.pathname}`;
          }
          headers.location = loc.toString().replace(target.origin, url.origin);

          response = new Response(null, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        }
      }
    } else if (
      response.headers.get("Content-Type")?.match(/html/) && !options.root
    ) {
      try {
        let body = yield* call(() => response.text());
        let tree = fromHtml(body);

        yield* injectPlausible(tree);
        yield* injectUmami(tree);
        yield* injectMatomo(tree);

        let elements = selectAll(
          '[href^="/"],[src^="/"],form[action],meta[content]',
          tree,
        );

        for (let element of elements) {
          let properties = element.properties!;

          if (properties.href) {
            properties.href = posixNormalize(
              `${base.pathname}${properties.href}`,
            );
          }
          if (properties.src) {
            properties.src = posixNormalize(
              `${base.pathname}${properties.src}`,
            );
          }
          if (properties.action) {
            properties.action = posixNormalize(
              `${base.pathname}${properties.action}`,
            );
          }
          if (properties.content) {
            if (typeof properties.content === "string") {
              const parts = properties.content.match(/\d;\s*url=(.*)/);
              if (parts) {
                const [, url] = parts;
                properties.content = properties.content.replace(
                  url,
                  posixNormalize(`${base.pathname}${url}`),
                );
              } else if (properties.content.startsWith("http")) {
                properties.content = properties.content.replace(
                  target.origin,
                  base.href.replace(/\/?$/, ""),
                );
              }
            }
          }
        }
        response = new Response(toHtml(tree), {
          status: response.status,
          statusText: response.statusText,
          headers: copyHeaders(response),
        });
      } catch (error) {
        console.error(`Proxy HTML rewrite failed for ${request.url}:`, error);
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: copyHeaders(response),
    });
  };

  if (options.prefix) {
    middleware.sitemapExtension = function* (): Operation<RoutePath[]> {
      let sitemap = new URL(
        `/${options.root ?? ""}sitemap.xml`,
        options.website,
      );
      try {
        let response = yield* call(() => fetch(sitemap));
        if (!response.ok) return [];
        let xml = yield* call(() => response.text());
        return parseSitemapUrls(xml, options);
      } catch {
        return [];
      }
    };
  }

  let pattern = options.pattern ?? `/${options.prefix}(.*)`;

  let handler = revolutionRoute(pattern, middleware);
  if (middleware.sitemapExtension) {
    Object.defineProperty(handler, "sitemapExtension", {
      value: middleware.sitemapExtension,
    });
  }
  return handler;
}

// Copy an upstream response's headers, dropping the ones that describe how the
// *original* body was framed on the wire. `fetch()` transparently decompresses
// the body, so by the time we rebuild the response the payload is plain text —
// carrying over the upstream `content-encoding` (e.g. gzip) or its stale
// `content-length` makes us serve uncompressed bytes labelled as gzip, which
// downstream clients then fail to decode ("Invalid gzip header"). Let the
// server recompute these for the new body.
function copyHeaders(response: Response): Record<string, string> {
  let skip = new Set([
    "content-encoding",
    "content-length",
    "transfer-encoding",
  ]);
  let headers: Record<string, string> = {};
  for (let [key, value] of response.headers.entries()) {
    if (!skip.has(key.toLowerCase())) {
      headers[key] = value;
    }
  }
  return headers;
}

function parseSitemapUrls(
  xml: string,
  options: ProxyRouteOptions,
): RoutePath[] {
  let paths: RoutePath[] = [];
  let locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    let loc = match[1];
    try {
      let url = new URL(loc);
      let path = options.root
        ? url.pathname.replace(`/${options.root}`, "/")
        : url.pathname;
      let pathname = posixNormalize(`/${options.prefix}${path}`);
      paths.push({ pathname });
    } catch {
      // skip malformed URLs
    }
  }
  return paths;
}
