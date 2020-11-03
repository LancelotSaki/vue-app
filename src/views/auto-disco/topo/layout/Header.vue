<template>
  <header>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
         xmlns:svg="http://www.w3.org/2000/svg">
      <!-- 制作折线stroke:线条颜色;opacity:透明度-->
      <defs>
        <linearGradient id="blue_line" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style="stop-color: rgba(36,99,136, 0.2);"/>
          <stop offset="50%" style="stop-color: rgba(36,99,136, 0.4);"/>
          <stop offset="100%" style="stop-color: rgba(36,99,136, 0.65);"/>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="deep_blue_line" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style="stop-color: rgba(36,99,136, 0.65);"/>
          <stop offset="50%" style="stop-color: rgba(36,99,136, 1);"/>
          <stop offset="100%" style="stop-color: rgba(36,99,136, 0.65);"/>
        </linearGradient>
      </defs>
      <g stroke="url(#blue_line)" stroke-width="2">
        <title>broken line1</title>
        <!-- 线条颜色的渐变 -->
        <line x1="0%" y1="30%" x2="28%" y2="30%"/>
        <line x1="28%" y1="30%" x2="30%" y2="80%"/>
        <line x1="30%" y1="80%" x2="70%" y2="80%"/>
        <line x1="70%" y1="80%" x2="72%" y2="30%"/>
        <line x1="72%" y1="30%" x2="100%" y2="30%"/>
      </g>
      <g stroke="url(#deep_blue_line)" stroke-width="2">
        <title>broken line2</title>
        <line x1="2%" y1="40%" x2="28%" y2="40%"/>
        <line x1="28%" y1="40%" x2="30%" y2="90%"/>
        <line x1="30%" y1="90%" x2="70%" y2="90%"/>
        <line x1="70%" y1="90%" x2="72%" y2="40%"/>
        <line x1="72%" y1="40%" x2="98%" y2="40%"/>
      </g>
      <g stroke="url(#blue_line)" stroke-width="2">
        <title>broken line3</title>
        <line x1="4%" y1="50%" x2="28%" y2="50%" stroke-linecap="round"/>
        <line x1="28%" y1="50%" x2="30%" y2="100%" stroke-linecap="round"/>
        <line x1="30%" y1="100%" x2="70%" y2="100%" stroke-linecap="round"/>
        <line x1="70%" y1="100%" x2="72%" y2="50%" stroke-linecap="round"/>
        <line x1="72%" y1="50%" x2="96%" y2="50%" stroke-linecap="round"/>
      </g>
    </svg>
    <p>{{title}}</p>
    <aside class="searchKey">
      <input placeholder="输入IP或设备名称搜索" type="search" list="esDataList" autocomplete="off" v-model="keyword"/>
      <datalist id="esDataList">
        <option v-for="item in allContext" :id="item.id">{{item.sysName}}-{{item.ip}}</option>
      </datalist>
    </aside>
  </header>
</template>

<script>
  import networkData from "../../../../../public/json/network.json";

  export default {
    name: "TopoHeader",
    data() {
      return {
        keyword: "",
        title: "自动发现网络拓扑图",
        allContext: [],
      };
    },
    methods: {

    },
    mounted() {
      this.allContext = networkData;
    }
  };
</script>
<style scoped>
  header svg {
    position: absolute;
    left: 0;
    top: 0;
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

  .searchKey {
    position: absolute;
    right: 5px;
    top: 40px;
    width: 280px;
    height: 25px;
  }

  .searchKey input {
    width: 100%;
    height: 100%;
    border: 0;
    box-shadow: 0 0 10px 1px #3b8cf8, 0 0 1px #3b8cf8, 0 0 1px #3b8cf8,
    0 0 1px #3b8cf8, 0 0 1px #3b8cf8, 0 0 1px #3b8cf8, 0 0 1px #3b8cf8;
    border-radius: 5px;
    padding-left: 25px;
    color: white;
    background: rgba(0, 0, 0, 0);
  }

  .searchKey::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 12px;
    height: 12px;
    left: 5px;
    top: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 99, 255, 0.78);
    border-image: initial;
    border-radius: 50%;
  }

  .searchKey::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    left: 15px;
    top: 18px;
    background-image: linear-gradient(
            to right,
            rgba(24, 88, 130, 1) 0%,
            rgba(24, 88, 130, 0.1) 100%,
            transparent 50%
    );
    background-size: 100% 2px;
    background-repeat: repeat-x;
    -webkit-transform: skewX(-35deg);
    transform: skewY(38deg);
  }

  .searchKey input:focus {
    box-shadow: 0px 0px 10px 1px #3F51B5,
    0 0 1px #3F51B5, 0 0 1px #3F51B5,
    0 0 1px #3F51B5, 0 0 1px #3F51B5,
    0 0 1px #3F51B5, 0 0 1px #3F51B5;
  }

</style>
