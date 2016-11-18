var gulp = require("gulp"),                     //gulp基础库
    os = require("os"),                         //操作系统平台模块
    gutil = require("gulp-util"),               //包含gulp很多的插件工具
    less = require("gulp-less"),                //将less编译成css
    concat = require("gulp-concat"),            //文件合并
    gulpOpen = require("gulp-open"),            //gulp打开文件或url
    cssmin = require("gulp-cssmin"),            //压缩css文件
    md5 = require("gulp-md5-plus"),             //文件名加md5
    fileinclude = require("gulp-file-include"), //在html中引入模板文件
    clean = require("gulp-clean"),              //清除文件
    spriter = require("gulp-css-spriter"),      //将sprite图合并生成样式文件
    base64 = require("gulp-css-base64"),        //把小图片的URL替换为Base64编码图片
    webpack = require("webpack"),               //webpack基础库
    webpackConfig = require('./webpack.config.js'), //引入webpack的配置文件
    connect = require('gulp-connect');              //在本地启动一个web服务器

var host = {
    path: "dist/",
    port: 3000,
    html: "index.html"
};

//配置打开的浏览器，mac chrome: "Google chrome"
var browser = os.platform() === "linux" ? "Google chrome" : (
    os.platform() === "darwin" ? "Google chrome" : (
        os.platform() === "win32" ? "chrome" : "firefox"
    ));
 var pkg = require("./package.json");

//将图片拷贝到目标目录
gulp.task("copy:images", function (done) {
    gulp.src("src/images/**/*")
        .pipe(gulp.dest("dist/images"))
        .on("end", done);
});
//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task("lessmin", function (done) {
    gulp.src(["src/css/main.less", "src/css/*.css"])
        .pipe(less())
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("dist/css"))
        .on("end", done);
});
//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task("md5:js", ["build-js"], function (done) {
    gulp.src("dist/js/*.js")
        .pipe(md5(10, "dist/views/*.html"))
        .pipe(gulp.dest("dist/js"))
        .on("end", done);
});
//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task("md5:css", ["sprite"], function (done) {
    gulp.src("dist/css/*.css")
        .pipe(md5(10, "dist/views/*.html"))
        .pipe(gulp.dest("dist/css"))
        .on("end", done);
});
//用于在html文件中直接include文件
gulp.task("fileinclude", function (done) {
    gulp.src("src/views/*.html")
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulp.dest("dist/views"))
        .on("end", done);
});
//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task("sprite", ["copy:images", "lessmin"], function (done) {
    var timestamp = +new Date();
    gulp.src("dist/css/style.min.css")
        .pipe(spriter({
            // 生成的spriter的位置
            spriteSheet: "dist/images/spritesheet" + timestamp + ".png",
            // 生成样式文件图片引用地址的路径
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});
//清除文件
gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});
//监听文件变化
gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['lessmin', 'build-js', 'fileinclude'])
        .on('end', done);
});
//gulp本地服务
gulp.task('connect', function () {
    console.log('connect----------------------------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});
//自动在浏览器中打开页面
gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/views'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lessmin', 'build-js', 'watch', 'open']);