import type { Operation } from "effection";
import type { MatchResult } from "./deps.ts";

export type Params<P extends object = object> = MatchResult<P>["params"];

export interface HandlerOptions<P extends object = object> {
  params: Params<P>;
  request: Request;
}

export interface ServeHandler {
  (options: HandlerOptions): Operation<Response>;
}
