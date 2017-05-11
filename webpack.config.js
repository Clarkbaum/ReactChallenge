module.exports = {
  entry: __dirname + '/client/index.js',
  module:{
    loaders: [
      {
        test: /\.js&/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  }
};