const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  return {
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    entry: {
      index: [
        "@fortawesome/fontawesome-free/js/all.js",
        "./src/assets/css/index.css",
      ],
      querator: [
        "@fortawesome/fontawesome-free/js/all.js",
        "./src/assets/css/querator.css",
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        chunks: ["index"],
      }),
      new HtmlWebPackPlugin({
        template: "./src/querator.html",
        filename: "querator.html",
        chunks: ["querator"],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[id].css",
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: ["html-loader"],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: argv.mode === "development",
              },
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "img/[contenthash].[ext]",
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.m?js$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    devServer: {
      watchContentBase: true,
      contentBase: path.resolve(__dirname, "dist"),
      open: true,
    },
  };
};
