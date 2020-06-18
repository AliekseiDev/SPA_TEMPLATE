const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');



exports.stylesLoader = (isDev) => {
  return {
    test: /\.scss$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: (loader) => [
            // new IconfontWebpackPlugin(loader),
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
      },
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }
}



exports.stylesModules = () => {
  return new MiniCssExtractPlugin({
    filename: `css/[name].[contenthash].css`
  })
}