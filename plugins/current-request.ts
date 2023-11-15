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
  let normalizedPath = posixNormalize(path);
  let request = yield* useCurrentRequest();

  if (normalizedPath.startsWith("/")) {
    let url = new URL(request.url);
    url.pathname = normalizedPath;
    return url.toString();
  } else {
    return new URL(normalizedPath, request.url).toString();
  }
}
