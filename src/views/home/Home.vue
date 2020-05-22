<template>
  <article>
    <Aside></Aside>
    <section>
      <Header></Header>
      <Main></Main>
    </section>
  </article>
</template>

<script>
  /* author : admin */
  import Aside from "./layout/Aside";
  import Main from "./layout/Main";
  import Header from "./layout/Header";

  export default {
    name: "HomeCore",
    components: {Aside, Header, Main},
    data() {
      return {
        nodes: [],
        edges: []
      };
    },
    mounted() {
    },
    methods: {}
  };
</script>
<style scoped>
  article {
    width: 100%;
    height: 100%;
  }

  article:after {
    content: "";
    clear: both;
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  @media screen and (min-width: 600px) {
    aside {
      position: fixed;
      width: 200px;
      top: 0;
      left: 0;
      height: 100vh;
      background: white;
      z-index: 99;
    }

    section {
      margin-left: 200px;
      width: calc(100% - 200px);
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      position: relative;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: rgba(248,248,248,1);
    }


    main {
      position: relative;
      width: 100%;
      margin-top: 60px;
      height: calc(100% - 60px);
      overflow-y: auto;
    }

    footer {
      position: relative;
      width: 100%;
      height: 40px;
      background: rgba(250, 250, 250, 0.78);
      color: rgba(145, 149, 163, 1);
      line-height: 40px;
    }
  }

  @media screen and (max-width: 600px) {

    aside {
      position: fixed;
      float: left;
      width: 200px;
      height: 100vh;
      background: white;
      display: none;
    }

    section {
      position: fixed;
      left: 200px;
      top: 0;
      width: calc(100% - 200px);
      height: 100vh;
      display: flex;
    }

    header {
      position: relative;
      width: 100%;
      height: 100px;
      background: aquamarine;
    }

    main {
      position: relative;
      width: 100%;
    }

    footer {
      position: relative;
      width: 100%;
      height: 100px;
      background: #42b983;
    }
  }

  p {
    margin-left: 10px;
  }
</style>