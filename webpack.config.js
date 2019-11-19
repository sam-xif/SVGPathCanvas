const path = require('path');

module.exports = {
  entry: './lib',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      library: 'svg-path-canvas',
      libraryTarget: 'umd'
  },
  externals: {
      react: {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          umd: 'react',
          root: 'React'
      }
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          }
      ]
    }
}