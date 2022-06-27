const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name].[ext]',
    clean: true,
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: ['@vanilla-extract/babel-plugin'],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new VanillaExtractPlugin(),
  ],
};
