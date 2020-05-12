<template>
  <main>
      <aside>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
             xmlns:svg="http://www.w3.org/2000/svg">
          <!-- 制作折线stroke:线条颜色;opacity:透明度-->
          <!-- 制作折线stroke:线条颜色;opacity:透明度-->
          <defs>
            <linearGradient id="blue_line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: rgba(36,99,136, 0.65);"/>
              <stop offset="100%" style="stop-color: rgba(36,99,136, 0);"/>
            </linearGradient>
          </defs>
          <g>
            <title>broken line1</title>
            <!--stroke-linecap="round"圆角-->
            <line stroke-width="1px" stroke="url(#blue_line)" x1="100%" y1="20px" x2="calc(100% - 20px)" y2="0%"
                  stroke-linecap="round"/>
            <line stroke-width="1px" opacity="0.65" fill="none" stroke="#2385BD" x1="calc(100% - 20px)" y1="0%"
                  x2="0%" y2="0%" stroke-linecap="round"/>
            <line stroke-width="1px" opacity="0.65" fill="none" stroke="#2385BD" x1="0%" y1="0%" x2="0%" y2="100px"
                  stroke-linecap="round"></line>
            <line stroke-width="1px" opacity="0.65" fill="none" stroke="#2385BD" x1="0%" y1="100px" x2="10px"
                  stroke-linecap="round"
                  y2="calc(100px + 10px)"></line>
          </g>
        </svg>
        <p class="showADResult">自动发现对比结果</p>
        <ul class="networkUl">
          <li>网络设备</li>
          <li>110台</li>
        </ul>
        <ul class="unknownUl">
          <li>未知设备</li>
          <li>170台</li>
        </ul>
        <ul class="hostUl">
          <li>主机</li>
          <li>100台</li>
        </ul>
        <ul class="middlewareUl">
          <li>中间件</li>
          <li>602个</li>
        </ul>
        <ul class="databaseUl">
          <li>数据库</li>
          <li>62个</li>
        </ul>
        <div id="echartsResultShow"></div>
        <aside class="myDefined">
          <ol>
            <li>设备名称</li>
            <li>网络设备</li>
          </ol>
          <ol>
            <li>IP地址</li>
            <li>127.0.0.1</li>
          </ol>
          <ol>
            <li>端口总数</li>
            <li>159</li>
          </ol>
          <ol>
            <li>是否已入库</li>
            <li>否</li>
          </ol>
        </aside>
      </aside>
    <section id="mynetwork"></section>
  </main>
</template>
<script>
export default {
  name: "TopoMain"
};
</script>
<style>
#mynetwork {
  width: calc(100% - 300px - 10px);
  height: calc(100vh - 80px);
  /*border: 1px solid lightgray;*/
}

table.legend_table {
  border-collapse: collapse;
}

table.legend_table td,
table.legend_table th {
  border: 1px solid #d3d3d3;
  padding: 10px;
}

table.legend_table td {
  text-align: center;
  width: 110px;
}

.limitDiv {
  display: none;
  width: 200px;
  height: 100px;
  background: rgba(17, 26, 56, 0.81);
  position: fixed;
  left: 50%;
  top: 50%;
  clip-path: polygon(
    0% 0%,
    calc(100% - 20px) 0%,
    100% 20px,
    100% 100%,
    20px 100%,
    0% calc(100% - 20px)
  );
  filter: drop-shadow(3px 4px 4px #3b8cf8);
}

.myDefined::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 15px;
  left: 0;
  top: -15px;
  background: rgba(72, 123, 213, 1);
  background: linear-gradient(
    to right,
    rgba(72, 123, 213, 1) 0%,
    rgba(72, 123, 213, 0.2) 100%
  );
  clip-path: polygon(
    0% 0%,
    100% 0,
    100% 2px,
    60% 2px,
    calc(60% - 10px) 100%,
    0 100%
  );
}

.myDefined {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 250px;
  width: 100%;
  border-left: 1px solid;
  border-radius: 5px;
  border-bottom: 1px solid;
  color: white;
  border-image: linear-gradient(
      rgba(72, 123, 213, 0.3),
      rgba(72, 123, 213, 1),
      rgba(72, 123, 213, 0.3)
    )
    1 10 1;
}

.myDefined::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 38%;
  height: 15px;
  left: 60%;
  top: -11px;
  background-image: linear-gradient(
    to right,
    rgba(72, 123, 213, 0.5) 0%,
    rgba(72, 123, 213, 0) 50%,
    transparent 50%
  );
  background-size: 11px 10px;
  background-repeat: repeat-x;
  transform: skewX(-35deg);
}

.myDefined > ol {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.myDefined > ol > li:first-child {
  width: 100px;
}

.myDefined > ol > li:nth-child(2) {
  width: calc(100% - 120px);
}

/*重写vis整体风格*/

/*tooltip*/

div.vis-tooltip::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  left: 0;
  top: 30px;
  height: 3px;
  background: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0) 0%,
    rgba(212, 71, 73, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
div.vis-tooltip {
  font-size: small;
  border: 0 !important;
  border-radius: 5px;
  width: 250px;
  height: 200px;
  padding: 10px;
  box-shadow: 0 1px 4px #ddd !important;
  background-color: rgba(46, 54, 56, 0.85) !important;
  color: white !important;
}
div.vis-tooltip p {
  font-size: 18px;
  padding: 0;
  margin: 0;
}
div.vis-tooltip ol {
  display: flex;
  color: rgba(241, 221, 56, 1);
  justify-content: space-evenly;
}

div.vis-tooltip ol > li:first-child {
  width: 80px;
  text-align: right;
}

div.vis-tooltip ol > li:nth-child(2) {
  width: calc(100% - 100px);
}
div.vis-network div.vis-navigation div.vis-button.vis-up {
  background-image: url(/images/vis/upArrow.png) !important;
}

div.vis-network div.vis-navigation div.vis-button.vis-down {
  background-image: url(/images/vis/downArrow.png) !important;
}

div.vis-network div.vis-navigation div.vis-button.vis-left {
  background-image: url(/images/vis/leftArrow.png) !important;
}

div.vis-network div.vis-navigation div.vis-button.vis-right {
  background-image: url(/images/vis/rightArrow.png) !important;
}

div.vis-network div.vis-navigation div.vis-button.vis-zoomIn {
  background-image: url(/images/vis/plus.png) !important;
}

div.vis-network div.vis-navigation div.vis-button.vis-zoomOut {
  background-image: url(/images/vis/minus.png) !important;
}

div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
  background-image: url(/images/vis/zoomExtends.png) !important;
}

div.vis-network div.vis-navigation div.vis-button:hover {
  box-shadow: 0px 0px 10px 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4,
    0 0 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4 !important;
}

div.vis-network div.vis-navigation div.vis-button:active {
  box-shadow: 0px 0px 10px 1px #3b8cf8, 0 0 1px #3b8cf8, 0 0 1px #3b8cf8,
    0 0 1px #3b8cf8, 0 0 1px #3b8cf8, 0 0 1px #3b8cf8, 0 0 1px #3b8cf8 !important;
}
</style>
