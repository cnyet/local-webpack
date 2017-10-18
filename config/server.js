//服务器配置
module.exports = {
    // publicPath: "",
    contentBase: "./",   //静态文件的根目录        
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
    inline: true,                           //可以监控js变化，一段处理实时重载的脚本被插入到你的包(bundle)，并且构建消息将会出现在浏览器控制台
    historyApiFallback: true,               //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    // proxy:proxy
};