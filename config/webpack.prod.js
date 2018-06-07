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
        hash: true,                         //为静态资源生成hash值
        chunks: [value, "commons"], //需要引入的chunk，不配置就会引入所有页面的资源
        //配置插入页面的meta属性
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        minify: { //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true //删除空白符与换行符
        }
      })
      pluginsArr.push(htmlPlugin);
    }
  })
  return pluginsArr;
}

module.exports = {
  mode: 'production',
  //编译后的代码映射回原始源代码
  devtool: 'source-maps',
  plugins: [
    //在编译出现错误时跳过输出阶段,确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),
    ...htmlPageArr(path.join(__dirname, "..", "src/views/")),
  ]
}
