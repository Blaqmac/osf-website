const path = require('path');

// https://webpack.js.org/loaders/css-loader/#modules
const cssModuleOpts = {
  modules: {
    mode: 'local',
    localIdentName: '[name]__[local]--[hash:base64:5]',
    context: path.resolve(__dirname, 'src'),
    hashPrefix: 'osf',
  },
  importLoaders: 1,
  import: true
};

module.exports = ({ config }) => {
  // https://www.gatsbyjs.org/docs/visual-testing-with-storybook/
  // https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main'];

  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ];

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
  ];

  config.module.rules[2].use[1].options = cssModuleOpts

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main'];

  return config;
};