var path = require('path');

module.exports = {
    entry: {
        'overlay': './index.js',
        'overlay-example': './index-example.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'js'),
                query: {
                    presets: 'es2015',
                }
            },
        ]
    },
    devtool: 'source-map'
};
