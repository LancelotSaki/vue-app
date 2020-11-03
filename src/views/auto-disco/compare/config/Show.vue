<template>
  <article>
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </article>
</template>

<script>
  import Main from "./layout/Main";
  import Header from "./layout/Header";
  import Footer from "./layout/Footer";
  /* author : admin */
  export default {
    name: "auto-find-result-show",
    components: { Header, Main, Footer },
    data() {
      return {
      }
    },
    methods: {

    }
  };
</script>

<style scoped>

</style>
