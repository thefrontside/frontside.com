import { expect, useAbortSignal } from "effection";
import type { ServeHandler } from "../lib/types.ts";

import { PAGE_SENSE_SCRIPT_SRC } from "./env.ts";

export const CROScript: ServeHandler = {
  method: "GET",
  *middleware() {
    if (PAGE_SENSE_SCRIPT_SRC) {
      let signal = yield* useAbortSignal();
      return yield* expect(fetch(PAGE_SENSE_SCRIPT_SRC, { signal }));
    } else {
      return new Response("console.log('CRO: noop')", {
        headers: {
          "Content-Type": "text/javascript",
        },
      });
    }
  },
};
