<template>
  <header>
    <a @click="changeBackground(0)">背景一</a>
    <a @click="changeBackground(1)">背景二</a>
    <a @click="changeBackground(2)">背景三</a>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    changeBackground(val) {
      var defaultBg = ["star.jpg", "back.jpg", "blue.jpg"];
      // 直接把数据发送给父组件
      this.$emit("updateToFather", defaultBg[val]);
    }
  }
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  right: 0;
  min-width: 210px;
  height: 50px;
  display: flex;
  /*水平等比*/
  justify-content: space-between;
  /*垂直等高*/
  align-items: center;
}

header > a {
  /*子容器等比分割*/
  flex: 1;
  margin-right: 20px;
  color: white;
}

header > a:hover {
  cursor: pointer;
  color: #ff7597;
}
</style>
