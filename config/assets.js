exports.assetsLoader = () => {
    return {
        test: /\.(svg|png|jpg|gif)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
        ]
    }
}