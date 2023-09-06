import {
  defineConfig,
  setup,
  stringify,
  tw,
  virtual,
} from "https://esm.sh/@twind/core@1.1.3";

import type { Element } from "hastx/jsx-runtime";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetTypography from "https://esm.sh/@twind/preset-typography@1.0.7";

function presetFrontside() {
  return {
    rules: [
      ["header", {
        backgroundImage:
          "linear-gradient(45deg, #14315d -5%, #44378a, #26abe8 105%)",
        color: "#fff",
      }],
    ],
    theme: {
      extend: {
        colors: {
          "blue-primary": '#14315D',
          "blue-secondary": '#26ABE8',
          "pink-secondary": '#F74D7B',
        },
        boxShadow: {
          "blue-box": '0px 18px 50px 0px rgba(53, 113, 185, 0.25)',
        },
        fontSize: {
          "4_5xl": '2.5rem'
        }
      }
    }
  };
}

const config = defineConfig({
  //@ts-expect-error the tailwind preset types are wiggity whack.
  presets: [presetTailwind(), presetTypography(), presetFrontside()],
  theme: {
    fontFamily: {
      sans: ["Proxima Nova", "proxima-nova", "sans-serif"],
      inter: ["Inter", "inter", "san-serif"]
    },
  },
});

export function twind(document: Element): void {
  let sheet = virtual();

  setup(config, sheet);

  visit(document);

  let css = stringify(sheet.target);

  let head = document.children.find((child) =>
    child.type === "element" && child.tagName === "head"
  ) as Element;

  head?.children.push({
    type: "element",
    tagName: "style",
    properties: { type: "text/css" },
    children: [{ type: "text", value: css }],
  });
}

function visit(element: Element): void {
  let { properties: { className: classnames } = {}, children } = element;
  if (classnames) {
    tw(String(classnames));
  }
  for (let child of children) {
    if (!!child && child.type === "element") {
      visit(child);
    }
  }
}
