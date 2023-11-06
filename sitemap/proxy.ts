import { ServeHandler } from "../lib/types.ts";
import { expect } from "effection";

export interface ProxyOptions {
  website: string;
  prefix: string;
}

export function proxy(options: ProxyOptions): ServeHandler {
  return function* handler({ request }) {
    let website = new URL(options.website);
    let target = new URL(request.url);
    let prefix = new RegExp(`^\/${options.prefix}\/?`)
    target.pathname = target.pathname.replace(prefix, "/");
    target.hostname = website.hostname;
    target.port = website.port;
    target.protocol = website.protocol;

    let base = new URL(`/${options.prefix}`, request.url);

    let response = yield* expect(fetch(target, {
      headers: {
        ...request.headers,
        "X-Base-Url": base.toString(),
      }
    }));

    return response;
  }
}
