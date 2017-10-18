# webpack-demo
### 基于webpack3.6.0配置纯静态多页应用打包的实例
> 源码部分分为四部分，静态资源、每个单独的页面模块、组件、测试数据等，<br>
> 打包后形成静态资源和每个独立的页面部分。
- webpack.config.js

```
.
├── bower_components                //bower组件库文件目录
├── dist                            //编译后的文件目录
│     ├──── assets                  //静态资源文件目录
│     │     ├──── common               //公共图片文件目录
│     │     │     ├──── common.css         //公共的样式文件
│     │     │     └──── common.js          //公共的js文件
│     │     ├──── fonts             //公共字体文件
│     │     └──── images            //公共图片文件
│     ├──── index                   //index目录
│     │     ├──── index.css         //index的样式文件
│     │     └──── index.js          //index的js文件
│     ├──── home                    //home目录
│     │     ├──── home.css          //home的样式文件
│     │     ├──── home.js           //home的js文件
│     │     └──── home.html         //home的页面文件
│     ├──── ……                      //其他页面目录                     
│     └──── index.html               //入库页面文件    
├── node_modules                    //node模块目录
├── config                          //配置文件目录
│     ├──── server.js               //服务器配置文件
│     └──── ……  
├── src                             //源文件目录
│     ├──── mock                    //测试数据目录
│     ├──── modules                 //页面模块目录    
│     │     ├──── index                //index页面目录
│     │     │     ├──── index.css      //index的样式文件
│     │     │     ├──── index.js       //index的js文件
│     │     │     └──── index.html     //index的页面文件
│     │     └──── ……                    
│     ├──── components              //组件文件目录    
│     ├──── statics                 //静态资源文件目录
│     │     ├──── images               //公共图片文件目录
│     │     └──── styles               //公共样式文件
├── vendors                         //第三方插件和组件文件目录
├── README.md                       //说明文件
├── .gitignore                      //git提交忽略文件集合
├── .bowerrc                        //bower配置文件
├── .eslint.js                      //eslint检测js配置文件
├── postcss.config.js               //postcss优化css配置文件
├── tasklist.todo                   //todo待完成的任务列表文件
├── bower.json                      //bower文件依赖关系说明
├── webpack.config.js               //webpack配置文件
├── yarn.lock                       //yarn配置文件
├── LICENSE                         //license
└── package.json                    //项目依赖关系说明    

```
