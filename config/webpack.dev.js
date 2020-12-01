const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs"); //文件系统
const path = require("path"); //引入nodejs再带的path模块，用于处理目录的对象

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

module.exports = {
  mode: 'development',
  //编译后的代码映射回原始源代码
  devtool: "eval",
  //web服务器配置
  devServer: {
    contentBase: path.join(__dirname, "../dist"),   //静态文件的根目录
    openPage: 'index.html',                 //默认打开的页面
    compress: true,                         //一切服务都启用gzip 压缩
    port: 3000,                             //服务端口号
    noInfo: true,                           //消息将被隐藏,错误和警告仍然会显示
    stats: {
      modules: false,                       // 增加内置的模块信息
      cached: false,                        // 增加缓存了的（但没构建）模块的信息
      colors: true,                         // `webpack --colors` 等同于
      chunk: false                          // 增加包信息（设置为 `false` 能允许较少的冗长输出）
    },
    hot: true,                              //启用 webpack 的模块热替换特性
    inline: true,                           //可以监控js变化，一段处理实时重载的脚本被插入到你的包(bundle)，并且构建消息将会出现在浏览器控制台
    historyApiFallback: true,               //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  },
  plugins: [
    //查看要修补(patch)的依赖
    new webpack.NamedModulesPlugin(),
    //启用模块热替换
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPageArr(path.join(__dirname, "..", "src/views/")),
  ]
}
