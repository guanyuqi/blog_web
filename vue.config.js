const path = require('path') //引入path模块
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  chainWebpack: config => {
    /* 公共SCSS */
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/styles/public.scss'
        })
        .end()
    })
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
    // 用cdn方式引入
    config.externals({
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      echarts: 'echarts'
    })
  },
  // 开启Gzip
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false, // 不删除源文件
            minRatio: 0.8 // 压缩比
          })
        ]
      }
    }
  }
}
