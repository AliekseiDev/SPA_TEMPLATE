/*
  autoprefixer - https://github.com/postcss/autoprefixer
  cssnano - https://github.com/hail2u/node-css-mqpacker
  css-mqpacker - HAS BEEN REMOVED! Do not use!
*/
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');

module.exports = () => {
  return {
    plugins: (loader) => [
      new IconfontWebpackPlugin(loader),
      require('autoprefixer'),
      require('cssnano')({
        preset: [
          'default', {
            discardComments: {
              removeAll: true
            }
          }
        ]
      })
    ]
  }
}
