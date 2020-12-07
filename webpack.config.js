const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: path.resolve(__dirname, './src/index.js'),
  entry: {
    index: './src/index.js',
    chunk: './src/chunk.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    stats: 'minimal',
    contentBase: __dirname
  },
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
