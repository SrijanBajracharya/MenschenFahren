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
            }
        ]
    }
}

module.exports = config;