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
                  stroke-linecap="round"/>
            <line stroke-width="1px" opacity="0.65" fill="none" stroke="#2385BD" x1="0%" y1="100px" x2="10px"
                  stroke-linecap="round"
                  y2="calc(100px + 10px)"/>
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
