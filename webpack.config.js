var webpack = require("webpack");
var path = require("path");                                                      //引入nodejs再带的path模块，用于处理目录的对象
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");     //将模块中公共部分抽离出来生成单独的文件
var HtmlWebpackPlugin = require("html-webpack-plugin");                          //生成HTML文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");     //将js中引用的css文件分离出单个CSS文件
var CleanWebpackPlugin = require('clean-webpack-plugin');           //清理文件
var ManifestPlugin = require('webpack-manifest-plugin');            //保留所有模块的映射关系的详细要点
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');            //删除未引入的代码

module.exports = {
    //配置入口文件，有多个入口文件就写多个
    entry: {
        index: "./src/scripts/page/index.js"
    },    
    //打包输出文件配置
    output: { 
        path: path.resolve(__dirname, "dist"),          //输出文件目录
        filename: "js/[name].[chunkhash].js",           //输出文件名定义,并包含每个chunk内容的hash
        chunkFilename: '[name].bundle.js',              //设置chunk后的文件名
            publicPath: '/'                            //输出解析文件的目录,设置服务器上的资源根目录
    },
    //loader 用于对模块的源代码进行转换
    module: {
        //当遇到在require()/import加载的文件时，打包之前先使用对应的loader转换一下
        rules: [
            {test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })},
            {
                test: /\.less$/,
                use: [{loader: "style-loader" },
                { loader: "css-loader"}, 
                { loader: "less-loader" }]
            },
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']}
        ]
    },
    //解决loader无法实现的事
    plugins: [
        //将公共代码抽离出来合并为一个文件
        new CommonsChunkPlugin({           
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','home','about'], //提取哪些模块共有的部分
            minChunks: 3 // 提取至少3个模块共有的部分
        }),        
        //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new ExtractTextPlugin("css/[name].css"),
        //设置页面上的公共信息，有几个写几个
        new HtmlWebpackPlugin({
            title: '默认首页',
            favicon: '',                        //favicon路径，通过webpack引入同时可以生成hash值
            filename: 'views/index.html',      //生成的html存放路径，相对于path
            template: 'src/views/index.html',  //html模板路径
            inject: 'body',                     //js插入的位置，true/'head'/'body'/false
            hash: true,                         //为静态资源生成hash值
            chunks: ['vendors', 'index'],       //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {                           //压缩HTML文件    
                removeComments: true,           //移除HTML中的注释
                collapseWhitespace: false       //删除空白符与换行符
            }
        }),
        //每次构建钱先清除改目录下所有文件
        new CleanWebpackPlugin(['dist']),
        //生成映射关系的依赖图
        new ManifestPlugin({
            fileName: "manifest/manifest.json"
        }),
        // new UglifyJSPlugin()
    ],
    //编译后的代码映射回原始源代码
    devtool: 'inline-source-map',       
    //实时重新加载根目录
    devServer: {        
        contentBase: "./",   //静态文件的根目录
        //publicPath: "/",                       //此路径下的打包文件可在浏览器中访问
        openPage: 'views/index.html',                    //默认打开的页面
        compress: true,                                //一切服务都启用gzip 压缩
        port: 3000,                                     //服务端口号      
        inline: true,                          //可以监控js变化，一段处理实时重载的脚本被插入到你的包(bundle)，并且构建消息将会出现在浏览器控制台
        historyApiFallback: true,
    }
}