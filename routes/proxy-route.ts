import type { HTTPMiddleware } from "revolution";
import { call, Operation } from "effection";
import { fromHtml } from "npm:hast-util-from-html";
import { toHtml } from "npm:hast-util-to-html";
import { selectAll } from "npm:hast-util-select";
import { posixNormalize } from "https://deno.land/std@0.201.0/path/_normalize.ts";

export interface ProxyRouteOptions {
  website: string;
  prefix: string;
  root?: string;
}

export function proxyRoute(options: ProxyRouteOptions): HTTPMiddleware {
  return function* proxy(request): Operation<Response> {
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
      if (location?.startsWith(String(website))) {
        let headers: Record<string, string> = {};
        for (let [key, value] of response.headers.entries()) {
          headers[key] = value;
        }

        let url = new URL(request.url);

        let loc = new URL(location);
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
    } else if (
      response.headers.get("Content-Type")?.match(/html/) && !options.root
    ) {
      let body = yield* call(() => response.text());
      let tree = fromHtml(body);

      let elements = selectAll('[href^="/"],[src^="/"]', tree);

      for (let element of elements) {
        let properties = element.properties!;

        if (properties.href) {
          properties.href = posixNormalize(
            `${base.pathname}${properties.href}`,
          );
        }
        if (properties.src) {
          properties.src = posixNormalize(`${base.pathname}${properties.src}`);
        }
      }
      let headers: Record<string, string> = {};
      for (let [key, value] of response.headers.entries()) {
        headers[key] = value;
      }

      response = new Response(toHtml(tree), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  };
}
