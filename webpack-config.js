module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: "./modules/main.js",
    output: {
        path: __dirname + "/src/script",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./src",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};
