const postcssSprites = require('postcss-sprites');

module.exports = {
  plugins: [
    require('autoprefixer'),  // 添加前缀
    require('postcss-nested'),  // 解析样式嵌套规则
    require('postcss-preset-env'),  // 根据预设的浏览器支持的样式版本来编译最新的css 新特性
    require('cssnano'),  // 合并压缩一些类，缩短一些常见的值
    require('postcss-import'),  // 处理 @import 引入的样式文件
    postcssSprites({
      // stylesheetPath: './dist',
      // 在这里制定了从哪里加载的图片被主动使用css sprite
      // 可以约定好一个目录名称规范，防止全部图片都被处理
      spritePath: './dist/images',
      //支持retina，可以实现合并不同比例图片
      retina: true,
      //过滤一些不需要合并的图片，返回值是一个promise
      filterBy: function(image){
        if (/\?_sprite/.test(image.originalUrl)) {
          return Promise.resolve();
        }else{
          return Promise.reject();
        }
      }
    })
  ]
}
