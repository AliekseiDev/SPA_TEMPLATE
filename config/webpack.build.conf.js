/* Build config:
   ========================================================================== */
const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { jsLoader } = require('./scripts');
const { stylesLoader } = require('./styles');
const { templateLoader } = require('./templates');
const { assetsLoader } = require('./assets');
const { getAppsData } = require('./utils/getAppsData');

const appsData = getAppsData()


module.exports = {

  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  entry: appsData.entries,
  
  output: {
    filename: 'js/[name][contenthash].js',
    path: path.resolve('build'),
    publicPath: '/'
  },

  rules: [
    jsLoader(),
    stylesLoader(),
    templateLoader(),
    assetsLoader()
  ],

  resolve: {
    alias: appsData.aliases
  },

  plugins: [
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
    stylesModules(),
    new CopyWebpackPlugin([
      { from: 'src/apps/**/*.pug', to: `views`, transformPath: (p) => p.replace('src/', 'pug/') },
      // { from: path.resolve('src/static/images'), to: `static/images` },
      // { from: path.resolve('src/static/icons'), to: `static/icons` }
    ]),
    new WebpackAssetsManifest({
      entrypoints: true,
      publicPath: '/'
    })
  ]

}