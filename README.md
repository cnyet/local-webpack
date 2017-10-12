# webpack-demo
### 基于webpack3.6.0配置纯静态多页应用打包的实例
> 源码部分分为四部分，静态资源、每个单独的页面模块、组件、测试数据等，<br>
> 打包后形成静态资源和每个独立的页面部分。
- webpack.config.js 是开发环境的配置
- webpack.prod.js 是生产环境的配置

```
.
├── bower_components                //bower组件库文件目录
├── dist                            //编译后的文件目录
├── src                             //源文件目录
├── node_modules                    //node模块目录
├── vendors                         //第三方插件和组件文件目录
├── README.md                       //说明文件
├── .gitignore                      //git提交忽略文件集合
├── .bowerrc                        //bower配置文件
├── bower.json                      //bower文件依赖关系说明
├── gulpfile-dev.js                 //gulp开发环境配置文件
├── gulpfile-deploy.js              //gulp发布配置文件
├── gulpfile-test.js                //gulp测试环境配置文件
├── gulpfile.js                     //gulp主要配置文件
├── LICENSE.json                    //license
└── package.json                    //项目依赖关系说明    

```
