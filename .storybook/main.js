const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    // https://www.gatsbyjs.com/docs/how-to/testing/visual-testing-with-storybook/
    'storybook-addon-gatsby'
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // sets up vanilla-extract style building
    config.plugins.push(new VanillaExtractPlugin());
    return config;
  },
  babel: async (options) => {
    options.plugins.push('@vanilla-extract/babel-plugin');
    return options;
  },
};
