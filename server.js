var webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    config = require("./webpack-config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8090/");
var compiler = webpack(config),
    server  = new WebpackDevServer(compiler, {
         publicPath: "/src/",
         hot: true,
         historyApiFallback: true,
         proxy: {
             "**": "http://localhost:8090"
            }
         });

 server.listen(8090);
