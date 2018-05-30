console.log("\n"+process.env.NODE_ENV);
module.exports =  ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
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
    "precss": {}
  }
});
