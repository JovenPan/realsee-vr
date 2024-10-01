const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const express = require("express");

module.exports = {
  context: __dirname,
  entry: "./src/app.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "app.bundle.js",
  },
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "../dist"),
    before(app) {
      app.use("/assets/", express.static(path.resolve(__dirname, "assets")));
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: false,
                sourceMap: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
};
