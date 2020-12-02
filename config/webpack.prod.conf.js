const webpack = require("webpack");
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs"); //文件系统
const path = require("path"); //引入nodejs再带的path模块，用于处理目录的对象

const prodWebpackConfig = {
  mode: 'production',
  // 编译后的代码映射回原始源代码
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"http://prod-api.server.com"'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,  //js插入的位置，true/'head'/'body'/false
      minify: {
        removeComments: true,  //移除HTML中的注释
        collapseWhitespace: true,  //删除空白符与换行符
        removeAttributeQuotes: true
      },
      chunksSortMode: 'auto'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin()
  ]
}

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
