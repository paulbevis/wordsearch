var path = require('path');
module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "./public/[name].js",
    chunkFilename: "[id].js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
};