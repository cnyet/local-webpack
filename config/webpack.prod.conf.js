const webpack = require("webpack");
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require("fs"); //文件系统
const path = require("path"); //引入nodejs再带的path模块，用于处理目录的对象

const prodWebpackConfig = {
  mode: 'production',
  // 编译后的代码映射回原始源代码
  devtool: 'hidden-source-map',
  output: {
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js'
  },
  // webpack4 以上版本模块优化设置
  optimization: {
    // 开启作用域提升，尽可能吧模块放在同一个函数中，减小代码体积
    concatenateModules: true,
    // 将公共模块拆分
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
    },
    minimize: true,   // 启用minimizer定义的插件优化
    minimizer: [
      new CssMinimizerPlugin(), // 用cssnano优化和压缩css文件
      new TerserPlugin({  // 压缩 JavaScript 代码, webpack v5 自带最新该插件
        parallel: true  // 开启多线程
      })
    ]
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
