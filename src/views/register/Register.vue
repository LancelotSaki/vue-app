<template>
  <article :style="{ backgroundImage: currentBackgroundImage }">
    <Header @updateToFather="changeBackground"></Header>
    <Main></Main>
  </article>
</template>
<script>
import Header from "./layout/Header";
import Main from "./layout/Main";
export default {
  name: "RegisterCore",
  components: { Header, Main },
  data() {
    return {
      currentBackgroundImage:
        "url(" + require("../../assets/images/background/back.jpg") + ")"
    };
  },
  mounted() {},
  methods: {
    changeBackground(val) {
      const urlPah = require("../../assets/images/background/" + val);
      this.currentBackgroundImage = "url(" + urlPah + ")";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../public/css/label-reset.css";
article {
  position: relative;
  width: 100%;
  min-height: 430px;
  overflow-y: auto;
  height: 100%;
}

article,
main::before {
  background-image: url("../../assets/images/background/back.jpg");
  background-size: cover;
  background-position: 0 center;
  background-attachment: fixed;
}
main::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: -30px;
  z-index: -1;
  -webkit-filter: blur(20px);
  filter: blur(20px);
}
main {
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
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 400px) {
  main {
    position: absolute;
    width: 340px;
    min-width: 340px;
    height: 430px;
  }
}

@media screen and (min-width: 400px) and (max-width: 800px) {
  main {
    position: absolute;
    width: 400px;
    height: 430px;
  }
}

@media screen and (min-width: 800px) {
  main {
    position: absolute;
    width: 500px;
    height: 430px;
  }
}
</style>
