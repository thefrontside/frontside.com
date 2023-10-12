import { createContext, type Operation } from "effection";

export const URLContext = createContext<URL>("url");

export function* useURL(): Operation<URL> {
  return yield* URLContext;
}

const Outlet = createContext<JSX.Element>("outlet");

export const outlet: Operation<JSX.Element> = {
  *[Symbol.iterator]() {
    return yield* Outlet;
  },
};

export function* url(path?: string): Operation<string> {
  let base = yield* URLContext;
  let pathname = path ?? base.pathname;
  return new URL(pathname, base.origin).toString();
}

export function* render(
  ...templates: Operation<JSX.Element>[]
): Operation<JSX.Element> {
  // won't be necessary when we migrate to HAST
  let content = null as unknown as JSX.Element;
  for (let template of templates.reverse()) {
    yield* Outlet.set(content);
    content = yield* template;
  }
  return content;
}
