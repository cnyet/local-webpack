# webpack-demo
### 基于webpack4.16.5配置纯静态多页应用打包的实例
> 源码部分分为四部分，静态资源、每个单独的页面模块、组件、测试数据等，<br>
> 打包后形成静态资源和每个独立的页面部分。
- webpack.config.js

```
.
├── bower_components                //bower组件库文件目录
├── dist                            //编译后的文件目录
│     ├──── css                  //样式文件目录
│     ├──── js                   //js文件目录
│     ├──── images                    //图片文件目录
│     ├──── fonts                    //字体文件目录
│     ├──── index.html               //首页页面文件
│     └──── ……                      //其他页面目录
├── node_modules                    //node模块目录
├── config                          //配置文件目录
│     ├──── server.js               //服务器配置文件
│     ├──── webpack.dev.js               //webpack开发环境配置
│     ├──── webpack.prod.js               //webpack生产环境配置
│     └──── ……
├── src                             //源文件目录
│     ├──── components              //组件文件目录
│     ├──── statics                 //静态资源文件目录
│     │     ├──── images               //公共图片文件目录
│     │     ├──── styles               //公共样式文件
│     │     └──── scripts               //公共js文件
│     └──── views              //页面文件目录
│           ├──── index                //index页面目录
│                 ├──── index.css      //index的样式文件
│                 ├──── index.js       //index的js文件
│                 └──── index.html     //index的页面文件
├── vendors                         //第三方插件和组件文件目录
├── README.md                       //说明文件
├── .gitignore                      //git提交忽略文件集合
├── .bowerrc                        //bower配置文件
├── .eslint.js                      //eslint检测js配置文件
├── postcss.config.js               //postcss优化css配置文件
├── tasklist.todo                   //todo待完成的任务列表文件
├── bower.json                      //bower文件依赖关系说明
├── webpack.config.js               //webpack配置文件
├── LICENSE                         //license
└── package.json                    //项目依赖关系说明

```
