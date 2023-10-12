import { colorValues } from "../src/styles/frontside-theme.css";

export const parameters = {
  options: {
    storySort: {
      order: ["About"],
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "Light Mode",
    values: Object.keys(colorValues).map((key) => ({
      name: key,
      value: colorValues[key],
    })),
  },
  viewport: {
    viewports: {
      mobile: {
        name: "mobile",
        styles: {
          width: "600px",
          height: "800px",
        },
      },
      tablet: {
        name: "tablet",
        styles: {
          width: "770px",
          height: "900px",
        },
      },
      desktop: {
        name: "desktop",
        styles: {
          width: "1025px",
          height: "1000px",
        },
      },
      widescreen: {
        name: "widescreen",
        styles: {
          width: "2200px",
          height: "1800px",
        },
      },
    },
  },
};
