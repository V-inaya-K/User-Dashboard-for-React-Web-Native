const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
  alias: {
    'react-native$': 'react-native-web',
    '@react-native-async-storage/async-storage': path.resolve(__dirname, 'shims/asyncStorage.js'),
  },
  extensions: ['.web.js', '.js'],
},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './public',
    port: 3000,
    host: '0.0.0.0',               //Accept connections from external hosts
  allowedHosts: 'all',           // Let ngrok and others connect with {port}
  headers: {
    'Access-Control-Allow-Origin': '*',  //Give access to all origins
  },
  },
};
