module.exports =  ({ file, options, env }) => ({
  plugins: {
    //检测到主样式表中@import的文件然后合并到文件中，自动发现Bower Component和Node Module中样式文件
    'postcss-import': { root: file.dirname },
    //处理图片和 SVG
    'postcss-assets': {},
    //添加浏览器前缀
    'autoprefixer': {},
    //压缩和优化样式表的功能
    'cssnano': {},
    //处理包含类似sass的新特性
    "precss": {},
    //生成雪碧图
    "postcss-sprites": {
      // stylesheetPath: './dist',
      //雪碧图合并后存放地址
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
    }
  }
});
