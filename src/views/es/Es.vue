<template>
  <article class="es-home">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </article>
</template>

<script>
/* author : admin */
import Main from "./layout/Main";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default {
  name: "ES",
  components: { Header, Main, Footer },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<!--加scoped 样式局部有效-->
<style scoped>
@media screen and (max-width: 600px) {
  .es-home {
    width: 100%;
    height: 100%;
    background: rgba(252, 250, 248, 0.76);
  }
}
@media screen and (min-width: 600px) {
  .es-home {
    width: 100%;
    height: 100%;
    background: rgba(252, 250, 248, 0.76);
  }
}

main {
  height: calc(100%);
}
footer {
  /* height: 40px;
  background: rgba(250, 250, 250, 0.618);*/
}
</style>
