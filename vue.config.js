module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //不生成.map文件
      config.output.publicPath = "";
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
};
