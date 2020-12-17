/**
 * webpack 开发环境配置
 * 包括 devServer、API mock 等相关配置
 */
const webpack = require("webpack");
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const fs = require("fs"); // 文件系统
const path = require("path"); // 引入nodejs再带的path模块，用于处理目录的对象

const devWebpackConfig = {
  mode: 'development',
  /**
  * 生产环境不使用或者使用 source-map
  * 开发环境使用cheap-module-eval-source-map
  */
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    // 在编译时创建配置的全局常量
    // 本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个实际的引号
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"http://dev-api.server.com"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: path.join(__dirname, '../favicon.ico'),
      inject: true
    }),
    //启用模块热替换
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running here: http://localhost:3000'],
      }
    })
  ],
  //web服务器配置
  devServer: {
    stats: 'minimal', // 精确地控制 bundle 显示的信息, 只在发生错误或新的编译开始时输出
    contentBase: path.join(__dirname, "../dist"),   //静态文件的来源
    openPage: 'index.html',  //默认打开的页面
    compress: true,  //服务都启用gzip 压缩
    port: 3000,  //服务端口号
    noInfo: true,  //消息将被隐藏,错误和警告仍然会显示
    hot: true,          //启用 webpack 的模块热替换特性
    inline: true,       //可以监控js变化，一段处理实时重载的脚本被插入到你的包(bundle)，并且构建消息将会出现在浏览器控制台
    historyApiFallback: true,  //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  },
};

//自动生成html页面
function htmlPageArr(dir) {
  let pluginsArr = [];
  fs.readdirSync(dir).forEach((value) => {
    let fPath = path.join(dir, value);
    let stats = fs.statSync(fPath);
    if (stats.isDirectory()) {
      let htmlPlugin = new HtmlWebpackPlugin({
        filename: value + '.html', //生成的html存放路径，相对于path
        template: './src/views/'+ value +'/'+ value +'.html',  //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        chunks: [value, "commons"], //需要引入的chunk，不配置就会引入所有页面的资源
      })
      pluginsArr.push(htmlPlugin);
    }
  })
  return pluginsArr;
}

module.exports = merge(baseWebpackConfig, devWebpackConfig);
