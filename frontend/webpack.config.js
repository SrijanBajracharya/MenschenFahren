var config = {
    entry: './app/js/main.js',

    output: {
        path:'./',
        filename: 'app/js/main.js',
    },

    devServer: {
        inline: true,
        port: 7777,
        historyApiFallback: true
    },


    module: {
        loaders: [
            {
                "start": "webpack-dev-server --hot",
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css|.sass$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader"
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    }
}

module.exports = config;