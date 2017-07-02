'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const pkg = require('../package.json')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../src/main/index.js')
  },
  // externals: Object.keys(pkg.dependencies || {}).filter(d => !['vue'].includes(d)),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'unlazy-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  plugins: [
    new BabiliWebpackPlugin({
      removeConsole: true,
      removeDebugger: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.json', '.node']
  },
  target: 'electron-main'
}

if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = mainConfig
