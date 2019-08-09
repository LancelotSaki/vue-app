<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  moz-osx-font-smoothing: grayscale;
}

html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ul > li {
  list-style: none;
  margin-bottom: 10px;
}

ol > li {
  list-style: none;
}
</style>
