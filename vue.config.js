const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const production = process.env.NODE_ENV === "production";
module.exports = {
  lintOnSave: !production,
  productionSourceMap: false,
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (production) {
      config.optimization.minimizer[0] = new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_debugger: true,
            drop_console: true, //console
            pure_funcs: ["console.log"] //移除console
          }
        },
        sourceMap: false,
        parallel: true
      });
    } else {
      // 为开发环境修改配置...
    }
  }
};
