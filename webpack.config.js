var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'public\\js');
var BUILD_DIR = path.resolve(__dirname, 'public\\app');

var config = {
  entry: APP_DIR + '\\ReactContainer.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }      
    ]
  }
};

module.exports = config;