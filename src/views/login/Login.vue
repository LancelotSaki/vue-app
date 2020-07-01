<template>
  <article class="loginPage">
      <Main></Main>
  </article>
</template>
<script>
import Main from "./layout/Main";
export default {
  name: "LoginCore",
  components: { Main },
  data() {
    return {

    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
  @import "../../../public/css/label-reset.css";
  .loginPage {
    position: relative;
    width: 100vw;
    min-height: 340px;
    overflow-y: auto;
    height: 100vh;
  }

  .loginPage,
  .loginMain::before {
    background: url("../../assets/images/star.jpg") 0 / cover fixed;
  }

  @media screen and (max-width: 400px) {
    .loginMain {
      position: absolute;
      width: 340px;
      min-width: 340px;
      height: 300px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
    }
  }

  @media screen and (min-width: 400px) and (max-width: 800px) {
    .loginMain {
      position: absolute;
      width: 400px;
      height: 300px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
    }
  }

  @media screen and (min-width: 800px) {
    .loginMain {
      position: absolute;
      width: 400px;
      height: 300px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
    }
  }
</style>