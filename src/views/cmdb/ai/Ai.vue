<template>
  <article>
    <Header></Header>
    <Main></Main>
  </article>
</template>
<script>
import Main from "./layout/Main";
import Header from "./layout/Header";
export default {
  name: "cmdb-deploy",
  components: { Header, Main }
};
</script>
<style>
article {
  background-color: rgba(255, 255, 255, 0.618);
}

.pop {
  font-size: small;
  border-radius: 5px;
  width: 365px;
  padding: 10px;
  box-shadow: 0 1px 4px #ddd;
  color: white;
}

.pop ul {
  display: flex;
  justify-content: space-evenly;
  line-height: 20px;
  padding-left: 10px;
}

.pop ul li:first-child {
  width: 65px;
  text-align: right;
  color: #e3d138;
  margin-bottom: 10px;
}

.pop ul li:nth-child(2) {
  text-shadow: 0 1px rgba(122, 174, 195, 0.15), 0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45), 0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75), 2px 4px 5px rgba(122, 174, 195, 1);
  width: calc(100% - 80px);
  overflow-wrap: break-word;
  word-break: break-word;
  word-wrap: break-word;
  margin-bottom: 10px;
}
</style>
