const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
}


// "start": "cross-env NODE_ENV=development webpack serve --config config/webpack.dev.js",
// "build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.js",