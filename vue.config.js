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
      args[0].title = 'vue'
      return args
    })
  },
  devServer: {
    port: 3000,
    disableHostCheck: true,
    proxy: {
      '/proxy/location': {
        target: 'https://map.baidu.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy/location': ''
        }
      }
    }
  }
}
