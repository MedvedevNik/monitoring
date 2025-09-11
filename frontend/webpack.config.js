const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');

// Загружаем переменные окружения из файла .env
const env = dotenv.config().parsed;

// Преобразуем переменные в формат, понятный Webpack'у
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  // Set the mode to "development" or "production"
  mode: "development",

  // The main entry point of the application
  entry: "./src/index.tsx",

  // Configure output for bundled files
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Clean the dist folder before each build
  },

  // Enable source maps for debugging
  devtool: "inline-source-map",

  // Configure the development server
  devServer: {
    static: "./dist",
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Open the browser after the server starts
  },

  // Configure how modules are resolved
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // Define rules for different file types
  module: {
    rules: [
      {
        test: /\.json$/,
        use: "json-loader",
      },
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules|\\.d\\.ts$/, // this line as well
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false, // this option will solve the issue
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
    new webpack.DefinePlugin(envKeys), // Добавляем Webpack DefinePlugin для инъекции переменных окружения
  ],
};
