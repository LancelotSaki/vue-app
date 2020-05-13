<template>
  <div>
    <Aside></Aside>
    <section>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </section>
  </div>
</template>

<script>
/* author : admin */
import Aside from "./Aside";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "HomeCore",
  components: { Aside, Header, Main, Footer },
  data() {
    return {
      nodes: [],
      edges: []
    };
  },
  mounted() {},
  methods: {}
};
</script>
