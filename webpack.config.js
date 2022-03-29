// name of this file is required for webpack to fxn

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require("path");

module.exports = {
  // basic configuration requires 3 properties (entry, output, mode)
  // entry is declared first, provides relative path to client's code
  entry: "./assets/js/script.js",
  // webpack takes code from entry, bundles it, and pushes the bundled code as output; bundled code will be in distr directory
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "main.bundle.js",
  },
  // plugin directs webpack for task completion (configured to use the jquery library)
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder (report.html)
    })
  ],
  // default mode is "production"
  mode: "development",
};
