const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, './websrc/index.js'),
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test   : /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'websrc')
            }, {
                test: /\.(scss|sass|css)$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },{
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./websrc/index.html",
            filename: "./index.html"
        })
    ]
}