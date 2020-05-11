<template>
  <div class="topoHome">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
/* author : admin */
export default {
  name: "TopoHome"
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

.topoHome {
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.85) !important;
  /* background: url("../../../../npage/cmdb/auto-find/topo/1.png") fixed no-repeat;*/
  background-size: cover;
}

header {
  padding-top: 10px;
  width: 100%;
  height: 70px;
  text-align: center;
  color: rgba(253, 255, 255, 1);
  font-weight: bolder;
  position: relative;
}

header > p {
  font-size: 1.4em;
  height: 40px;
  margin: 5px 5px;
  padding: 5px 30px 5px 30px;
  text-shadow: 0 1px rgba(122, 174, 195, 0.15), 0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45), 0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75), 2px 4px 5px rgba(122, 174, 195, 1);
  /* border: 1px solid #21A5CA;*/
  /*  clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);*/
}

main {
  display: flex;
  justify-content: space-evenly;
  min-width: 650px;
}

main > aside:first-child::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: calc(100% - 20px);
  height: 3px;
  left: 20px;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    rgba(24, 88, 130, 1) 0%,
    rgba(24, 88, 130, 0.1) 100%,
    transparent 50%
  );
  background-size: 100% 3px;
  background-repeat: repeat-x;
}

main > aside:first-child {
  width: 300px;
  height: calc(100vh - 70px);
  position: relative;
  background: rgba(31, 37, 46, 0.61);
  clip-path: polygon(
    0% 0%,
    calc(100% - 20px) 0%,
    100% 20px,
    100% 100%,
    20px 100%,
    0% calc(100% - 20px),
    0 70%,
    10px calc(70% - 10px),
    10px calc(100px + 10px),
    0 100px
  );
  filter: drop-shadow(2px 4px 4px rgba(8, 13, 17, 0.64));
  color: white;
}

header svg,
main svg {
  position: absolute;
  left: 0;
  top: 0;
}

aside ul {
  background: rgba(73, 68, 65, 0.31);
  margin-left: 15px;
  margin-right: 5px;
  height: 30px;
  line-height: 30px;
  clip-path: polygon(
    0% 0%,
    calc(100% - 10px) 0%,
    100% 10px,
    100% 100%,
    10px 100%,
    0% calc(100% - 10px)
  );
  position: relative;
  display: flex;
  justify-content: space-evenly;
}

aside ul > li:first-child {
  color: rgba(97, 114, 127, 0.98);
  width: 70px;
  text-align: right;
}

aside ul > li:nth-child(2) {
  width: calc(100% - 120px);
}

.networkUl::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /*border-bottom: 2px solid;*/
  /* border-image: linear-gradient(rgba(245, 120, 120, 0.4), rgba(245, 120, 120, 1), rgba(245, 120, 120, 0.4)) 1 10 1;*/
  box-shadow: 0 0 10px rgba(45, 58, 94, 0.85) inset;
}

.hostUl::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0 0 10px rgba(248, 178, 16, 0.85) inset;
}

.unknownUl::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0 0 10px rgba(245, 120, 120, 0.85) inset;
}

.middlewareUl::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0 0 10px rgba(76, 205, 252, 0.85) inset;
}

.databaseUl::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0 0 10px rgba(121, 136, 144, 0.85) inset;
}

.showADResult::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 2px;
  left: 0;
  top: 0;
  background-image: linear-gradient(
    to right,
    #70a1b6 0%,
    rgba(112, 161, 182, 0.15) 50%,
    transparent 50%
  );
  background-size: 45px 2px;
  background-repeat: repeat-x;
}

.showADResult {
  /*border-top: 2px dashed #7FB7CB;
    border-bottom: 2px dashed #7FB7CB;*/
  position: relative;
  height: 40px;
  line-height: 40px;
  margin: 15px 20px 50px 20px;
  text-shadow: 0 1px rgba(122, 174, 195, 0.15), 0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45), 0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75), 2px 4px 5px rgba(122, 174, 195, 1);
}

.showADResult::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 2px;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    #70a1b6 0%,
    rgba(112, 161, 182, 0.15) 50%,
    transparent 50%
  );
  background-size: 45px 12px;
  background-repeat: repeat-x;
}

#echartsResultShow {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 0;
  bottom: 270px;
}
</style>
