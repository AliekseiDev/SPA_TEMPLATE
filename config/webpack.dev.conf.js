/* Development config:
   ========================================================================== */

// const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');
const devAPI = require('./api/dev-api');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const { getAppsData } = require('./utils/getAppsData');
const { stylesLoader } = require('./styles');
const { templateLoader, htmlPlugins, generateIndexPage } = require('./templates');
const { assetsLoader } = require('./assets');
const { jsLoader } = require('./scripts');

const isDev = true



let appsData = getAppsData()


module.exports = {

  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    // writeToDisk: true,
    // watchContentBase: true,
    hot: true,
    contentBase: path.resolve('build'),
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    before: devAPI
  },

  entry: appsData.entries,
  
  output: {
    filename: 'js/[name].js',
    path: path.resolve('build'),
    publicPath: '/'
  },


  module: {
    rules: [
      jsLoader(),
      stylesLoader(isDev),
      templateLoader(),
      assetsLoader()
    ]
  },

  resolve: {
    alias: appsData.aliases
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({ filename: '[file].map' }),
    new SVGSpritemapPlugin('src/static/svg-sprite/**/*.svg', {
      styles: {
        // format: 'fragment',
        variables: {
          sizes: 'sprite-sizes'
        },
        filename: path.join(__dirname, '../src/common/webpack-svg-sprites.scss')
        // filename: '~sprites.scss'
      },
      output: {
        svg4everybody: true,
        svgo: true,
        svg: {
          // Disable `width` and `height` attributes on the root SVG element
          // as these will skew the sprites when using the <view> via fragment identifiers
          sizes: false
        }
      },
      sprite: {
        generate: {
          // use: true,
  
          // // // Generate <view> tags within the svg to use in css via fragment identifier url
          // // // and add -fragment suffix for the identifier to prevent naming colissions with the symbol identifier
          // view: '-fragment',
  
          // Generate <symbol> tags within the SVG to use in HTML via <use> tag
          symbol: true
        }
      }
    }),
    ...htmlPlugins(appsData.pages, appsData.mockData),
    generateIndexPage(appsData.pages)
  ]
}


