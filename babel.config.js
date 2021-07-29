module.exports = {
  // 按需引入element-plus
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
