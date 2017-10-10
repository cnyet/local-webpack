/**
 * 生产环境的的打包配置 *
 */
var webpack = require("webpack"),                                               //webpack基础库
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),    //将模块中公共部分抽离出来生成单独的文件
    path = require("path"),                                                     //引入nodejs再带的path模块，用于处理目录的对象
    CleanWebpackPlugin = require('clean-webpack-plugin'),                       //清理文件
    ExtractTextPlugin = require("extract-text-webpack-plugin"),     //将js中引用的css文件分离出单个CSS文件
    HtmlWebpackPlugin = require("html-webpack-plugin"),                          //生成HTML文件    
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');                           //压缩js文件
    //获取到js文件所在的根目录，process.cwd()：当前工作目录；path.resolve:相当于不断的调用系统的cd命令
var srcDir = path.resolve(process.cwd(), "src");     

module.exports = {
    //配置入口文件，有多个入口文件就写多个
    entry: {
        index: "./src/scripts/page/index.js",
        home: "./src/scripts/page/home.js",
        about: "./src/scripts/page/about.js"
    },    
    //打包输出文件配置
    output: { 
        path: path.resolve(__dirname, "dist"),          //输出文件目录
        filename: "js/[name].[chunkhash].js",                       //输出文件名定义
        chunkFilename: '[name].bundle.js',              //设置非入口文件chunk的文件名
        publicPath: '/'                             //指定在浏览器中所引用的目录,设置服务器上的资源根目录
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
        //自动加载模块，而不必到处 import 或 require
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        //将公共代码抽离出来合并为一个文件
        new CommonsChunkPlugin({           
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','home', 'about'], //提取哪些模块共有的部分
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
            //hash: true,                         //为静态资源生成hash值
            chunks: ['vendors', 'index'],       //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {                           //压缩HTML文件    
                removeComments: true,           //移除HTML中的注释
                collapseWhitespace: false       //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({
            title: 'home',
            favicon: '',                        //favicon路径，通过webpack引入同时可以生成hash值
            filename: 'views/home.html',      //生成的html存放路径，相对于path
            template: 'src/views/home.html',  //html模板路径
            inject: 'body',                     //js插入的位置，true/'head'/'body'/false
            //hash: true,                         //为静态资源生成hash值
            chunks: ['vendors', 'home'],       //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {                           //压缩HTML文件    
                removeComments: true,           //移除HTML中的注释
                collapseWhitespace: false       //删除空白符与换行符
            }
        }),
        //每次构建钱先清除改目录下所有文件
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({
            uglifyOptions: {
              ie8: false,
              ecma: 8,
              output: {
                comments: false,
                beautify: false,
              },
              compress: false,
              warnings: false
            }
        })
    ],
     //编译后的代码映射回原始源代码
    devtool: 'cheap-module-source-map',   
}