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
        <title>broken lineec1</title>
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
    <p>IT资源管理平台智能化场景模型</p>
  </header>
</template>

<script>
export default {
  name: "TopoHeader",
  data() {
    return {
      title: "流程图"
    };
  }
};
</script>
<style scoped>

  header svg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto 5px auto;
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
    text-shadow: 0 1px rgba(122, 174, 195, 0.15), 0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45), 0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75), 2px 4px 5px rgba(122, 174, 195, 1);
    /* border: 1px solid #21A5CA;*/
    /*  clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);*/
  }
</style>
