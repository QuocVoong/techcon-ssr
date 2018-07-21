const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  devtool: "source-map",
  output: {
    path: __dirname,
    filename: "dist/bundle.js"
  },
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
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname + '/assets', to: __dirname + '/dist/assets' }
    ])
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6', '.json']
  }
};
