<template>
  <article class="cmdb">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </article>
</template>

<script>
/* author : admin */
export default {
  name: "CMDB"
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
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.cmdb {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
