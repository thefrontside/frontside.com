import type { HTTPMiddleware } from "revolution";
import { call } from "effection";

/**
 * Serves the /llms.txt file for AI agent discovery.
 *
 * This follows the llms.txt standard (https://llmstxt.org/) to help
 * AI agents understand and navigate Frontside's content and projects.
 */
export function llmsTxtRoute(): HTTPMiddleware {
  return function* () {
    const content = yield* call(() =>
      Deno.readTextFile(new URL("../assets/llms.txt", import.meta.url))
    );
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  };
}
