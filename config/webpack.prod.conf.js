/**
 * webpack 生产环境配置
 * 包括 splitChunks、压缩资源、CDN 路径配置（在output配置）等相关配置
 * terser-webpack-plugin配置中强制去除多余信息
 */
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
  devtool: 'none',
  output: {  // 项目的输出文件
    /**
     * hash: 修改任何文件都会改变hash
     * chunkhash: entry 的模块文件不变hash不变
     * contenthash: 把 CSS 从 JS 中使用mini-css-extract-plugin 或 extract-text-webpack-plugin抽离出来并使用 contenthash
     */
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
    publicPath: '/',  // 指定在浏览器中被引用的 URL 地址，用来作为src或者link指向该文件, 用于确定 bundle 的来源
    /**
     * var: 只能以 <script> 标签的形式引入
     * commonjs: 只能按照 commonjs 的规范引入
     * amd: 只能按照 amd 规范引入
     * umd: 可以用<script>、commonjs、amd 引入
     */
    // libraryTarget: 'amd',  // 指定库打包出来的规范
    // target:   // 两种类型：string 和 function。
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
    runtimeChunk: {   // 创建一个在所有生成 chunk 之间共享的运行时文件
      name: 'runtime'
    },
    minimize: true,   // 启用minimizer定义的插件优化
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,  // 开启缓存
        parallel: true  // 开启多线程
      }), // 用cssnano优化和压缩css文件
      new TerserPlugin({  // 压缩 JavaScript 代码, webpack v5 自带最新该插件
        parallel: true,  // 开启多线程
        terserOptions: {
          comments: false, // 删除注释
          compress: {
            // 删除无用的代码
            unused: true,
            // 删掉 debugger
            drop_debugger: true, // eslint-disable-line
            // 移除 console
            drop_console: true, // eslint-disable-line
            // 移除无用的代码
            dead_code: true // eslint-disable-line
          }
        }
      })
    ]
  },
  plugins: [
    // 在编译时创建配置的全局常量
    // 本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个实际的引号
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
