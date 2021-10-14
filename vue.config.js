const TerserPlugin = require('terser-webpack-plugin')
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  lintOnSave: false,
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
      args[0].title = '口子窖数字化营销平台'
      return args
    })
  },
  devServer: {
    host: '192.168.0.70',
    overlay: {
      warning: false,
      errors: true
    },
    proxy: {
      '/proxy/7003': {
        target: 'http://113.125.80.26:7003',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7003': ''
        }
      },
      '/proxy/7001': {
        target: 'http://113.125.80.26:7001',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7001': ''
        }
      },
      '/proxy/7002': {
        target: 'http://113.125.80.26:7002',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7002': ''
        }
      },
      '/proxy/7000': {
        target: 'http://113.125.80.26:7000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/7000': ''
        }
      }
    }
  }
}
