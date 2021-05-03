const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  mode: process.env.WEBPACK_D,
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-hot-loader/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        loaders: [
          require.resolve("style-loader"),
          require.resolve("css-loader"),
          require.resolve("sass-loader"),
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
}

const Front_config = Object.assign({}, config, {
  devtool: 'inline-source-ma',
  name: 'wehago_Front',
  target: 'web',
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: [".js", ".jsx", "css", "scss"],
  },
  entry: {
    app: ["babel-polyfill", "./client"],
  },
  node: { fs: 'empty', net: 'empty', tls: 'empty' },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist",
  },
})

module.exports = [Front_config]
