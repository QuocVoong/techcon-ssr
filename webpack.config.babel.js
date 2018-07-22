const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: ['babel-polyfill', './src/client/index.js'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname + '/assets', to: __dirname + '/dist/assets' }
    ]),
    new ReactLoadablePlugin({
      filename: "./dist/react-loadable.json",
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules|examples/,
        loader: "babel-loader",
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6', '.json']
  },
};
