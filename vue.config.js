const TerserPlugin = require('terser-webpack-plugin')
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.devtool = 'source-map'
    return {
      optimization:
        process.env.NODE_ENV === 'development'
          ? {}
          : {
              minimize: true,
              minimizer: [
                new TerserPlugin({
                  parallel: true,
                  extractComments: false,
                  terserOptions: {
                    compress: {
                      drop_debugger: true,
                      drop_console: true
                    }
                  }
                })
              ]
            }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '数字化营销团购'
      return args
    })
  },
  devServer: {
    proxy: {
      '/proxy/7000': {
        target: 'http://192.168.0.22:7000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7000': ''
        }
      },
      '/proxy/7001': {
        target: 'http://192.168.0.22:7001',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7001': ''
        }
      },
      '/proxy/7002': {
        target: 'http://192.168.0.22:7002',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7002': ''
        }
      }
    }
  }
}
