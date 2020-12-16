/**
 * webpack 公共配置
 * 包括 entry、loader 和 plugin 相关配置
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 不同命名空间下静态资源的路径前缀
const assetPrefixForNamespace = (namespace) => {
  switch (namespace) {
    case 'prod':
      return 'https://cache.myserver.net/web';
    case 'stag':
      return 'https://cache-stag.myserver.net/web';
    case 'dev':
      return 'https://cache-dev.myserver.net/web';
    default:
      return '';
  }
};
const namespace = process.env.NAMESPACE;  // 命名空间
__webpack_public_path__ = `${assetPrefixForNamespace(namespace)}/`;  // CDN主机根据不同的环境来定义__webpack_public_path__
// 是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',  // 项目入口文件，支持字符串、对象、数组
  // 帮助webpack快速遍历模块依赖
  resolve: {
    // 省略引入的模块扩展名
    extensions: ['.js', '.ts', '.json'],
    // 简化引入的模块路径
    alias: {
      '@': path.resolve(__dirname, 'src')  // HTML 和 CSS 使用alias必须要前面添加 ~
    }
  },
  // 给不同的模块设置模块处理器
  module: {
    // 忽略不是模块化的文件
    noParse: /jquery|lodash/,
    // 给不同的模块设置loader
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      // 匹配文件
      test: /\.js$/,
      // 缩小匹配范围
      include: [
        path.resolve(__dirname, 'src'),
      ],
      // 排除匹配范围
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      // 模块处理器
      loader: 'babel-loader'
    }, {
      test: /\.(sa|sc|c)ss$/,
      // 设置loader的规则和从后到前执行顺序
      use: [
        'vue-style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',  // 将 CSS 转化成 CommonJS 模块, style-loader 将 JS 字符串生成为 style 节点
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader',
        {
          // sass-loader 使用 Sass 提供的 custom importer 特性
          // 从 node_modules 中引入模块，需要在包名前加上 ~
          // url()引入样式文件时传递给了 css-loader，则所有的 url 规则都必须是相对于入口文件
          loader: 'sass-loader',
          options: {
            sourceMap: true,  // 默认值取决于 devtool 选项, 除 eval 和 false 之外的所有值都将开启 source map 的生成
            // implementation 选项可以以模块的形式接受 sass（Dart Sass）或 node-sass, `dart-sass` 是首选
            implementation: require("sass"),
          }
        },
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
        },
        {
          loader: 'image-webpack-loader',  // 压缩图片
          options: {
            // bypassOnDebug: true, // webpack@1.x
            // disable: true, // webpack@2.x and newer
            mozjpeg: {
              progressive: true,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.60, 0.80],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            svgo: {
              removeViewBox: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        }
      ]
    }]
  },
  plugins: [
    // 导出css文件到单独的chunk，以<link>的方式引入样式文件
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:7].css',
      chunkFilename: 'css/[name]-[contenthash:7].css'
    }),
    // 限制合并chunk的文件大小
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000 // Minimum number of characters
    }),
    // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    // 预渲染某些页面，有更好的SEO
    // new PrerenderSPAPlugin({
    //   staticDir: path.join(__dirname, 'dist'),
    //   routes: ['/', '/about']
    // })
  ]
};
