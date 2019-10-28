const PATH = require('path');

const CLIENT_CONFIG = {
    entry: './client/index.js',
    output: {
        filename: 'client.bundle.js',
        path: PATH.resolve(__dirname, 'public/js')
    },
    devtool: 'source-map',
    module:{
        rules:[
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = CLIENT_CONFIG;