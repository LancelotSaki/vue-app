<template>
  <footer>
    <ul>
      <li>意见反馈</li>
      <li>帮助中心</li>
      <li>关于CMDB</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "HomeFooter"
};
</script>
<style scoped>
  ul {
    margin: 0 auto;
    width: calc(100% - 200px);
    display: flex;
    flex-wrap: nowrap;
  }
  ul>li {
    width: 100px;
  }
</style>
