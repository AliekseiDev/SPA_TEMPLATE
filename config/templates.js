const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getEntryName } = require('./utils/getAppsData');


exports.templateLoader = () => {
    return {
        test: /\.pug/,
        loader: 'pug-loader'
    }
}

exports.htmlPlugins = (pages, mockData) => {
    return pages.map(({ src, pageName, appName }) => {
        let options = {
            template: src,
            filename: `pages/${appName}/${pageName}.html`,
            chunks: [getEntryName(appName, pageName)]
        }
        let mock = mockData[appName][pageName]
        if (mock) {
            options.templateParameters = (compilation, assets, assetTags, options) => {
                let data = {
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        tags: assetTags,
                        files: assets,
                        options
                    }
                }
                if (mock.data) Object.assign(data, mock.data)
                if (mock.serverData) Object.assign(data, { _serverData_: mock.serverData })
                return data
            }
        }

        return new HtmlWebpackPlugin(options)
    })
}


exports.generateIndexPage = (pages) => {
    let data = pages.map(({ pageName, appName }) => `/pages/${appName}/${pageName}.html`)
    return new HtmlWebpackPlugin({
        template: 'src/index.pug',
        inject: false,
        pages: data
    })
}