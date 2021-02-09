/**
 * webpack 打包基本配置
 * 
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 开发还是生产模式，默认是 production
  mode: process.env.NODE_ENV,
  // 显示性能提示，当打包资源体积较大时，显示一条警告
  performance: {
    hints: 'warning'
  },
  // 入口文件列表
  entry: {
    index: './src/index.js',
    chunk: './src/chunk.js'
  },
  // 输出文件配置
  output: {
    path: path.resolve(__dirname, 'dist'), // 文件输出的目录
    filename: '[name].bundle.js', // 每个输出 bundle 的名称
    publicPath: '/' // 运行时或loader 载入时，引入资源URL的前缀
  },
  // webpack-dev-server 创建的一个本地服务配置
  devServer: {
    stats: 'minimal',  // 在发生错误或新的编译开始时输出捆绑软件信息
    contentBase: __dirname // 
  },
  // 处理不同的模块
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        resourceQuery: /blockType=foo/,
        loader: 'babel-loader'
      }, {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIndentName: '[local]_[hash:base64:8]'
                }
              }
            ]
          }, {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      }, {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // `dart-sass` 是首选
              implementation: require("sass"),
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',  // 复制使用到的资源（不局限于图片）到构建之后的文件夹，并且能够更改对应的链接
            options: {
              name: '[name]-[contenthash:7].[ext]',
              outputPath: '/img/',
              publicPath: '/img/',
            }
          }
        ]
      }
    ]
  },
  // 引入插件，扩展 webpack 功能
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:7].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
