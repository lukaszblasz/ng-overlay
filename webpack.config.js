var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'overlay': './index.js',
        'overlay-example': './index-example.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name]/[name].css"),
    ],
    devtool: 'source-map'
};
