const CracoLessPlugin = require('craco-less');
const theme = require('./theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }]
    ]
  }
};