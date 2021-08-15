module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    proxy: {
      '/61_op': {
        // 此处的写法，目的是为了 替换
        target: 'http://202.114.205.61:8060',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/61_op': ''
        }
      },
      '/62_op': {
        // 此处的写法，目的是为了 替换
        target: 'http://202.114.205.62:8060',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/62_op': ''
        }
      },
      '/63_op': {
        // 此处的写法，目的是为了 替换
        target: 'http://202.114.205.63:8060',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/63_op': ''
        }
      },
      '/64_op': {
        // 此处的写法，目的是为了 替换
        target: 'http://202.114.205.64:8060',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/64_op': ''
        }
      },
      '/baidu': {
        // 此处的写法，目的是为了 替换
        target: 'https://www.baidu.com',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/baidu': ''
        }
      }
    }
  }
}
