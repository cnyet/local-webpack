const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs"); //文件系统
const path = require("path"); //引入nodejs再带的path模块，用于处理目录的对象
const webServer = require("./server");

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
  devServer: webServer,
  plugins: [
    //启用模块热替换
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPageArr(path.join(__dirname, "..", "src/views/")),
  ]
}
