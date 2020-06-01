<template>
  <article class="hostContainer">
    <Header></Header>
    <Main></Main>
  </article>
</template>
<script>
import Header from "./layout/Header";
import Main from "./layout/Main";
export default {
  name: "host",
  components: { Header, Main }
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

header {
  padding-top: 10px;
  width: 100%;
  height: 70px;
  text-align: center;
  color: rgba(253, 255, 255, 1);
  font-weight: bolder;
  position: relative;
}

main {
  width: 100%;
  height: auto;
  position: relative;
  margin-top: 70px;
  display: flex;
}
</style>
