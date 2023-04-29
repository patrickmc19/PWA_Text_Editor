const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    // Entry point for each webpack bundle.
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      database: "./src/js/database.js",
      editor: "./src/js/editor.js",
      header: "./src/js/header.js",
    },
    // Output for each webpack bundle.
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "JATE - PWA Text Editor",
      }),

      new WebpackPwaManifest({
        name: "JATE - PWA Text Editor",
        short_name: "JATE",
        description: "A simple text editor that works offline.",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // allow multiple sizes
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [],
    },
  };
};
