import { serveDirMiddleware, type HTTPMiddleware } from "revolution";

export function assetsRoute(dir: string): HTTPMiddleware {
  return serveDirMiddleware({
    fsRoot: new URL(import.meta.resolve(`../${dir}`)).pathname,
    urlRoot: dir,
  });
}
