// name of this file is required for webpack to fxn
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// bring PWA plugin into JSON file
const WebpackPwaManifest = require("webpack-pwa-manifest");
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
    // "new" invokes constructor fxn
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder (report.html)
    }),
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  // default mode is "production"
  mode: "development",
};

module.exports = config;
