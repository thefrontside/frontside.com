import { action } from '@storybook/addon-actions';
import { colorValues } from '../src/styles/frontside-theme.css';

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions

window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

export const parameters = {
  options: {
    storySort: {
      order: ['About'],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Light Mode',
    values: Object.keys(colorValues).map((key) => ({
      name: key,
      value: colorValues[key],
    })),
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'mobile',
        styles: {
          width: '600px',
          height: '800px',
        },
      },
      tablet: {
        name: 'tablet',
        styles: {
          width: '770px',
          height: '900px',
        },
      },
      desktop: {
        name: 'desktop',
        styles: {
          width: '1025px',
          height: '1000px',
        },
      },
      widescreen: {
        name: 'widescreen',
        styles: {
          width: '2200px',
          height: '1800px',
        },
      },
    },
  },
};
