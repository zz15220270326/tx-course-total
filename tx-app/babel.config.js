require('core-js/stable');
require('@babel/polyfill');
require('@babel/plugin-transform-runtime');

module.exports = {
  presets: [
    [
      '@babel/preset-env', 
      {
        useBuiltIns: "entry",
        targets: {
          chrome: 58,
          ie: 9
        },
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}