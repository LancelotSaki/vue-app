<template>
  <div class="hostContainer">
    <Header></Header>
  </div>
</template>
<script>
  import Header from "./layout/Header";
export default {
  name: "host",
  components: { Header},
};
</script>
<style scoped>
  .hostContainer {
    overflow-x: hidden;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.85) !important;
    /* background: url("../../../../npage/cmdb/auto-find/topo/1.png") fixed no-repeat;*/
    background-size: cover;
  }
</style>