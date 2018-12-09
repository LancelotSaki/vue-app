const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = process.env.NODE_ENV === "production";
module.exports = {
  lintOnSave: !production,
  productionSourceMap: false,
  configureWebpack: config => {
    if (production) {// 为生产环境修改配置...
      config.optimization.minimizer[0] =
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true, //console
            pure_funcs: ['console.log']//移除console
          },
        },
        sourceMap: false,
        parallel: true,
      })
    } else {
      // 为开发环境修改配置...
    }
  }
};
