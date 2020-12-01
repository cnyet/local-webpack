const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 不同命名空间下静态资源的路径前缀
const assetPrefixForNamespace = (namespace) => {
  switch (namespace) {
    case 'prod':
      return 'https://cache.myserver.net/web';
    case 'uat':
      return 'https://cache-uat.myserver.net/web';
    case 'st':
      return 'https://cache-st.myserver.net/web';
    case 'dev':
      return 'https://cache-dev.myserver.net/web';
    default:
      return '';
  }
};
const namespace = process.env.NAMESPACE;  // 命名空间
__webpack_public_path__ = `${assetPrefixForNamespace(namespace)}/`;  // CDN主机根据不同的环境来定义__webpack_public_path__

module.exports = {
  entry: './src/index.js',  // 项目入口文件，支持字符串、对象、数组
  output: {   // 项目的输出文件
    /**
     * hash: 修改任何文件都会改变hash
     * chunkhash: entry 的模块文件不变hash不变
     * contenthash: 把 CSS 从 JS 中使用mini-css-extract-plugin 或 extract-text-webpack-plugin抽离出来并使用 contenthash
     */
    filename: 'js/' + '[name]-[hash:7].js',
    publicPath: '/',  // 指定在浏览器中被引用的 URL 地址，用来作为src或者link指向该文件
    /**
     * var: 只能以 <script> 标签的形式引入
     * commonjs: 只能按照 commonjs 的规范引入
     * amd: 只能按照 amd 规范引入
     * umd: 可以用<script>、commonjs、amd 引入
     */
    // libraryTarget: 'amd',  // 指定库打包出来的规范
    // target:   // 两种类型：string 和 function。
  },
  /**
  * 生产环境不使用或者使用 source-map
  * 开发环境使用cheap-module-eval-source-map
  */
  devtool: 'eval-cheap-module-source-map',
  // 帮助webpack快速遍历模块依赖
  resolve: {
    // 省略引入的模块扩展名
    extensions: ['.js', '.ts', '.json'],
    // 简化引入的模块路径
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 给不同的模块设置模块处理器
  module: {
    // 忽略不是模块化的文件
    noParse: /jquery|lodash/,
    // 给不同的模块设置loader
    rules: [{
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
      test: /\.css$/,
      // 设置loader的规则和从后到前执行顺序
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/,
      // 设置loader的规则和从后到前执行顺序
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'sass-loader',
        'postcss-loader'
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
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
            // mozjpeg: {
            //   progressive: true,
            // },
            // // optipng.enabled: false will disable optipng
            // optipng: {
            //   enabled: false,
            // },
            // pngquant: {
            //   quality: [0.65, 0.90],
            //   speed: 4
            // },
            // gifsicle: {
            //   interlaced: false,
            // },
            // svgo: {
            //   removeViewBox: false,
            // },
            // // the webp option will enable WEBP
            // webp: {
            //   quality: 75
            // }
          }
        }
      ]
    }]
  },
  // webpack4 以上版本模块优化设置
  optimization: {
    // 将公共模块拆分
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
    },
    minimize: true,   // 启用minimizer定义的插件优化
    minimizer: [new CssMinimizerPlugin()]  // 用cssnano优化和压缩css文件
  },
  plugins: [
    // 导出css文件到单独的chunk，以<link>的方式引入样式文件
    new MiniCssExtractPlugin({
      filename: 'css/' + '[name]-[contenthash:7].css',
      chunkFilename: '[id].css'
    }),
    // 限制合并chunk的文件大小
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000 // Minimum number of characters
    }),
    // 生成html页面
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './public/index.html'
    })
  ]
};
