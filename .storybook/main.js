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
  ],
  // see https://www.gatsbyjs.com/docs/how-to/testing/visual-testing-with-storybook/
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    // config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    );
    // sets up vanilla-extract style building
    config.plugins.push(new VanillaExtractPlugin());
    return config;
  },
  babel: async (options) => {
    options.plugins.push('@vanilla-extract/babel-plugin');
    return options;
  },
};
