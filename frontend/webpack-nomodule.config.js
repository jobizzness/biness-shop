'use strict';

const BROWSERS = [
  // Best practice: https://github.com/babel/babel/issues/7789
  '>=1%',
  'not ie 11',
  'not op_mini all'
];

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          // We need to transpile Polymer itself and other ES6 code
          // exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                'env',
                {
                  targets: {browsers: BROWSERS},
                  debug: true
                }
              ]],
              plugins: ["syntax-dynamic-import", ['transform-object-rest-spread', {useBuiltIns: true}]]
            }
          }
        }
      ]
    }
  };
};
