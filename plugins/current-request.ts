import type { Operation } from "effection";
import type { RevolutionPlugin } from "revolution";

import { createContext } from "effection";
import { posixNormalize } from "https://deno.land/std@0.203.0/path/_normalize.ts";

const CurrentRequest = createContext<Request>("Request");

export function currentRequestPlugin(): RevolutionPlugin {
  return {
    *http(request, next) {
      yield* CurrentRequest.set(request);
      return yield* next(request);
    },
  };
}

export function* useCurrentRequest() {
  return yield* CurrentRequest;
}

/**
 * Convert a non fully qualified url into a fully qualified url, complete
 * with protocol.
 */
export function* useAbsoluteUrl(path: string): Operation<string> {
  let absolute = yield* useAbsoluteUrlFactory();
  return absolute(path);
}

export function* useAbsoluteUrlFactory(): Operation<(path: string) => string> {
 
  let request = yield* CurrentRequest;

  let base = new URL(request.url);
  base.pathname = "/";
  
  return (path) => {
    let normalizedPath = posixNormalize(path);
    if (normalizedPath.startsWith("/")) {
      let url = new URL(base);
      url.pathname = posixNormalize(`${base.pathname}${path}`);
      return url.toString();
    } else {
      return new URL(path, request.url).toString();
    }
  }
}
