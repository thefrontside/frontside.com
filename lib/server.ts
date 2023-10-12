import {
  type Handler,
  serve as $serve,
} from "https://deno.land/std@0.188.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.190.0/http/file_server.ts";
import { action, expect, type Operation, resource, useScope } from "effection";
import { match, type MatchFunction } from "./deps.ts";
import type { ServeHandler } from "./types.ts";

export interface FreejackServerOptions {
  serve(): Operation<Handler>;
  port: number;
  dir: string;
}

export interface FreejackServer {
  hostname: string;
  port: number;
}

export function useServer(
  options: FreejackServerOptions,
): Operation<FreejackServer> {
  return resource(function* (provide) {
    let requestHandler = yield* options.serve();

    let handler: Handler = async (request, info) => {
      let pathname = new URL(request.url).pathname;
      if (pathname.startsWith("/assets")) {
        return serveDir(request, { fsRoot: options.dir });
      } else {
        return await requestHandler(request, info);
      }
    };

    let controller = new AbortController();
    let { signal } = controller;

    let [done, server] = yield* action<[Promise<void>, FreejackServer]>(
      function* (resolve) {
        let promise = Promise.resolve();
        promise = $serve(handler, {
          port: options.port,
          signal,
          onListen(s) {
            resolve([promise, s]);
          },
        });
      },
    );

    try {
      yield* provide(server);
    } finally {
      controller.abort();
      yield* expect(done);
    }
  });
}

export function serve(group: Record<string, ServeHandler>): Operation<Handler> {
  return resource(function* (provide) {
    let scope = yield* useScope();

    let matchers: [MatchFunction, ServeHandler, string][] = [];

    for (let [path, handler] of Object.entries(group)) {
      matchers.push([match(path), handler, path]);
    }

    yield* provide(function Handler(request) {
      return scope.run(function* () {
        try {
          let url = new URL(request.url);

          for (let [matcher, handler] of matchers) {
            let match = matcher(url.pathname);
            if (match) {
              let { params } = match;
              return yield* handler({ params, request });
            }
          }
        } catch (error) {
          return new Response(error.stack, {
            status: 500,
            statusText: "Internal Error",
          });
        }
        return new Response("Not Found", {
          status: 404,
          statusText: "Not Found",
        });
      });
    });
  });
}

type Next = {
  type: "continue";
} | {
  type: "response";
  response: Response;
};

import { createContext } from "effection";
const NextContext = createContext<(next: Next) => void>("next");

export function next(): Operation<void> {
  return {
    *[Symbol.iterator]() {
      let escape = yield* NextContext;
      escape({ type: "continue" });
    },
  };
}
