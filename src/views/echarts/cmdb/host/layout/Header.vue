<template>
  <header>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
         xmlns:svg="http://www.w3.org/2000/svg">
      <!-- 制作折线stroke:线条颜色;opacity:透明度-->
      <defs>
        <linearGradient id="blue_line" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style="stop-color: rgba(100,100,100, 0.2);"/>
          <stop offset="50%" style="stop-color: rgba(100,100,100, 0.4);"/>
          <stop offset="100%" style="stop-color: rgba(100,100,100, 0.65);"/>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="deep_blue_line" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style="stop-color: rgba(100,100,100,1);"/>
          <stop offset="50%" style="stop-color: rgba(100,100,100,1);"/>
          <stop offset="100%" style="stop-color: rgba(100,100,100,1);"/>
        </linearGradient>
      </defs>
     <!-- g标签属于非形状元素-->
      <g stroke="url(#blue_line)" stroke-width="2">
        <title>broken line1</title>
        <!-- 线条颜色的渐变 -->
        <line x1="5%" y1="45%" x2="28%" y2="45%"/>
        <line x1="28%" y1="45%" x2="30%" y2="80%"/>
        <line x1="30%" y1="80%" x2="calc(45% - 5px)" y2="80%"/>
        <line x1="calc(45% - 5px)" y1="80%" x2="45%" y2="90%"/>
      </g>
      <!--stroke-dasharray 是用于设置虚线的属性-->
      <g stroke="url(#deep_blue_line)" stroke-width="2" stroke-dasharray="10 2">
        <title>broken line2</title>
        <line x1="45%" y1="80%" x2="55%" y2="80%"/>
        <line x1="55%" y1="80%" x2="calc(55% - 5px)" y2="90%"/>
        <line x1="calc(55% - 5px)" y1="90%" x2="calc(45% + 5px)" y2="90%"/>
        <line x1="calc(45% + 5px)" y1="90%" x2="45%" y2="80%"/>
      </g>
      <g stroke="url(#blue_line)" stroke-width="2">
        <title>broken line3</title>
        <line x1="55%" y1="90%" x2="calc(55% + 5px)" y2="80%" stroke-linecap="round"/>
        <line x1="calc(55% + 5px)" y1="80%" x2="70%" y2="80%" stroke-linecap="round"/>
        <line x1="70%" y1="80%" x2="72%" y2="45%" stroke-linecap="round"/>
        <line x1="72%" y1="45%" x2="95%" y2="45%" stroke-linecap="round"/>
      </g>
    </svg>
    <p>{{title}}</p>
  </header>
</template>

<script>
  export default {
    name: "HostHeader",
    data() {
      return {
        title: "资源服务管理"
      };
    }
  };
</script>
<style scoped>
  header svg{
    position: absolute;
    left: 0;
    top: 0;
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
</style>
