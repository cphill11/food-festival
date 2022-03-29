// name of this file is required for webpack to fxn

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
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  // default mode is "production"
  mode: "development",
};
