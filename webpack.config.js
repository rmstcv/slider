const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
  configPanel: './index.ts', 
  slider: './Slider/jquery.slider-plugin.ts',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
          ]
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime'
          ]
        },
      },
       {
        test: /\.(css|s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
       {
        test: require.resolve('jquery'),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: {
                globalName: "$",
                override: true,
              },
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  devServer: {
    port: 4200,
    static: path.join(__dirname, 'src'),
    hot: true,
  },
   plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ESLintPlugin(),
  ],
};