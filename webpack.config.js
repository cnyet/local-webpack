var webpack = require("webpack");
var path = require("path");                                                      //引入nodejs再带的path模块，用于处理目录的对象
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");     //将模块中公共部分抽离出来生成单独的文件
var HtmlWebpackPlugin = require("html-webpack-plugin");                          //生成HTML文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");     //将js中引用的css文件分离出单个CSS文件
var CleanWebpackPlugin = require('clean-webpack-plugin');           //清理文件
var ManifestPlugin = require('webpack-manifest-plugin');            //保留所有模块的映射关系的详细要点
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');            //删除未引入的代码

module.exports = {
    //配置入口文件，多个入口文件
    entry: {
        app: "./assets/scripts/main.js",
        // print: "./assets/scripts/greeter.js"        
    },
    devtool: 'inline-source-map',       //编译后的代码映射回原始源代码
    //实时重新加载根目录
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 8080         
    },    
    //打包输出文件配置
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    //loader 用于对模块的源代码进行转换
    module: {
        //当遇到在require()/import加载的文件时，打包之前先使用对应的loader转换一下
        rules: [
            {test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']}
        ]
    },
    //解决loader无法实现的事
    plugins: [
        //将公共代码抽离出来合并为一个文件
        // new CommonsChunkPlugin({
        //      name: 'common' // 指定公共 bundle 的名称。
        // }),
        new HtmlWebpackPlugin({
            title: '默认首页'
        }),
        new ExtractTextPlugin("styles.css"),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin(),
        // new UglifyJSPlugin()
    ]
}