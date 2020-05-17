<template>
  <header>
    <ul>
      <li>设置</li>
      <li>个人中心</li>
      <li>常用链接</li>
      <li></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      title: "自动发现拓扑图"
    };
  }
};
</script>
<style scoped>
  header::before {
    content: "CMDB";
    position: absolute;
    display: inline-block;
    width: 200px;
    height: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    left: 15px;
    top: 0;
  }
  ul {
    margin-left: 200px;
    width: calc(100% - 200px);
    display: flex;
  }
  ul>li {
  }
</style>
