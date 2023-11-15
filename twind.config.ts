import { defineConfig } from "npm:@twind/core@1.1.3";
import presetTailwind from "npm:@twind/preset-tailwind@1.1.4";
import presetTypography from "npm:@twind/preset-typography@1.0.7";

export const config = defineConfig({
  //@ts-expect-error the tailwind preset types are wiggity whack.
  presets: [presetTailwind(), presetTypography(), presetFrontside()],
  theme: {
    fontFamily: {
      sans: ["Proxima Nova", "proxima-nova", "sans-serif"],
      inter: ["Inter", "inter", "san-serif"],
    },
  },
});

function presetFrontside() {
  return {
    rules: [
      ["btn-contact", {
        background:
          `url(data:image/png;base64,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) no-repeat 100% 100%,linear-gradient(90deg,#44378a,#f74d7b 120%)`,
      }],
    ],
    theme: {
      extend: {
        colors: {
          "blue-primary": "#14315D",
          "blue-secondary": "#26ABE8",
          "pink-secondary": "#F74D7B",
        },
        boxShadow: {
          "blue-box": "0px 18px 50px 0px rgba(53, 113, 185, 0.25)",
        },
        fontSize: {
          "4_5xl": "2.5rem",
        },
      },
    },
  };
}
