<template>
  <article>
    <section>
      <Main></Main>
    </section>
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
  article {
    position: relative;
    width: 100vw;
    min-height: 430px;
    overflow-y: auto;
    height: 100vh;
  }

  article,
  section::before {
    background: url("../../assets/images/star.jpg") 0 / cover fixed;
  }

  @media screen and (max-width: 400px) {
    section {
      position: absolute;
      width: 340px;
      min-width: 340px;
      height: 430px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border-radius: 5px;
      background: hsla(0, 0%, 100%, 0.25) border-box;
      overflow: hidden;
      box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
      0 0.5em 1em rgba(0, 0, 0, 0.6);
      text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
      display: block;
    }
  }

  @media screen and (min-width: 400px) and (max-width: 800px) {
    section {
      position: absolute;
      width: 400px;
      height: 430px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border-radius: 5px;
      background: hsla(0, 0%, 100%, 0.25) border-box;
      overflow: hidden;
      box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
      0 0.5em 1em rgba(0, 0, 0, 0.6);
      text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
      display: block;
    }
  }

  @media screen and (min-width: 800px) {
    section {
      position: absolute;
      width: 500px;
      height: 430px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border-radius: 5px;
      background: hsla(0, 0%, 100%, 0.25) border-box;
      overflow: hidden;
      box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
      0 0.5em 1em rgba(0, 0, 0, 0.6);
      text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
      display: block;
    }
  }
</style>