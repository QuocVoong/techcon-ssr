module.exports = {
  mode: 'development',
  entry: "./src/client.js",
  devtool: "source-map",
  output: {
    path: __dirname + '/src/',
    filename: "bundle.js"
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
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6', '.json']
  }
};
