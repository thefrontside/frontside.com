import type { HTTPMiddleware } from "revolution";
import { call } from "effection";

export interface ProxyRouteOptions {
  website: string;
  prefix: string;
}

export function proxyRoute(options: ProxyRouteOptions): HTTPMiddleware {
  return function* proxy(request) {
    let website = new URL(options.website);
    let target = new URL(request.url);
    let prefix = new RegExp(`^\/${options.prefix}\/?`);
    target.pathname = target.pathname.replace(prefix, "/");
    target.hostname = website.hostname;
    target.port = website.port;
    target.protocol = website.protocol;

    let base = new URL(`/${options.prefix}`, request.url);

    let headers: Record<string, string> = {
      "X-Base-Url": base.toString(),
    };
    for (let [key, value] of request.headers.entries()) {
      headers[key] = value;
    }

    let response = yield* call(fetch(target, {
      redirect: "manual",
      headers,
    }));

    return response;
  };
}
