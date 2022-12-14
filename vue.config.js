module.exports = {
  publicPath:'./',
  outputDir:"dist", //打包时生成的生产环境构建文件的目录
  assetsDir: "static", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  css:{
    extract:true,
    sourceMap:false,
    loaderOptions:{},
    requireModuleExtension:true
  }
}