const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const title = argv.mode === "development" ? " 개발용" : "";
  return {
    entry: {
      main: "./src/app.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 20 * 1024, // 20kb
            },
          },
        },
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: { loader: "babel-loader" },
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `
        Build Date: ${new Date().toLocaleString()}
        `,
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        templateParameters: { env: title },
      }),
      new MiniCssExtractPlugin(),
    ],
  };
};
