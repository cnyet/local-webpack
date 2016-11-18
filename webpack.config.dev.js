var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: 'source-map',
    entry:  __dirname + "/src/js/main.js",
    output: {
        path: __dirname + "/build",            //打包后的文件存放的地方
        filename: "bundle.js",                  //打包后输出文件的文件名
        publicPath: "build/"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'//添加对样式表的处理
            }
        ]
    },
    plugins: []
};