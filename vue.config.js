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
  },
  devServer: {
    proxy: {
      "/es-service": {
        target: "http://127.0.0.1:9009/",
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        ws: true,
        pathRewrite: {// 路径改写规则
          "^/es-service": "/" // 以/proxy/为开头的改写为""
        }
      }
    }
  }
};
