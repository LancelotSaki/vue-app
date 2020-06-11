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

        <aside class="myDefined">
          <div id="network-popUp">
            <span id="operation">节点</span><br/>
            <table style="margin:auto;">
              <tbody>
              <tr>
                <td>节点ID</td>
                <td><input id="node-id" value="new value" /></td>
              </tr>
              <tr>
                <td>节点名称</td>
                <td><input id="node-label" value="new value" /></td>
              </tr>
              </tbody>
            </table>
            <input type="button" value="save" id="saveButton" />
            <input type="button" value="cancel" id="cancelButton" />
          </div>
        </aside>
      </aside>
    <section id="mynetwork"></section>

  </main>
</template>
<script>
const eCharts = require("echarts");
export default {
  name: "TopoMain",
  mounted() {

  },
  methods: {

  }
};
</script>
<style scoped>
  main svg {
    position: absolute;
    left: 0;
    top: 0;
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

  aside ul {
    background: rgba(73, 68, 65, 0.31);
    margin-left: 15px;
    margin-right: 5px;
    margin-bottom: 10px;
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
  margin-bottom: 10px;
}

.myDefined > ol > li:first-child {
  width: 100px;
}

.myDefined > ol > li:nth-child(2) {
  width: calc(100% - 120px);
}



  #echartsResultShow {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 0;
    bottom: 270px;
  }
</style>
