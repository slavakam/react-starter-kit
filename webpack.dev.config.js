const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/scripts/[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', 'less'],
  },
  context: path.resolve(__dirname, 'src'),
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    static: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
}
