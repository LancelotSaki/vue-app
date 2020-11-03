<template>
  <header>
    <svg width="600px" height="100%" xmlns="http://www.w3.org/2000/svg" stroke="null"
         style="vector-effect: non-scaling-stroke;">
      <defs>
        <linearGradient id="blue_line" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style="stop-color: rgba(36,99,136, 0.65);"/>
          <stop offset="50%" style="stop-color: rgba(36,99,136, 0.4);"/>
          <stop offset="100%" style="stop-color: rgba(36,99,136, 0.65);"/>
        </linearGradient>
      </defs>
      <g stroke="url(#blue_line)" stroke-width="2">
        <line id="svg_9" y2="85%" x2="84.5%" y1="75%" x1="83%"/>
        <line id="svg_11" y2="20%" x2="2%" y1="0" x1="0"/>
        <line id="svg_12" y2="100%" x2="16%" y1="100%" x1="12%"/>
        <line id="svg_13" y2="90%" x2="17%" y1="100%" x1="16%"/>
        <line id="svg_14" y2="90%" x2="83%" y1="90%" x1="17%"/>
        <line id="svg_15" y2="100%" x2="84%" y1="90%" x1="83%"/>
        <line id="svg_16" y2="100%" x2="88%" y1="100%" x1="84%"/>
        <line id="svg_17" y2="20%" x2="92.5%" y1="85%" x1="87.5%"/>
        <line id="svg_18" y2="20%" x2="98%" y1="20%" x1="94%"/>
        <line id="svg_19" y2="0%" x2="100%" y1="20%" x1="98%"/>
        <line id="svg_20" y2="100%" x2="12%" y1="20%" x1="6%"/>
        <line id="svg_21" y2="85%" x2="82.5%" y1="85%" x1="17.5%"/>
        <line id="svg_23" y2="20%" x2="92.5%" y1="20%" x1="7.5%"/>
        <line id="svg_24" y2="85%" x2="12.5%" y1="20%" x1="7.5%"/>
        <line id="svg_25" y2="85%" x2="87.5%" y1="85%" x1="84.5%"/>
        <line id="svg_26" y2="20%" x2="94%" y1="100%" x1="88%"/>
        <line id="svg_27" y2="80%" x2="18%" y1="85%" x1="17.5%"/>
        <line id="svg_28" y2="75%" x2="83%" y1="75%" x1="16.5%"/>
        <line id="svg_29" y2="85%" x2="82.5%" y1="80%" x1="82%"/>
        <line id="svg_30" y2="80%" x2="18%" y1="80%" x1="82%"/>
        <line x1="2%" y1="20%" x2="6%" y2="20%" id="svg_1"/>
        <line x1="12.5%" y1="85%" x2="15.5%" y2="85%" id="svg_2"/>
        <line x1="16.5%" y1="75%" x2="15.5%" y2="85%" id="svg_3"/>
      </g>
    </svg>
    <p>江西移动IT资源管理平台部署架构图</p>
  </header>
</template>

<script>
export default {
  name: "TopoHeader",
  data() {
    return {
      title: "设备拓扑图"
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
