const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // Убедитесь, что он установлен: npm install copy-webpack-plugin --save-dev

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules|\\.d\\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/",
          to: "./",
          globOptions: {
            ignore: ["./public/index.html"],
          },
        },
      ],
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};
