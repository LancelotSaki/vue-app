<template>
  <article>
    <Header></Header>
    <main>
      <Aside></Aside>
      <Section></Section>
    </main>
  </article>
</template>

<script>
/* author : admin */
import Aside from "./layout/Aside";
import Section from "./layout/Section";
import Header from "./layout/Header";

export default {
  name: "HomeCore",
  components: { Aside, Header, Section },
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
<style scoped>
article {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

article:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

header {
  position: relative;
  height: 60px;
}

main {
  flex: 1;
  flex-direction: row;
  display: flex;
  background: rgba(248, 248, 248, 1);
}

aside {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 100%;
}

section {
  display: flex;
  height: 100%;
  flex: 1;
}

/*@media screen and (max-width: 600px) {
  aside {
    position: fixed;
    float: left;
    width: 200px;
    height: 100vh;
    background: white;
    display: none;
  }

  section {

    left: 200px;
    top: 0;
    width: calc(100% - 200px);
    height: 100vh;
    display: flex;
  }

  main {
    position: relative;
    width: 100%;
    margin-top: 60px;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }

  footer {
    position: relative;
    width: 100%;
    height: 100px;
    background: #42b983;
  }
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

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(248, 248, 248, 1);
  }

  main {
    position: relative;
    width: 100%;
    margin-top: 60px;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
}*/

p {
  margin-left: 10px;
}
</style>
