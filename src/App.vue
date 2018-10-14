<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 使用
let throttle = require("lodash.throttle");
export default {
  name: "app",
  components: {},
  created() {
    // 赋初值
    this.listenMouse();
  },
  mounted() {
    // 节流函数
    window.addEventListener("scroll", throttle(this.listenMouse, 500));
  },
  methods: {
    listenMouse: function() {
      // 兼容浏览器必须要两者都要用起来
      // 当前浏览器高度
      const scroll = document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight;
      const ch = document.documentElement.clientHeight;
      const maxHeight = sh - ch;
      // 第二个参数是对应传进来的参数
      this.$store.commit("changeScrollHeight", scroll);
      // 当前浏览器滚动条的最大高度
      this.$store.commit("changeScrollMaxHeight", maxHeight);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  moz-osx-font-smoothing: grayscale;
}

html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ul > li {
  list-style: none;
  margin-bottom: 10px;
}

ol > li {
  list-style: none;
}
</style>
