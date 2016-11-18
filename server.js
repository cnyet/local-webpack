var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackDev = require("./webpack.config.js");

var compiler = webpack(webpackDev);

//init server
var app = new webpackDevServer(compiler, {
    //注意此处publicPath必填
    publicPath: webpackDev.output.publicPath,
    //HMR配置
    hot:true,
    stats: { colors: true },
    contentBase: "dist/"
});

app.listen(9390, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});