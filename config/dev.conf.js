const ManifestPlugin = require('webpack-manifest-plugin'); //保留所有模块的映射关系的详细要点


module.exports = {

  mode: "development",
  plugins: [
    //生成映射关系的依赖图
    new ManifestPlugin({
        fileName: "manifest/manifest.json"
    }),
    //提取css文件，单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    new ExtractTextPlugin({
        filename: (getPath) => {
            return getPath('[name]/[name].css').replace('common', 'assets/common');
        },
        allChunks: true
    })
  ]
}