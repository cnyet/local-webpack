const webpack = require("webpack");
const fs = require("fs"); //文件系统
const path = require("path"); //引入nodejs再带的path模块，用于处理目录的对象
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理文件
const merge = require('webpack-merge'); //合并多个配置文件，后面的文件会覆盖前面的文件
const devConfig = require("./config/webpack.dev");    //开发环境配置
const prodConfig = require("./config/webpack.prod");    //生产环境配置

//自动生成入口文件列表
function getEntryfile(dir){
  let result = {};
  fs.readdirSync(dir).forEach((val, index) => {
    let fPath = path.join(dir, val);
    let stats = fs.statSync(fPath);
    if (stats.isDirectory()) {
      result[val] = './src/views/' + val +"/"+ val +'.js';
    }
  })
  return result;
}

module.exports = function (env) {
  const prodEnv = env && env.production ? true : false;
  const mergeConf = prodEnv ? prodConfig : devConfig;

  return merge(mergeConf, {
    entry: getEntryfile("./src/views/"),
    output: {
      path: path.resolve(__dirname, "dist"), //输出文件目录
      filename: 'js/[name].js',
      hashDigestLength: 10, //全局配置散列摘要的前缀长度
      publicPath: ""
    },
    module: {
      rules: [{
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          fix: true,
          emitError: true,
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        }),
      }, {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader?limit=8192&name=images/[name].[ext]']
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader?name=fonts/[name].[ext]']
      }, {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            // attrs: [":data-src"],
            interpolate: "require"
          }
        }
      }]
    },
    resolve: {
      //自动解析确定的文件扩展
      extensions: ['.js', '.vue', '.json'],
      //解析模块时应该搜索的目录
      modules: [path.resolve(__dirname, "src"), 'node_modules'],
      //设置别名
      alias: {
        '@': path.join(__dirname, "src"),
      }
    },
    //优化处理
    optimization: {
      //优化按需加载的文件
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2
          }
        }
      },
      //优化runtime的文件
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false, //是否支持ie8
          ecma: 5, //支持ECMAScript的版本
          output: {}, //默认输出为最佳压缩优化
          compress: true, //压缩选项
          warnings: false, //显示警告提示
          sourceMap: true     //支持sourcemap
        }
      }),
      new ExtractTextPlugin({
        filename: (pathName) => {
          return pathName('css/[name].css');
        },
        allChunks: true
      }),
      new CleanWebpackPlugin(['dist']),

    ]
  })
}
