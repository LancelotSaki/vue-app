<template>
  <div class="home">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  }
};
</script>

<style>

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }

@media screen and (min-width: 600px) {
  .container {
    width: 100%;
    height: 100%;
  }

  .header {
    position: fixed;
    left: 200px;
    right: 0;
    top: 0;
    height: 60px;
    background: aquamarine;
    z-index: 99;
  }

  .aside {
    position: fixed;
    width: 200px;
    top: 0;
    left: 0;
    height: 100vh;
    background: white;
    z-index: 99;
  }

  .main {
    position: relative;
    margin-top: 60px;
    margin-left: 200px;
    width: calc(100% - 200px);
    height: 1200px;
    background: blueviolet;
  }

  .footer {
    position: relative;
    width: calc(100% - 200px);
    margin-left: 200px;
    height: 100px;
    background: #42b983;
  }
}

@media screen and (max-width: 600px) {
  .container {
    width: 100%;
    height: 100%;
    min-width: 600px;
  }

  .aside {
    position: fixed;
    float: left;
    width: 200px;
    height: 100vh;
    background: white;
    display: none;
  }

  .header {
    position: relative;
    width: 100%;
    height: 100px;
    background: aquamarine;
  }

  .main {
    position: relative;
    width: 100%;
    height: 1200px;
    background: blueviolet;
  }

  .footer {
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
