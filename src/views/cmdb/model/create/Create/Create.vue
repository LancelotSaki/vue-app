<template>
  <article class="model-create">
    <Main></Main>
    <Footer></Footer>
  </article>
</template>

<script>
/* author : admin */
import Main from "./layout/Main";
import Footer from "./layout/Footer";

export default {
  name: "model-create",
  components: { Main, Footer },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<!--加scoped 样式局部有效-->
<style scoped>

</style>
