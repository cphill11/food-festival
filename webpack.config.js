// name of this file is required for webpack to fxn
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const path = require("path");

const config = {
  // basic configuration requires 3 properties (entry, output, mode)
  // entry is declared first, provides relative path to client's code
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
    // webpack takes code from entry, bundles it, and pushes the bundled code as output; bundled code will be in distr directory
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        // looking for any img file w/ extension .jpg
        test: /\.jpg$/i,
        use: [
          {
            // implements actual loader
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  // plugin directs webpack for task completion (configured to use the jquery library)
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder (report.html)
    }),
  ],
  // default mode is "production"
  mode: "development",
};

module.exports = config;
