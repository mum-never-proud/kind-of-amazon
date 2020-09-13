const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  devtool: 'source-map',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: path.resolve(__dirname, './src/actions'),
      actionCreators: path.resolve(__dirname, './src/action-creators'),
      actionTypes: path.resolve(__dirname, './src/action-types'),
      components: path.resolve(__dirname, './src/components'),
      contexts: path.resolve(__dirname, './src/contexts'),
      data: path.resolve(__dirname, './src/data'),
      layouts: path.resolve(__dirname, './src/layouts'),
      utils: path.resolve(__dirname, './src/utils'),
      reducers: path.resolve(__dirname, './src/reducers'),
      services: path.resolve(__dirname, './src/services'),
      images: path.resolve(__dirname, './public/images'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new Dotenv(),
  ],
};
