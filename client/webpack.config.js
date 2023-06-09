const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

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
    // Plugins for each webpack bundle.
    plugins: [
      // this plugin will generate an HTML file that includes all webpack bundles in the body using script tags
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "PWA Text Editor",
      }),
      
      // this plugin will generate a service worker file
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // this plugin will generate a manifest.json file for the PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "JATE - PWA Text Editor",
        short_name: "JATE",
        description: "Just another text editor that works offline.",
        background_color: "#00421A",
        theme_color: "#00421A",
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
      // load css files
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // using babel to transpile the css files
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"],
            },
          },
        },
      ],
    },
  };
};
