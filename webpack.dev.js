const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const args = require('yargs').argv

let config = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
})

if (typeof args.analyse !== 'undefined') {
  config.plugins.push(new webpackBundleAnalyzer.BundleAnalyzerPlugin())
}

module.exports = config;
