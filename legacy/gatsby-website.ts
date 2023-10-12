import { expect } from "effection";
import { type ServeHandler } from "../lib/types.ts";

const LEGACY_URL = Deno.env.get("FS_LEGACY_URL") ??
  "https://frontside.netlify.app";

export const GatsbyWebsite: ServeHandler = function* ({ request }) {
  let base = new URL(LEGACY_URL);
  let target = new URL(request.url);
  target.hostname = base.hostname;
  target.port = base.port;
  target.protocol = base.protocol;
  return yield* expect(fetch(target));
};
