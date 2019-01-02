const path = require('path')
const root = path.resolve(__dirname) 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './index.html',
  inject: 'body',
  title: 'craty blockly demo',
  chunks: ['a1']
})

module.exports = {
  entry: {
    a1: './src/a1/index'
  },
  output: {
    path: path.join(root, 'dist'),  
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin
  ]
}