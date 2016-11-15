module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:9090',//资源服务器地址
        'webpack/hot/only-dev-server',
        './static/js/entry.js'
    ],
    output: {
        publicPath: "http://127.0.0.1:9090/static/dist/",
        path: __dirname + "/dist/js",
        filename: "bundle.js"
    },
    //开发服务器的配置
    devServer: {
        contentBase: "./src/",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}
