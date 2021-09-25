const TerserPlugin = require("terser-webpack-plugin");
const production = process.env.NODE_ENV === "production";
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: !production,
    productionSourceMap: false,
    chainWebpack: config => {
        // 为生产环境修改配置...
        if (production) {
            config.optimization.minimizer([new TerserPlugin({
                terserOptions: {
                    mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接
                    compress: {
                        drop_console: true,//传true就是干掉所有的console.*这些函数的调用.
                        drop_debugger: true, //干掉那些debugger;
                        pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
                    }
                }
            })])
        } else {
            // 为开发环境修改配置...
        }
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("public", resolve("public"));
    },
    configureWebpack: config => {

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
