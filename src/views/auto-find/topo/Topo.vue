<template>
  <div name="Topo">
    <header>
      <svg width="100%" height="100%" style="position: absolute; left: 0; top: 0;" xmlns="http://www.w3.org/2000/svg"
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
      <p>自动发现拓扑图</p>
    </header>
    <main style="min-width: 650px;">
      <aside>
        <svg width="100%" height="100%" style="position: absolute; left: 0; top: 0;" xmlns="http://www.w3.org/2000/svg"
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
      </aside>
      <section id="mynetwork"></section>
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
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
  /* author : admin */
  require("vis-network/dist/vis-network.min.css");
  var vis = require("vis-network/dist/vis-network.min.js");
  const eCharts = require("echarts");
  export default {
    name: "Topo",
    data() {
      return {
        nodes: [],
        edges: [],
      }
    },
    mounted() {
      this.createVisNetwork();
      this.createEcharts();
    },
    methods: {
      createVisNetwork() {
        var that = this;
        // create a network
        this.nodes = [];
        for (var i = 0; i < 10; i++) {
          this.nodes.push({id: i, title: "nodeId:" + i, label: "Node " + i, group: parseInt(i / 10)});
        }

        // create an array with edges
        this.edges = [];
        for (var j = 0; j < 10; j++) {
          if (parseInt(j / 10) == j) {
            continue;
          }
          this.edges.push({from: parseInt(j / 10), to: j});
        }
        var container = document.getElementById("mynetwork");
        var data = {
          nodes: this.nodes,
          edges: this.edges
        };

        var options = {
          locale: "cn",
          nodes: {
            /*节点字体位置*/
            shape: "dot",
            /*缩小到一定程度才能查看字体*/
            /*节点(图标)大小*/
            size: 10,
            font: {
              /*全局设置拓扑图字体*/
              color: '#fffbff',
              face: 'arial',
            }
          },
          edges: {
            /*全局设置箭头风格*/
            arrows: {
              to: {enabled: true, scaleFactor: 1, type: 'arrow'},
            },
            shadow: true,
            /*全局设置线条虚线风格*/
            dashes: false,
          },
          interaction: {
            // 启用操作按钮
            navigationButtons: true,
            keyboard: true,
            /*启用鼠标聚焦事件*/
            hover: true
          },
          physics: {
            stabilization: false,
            barnesHut: {
              springLength: 200
            }
          },
        };
        new vis.Network(container, data, options);
      },
      // echarts
      createEcharts() {
        var category = [{
          name: "数据库",
          value: 2500
        },
          {
            name: "进程数",
            value: 8000
          },
          {
            name: "主机",
            value: 3000
          },
          {
            name: "网络设备",
            value: 3000
          },
          {
            name: "未知设备",
            value: 3000
          }
        ]; // 类别
        var total = 10000; // 数据总数
        var datas = [];
        category.forEach(value => {
          datas.push(value.value);
        });
        var option = {
          xAxis: {
            max: total,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 80,
            top: 20, // 设置条形图的边距
            right: 80,
            bottom: 20
          },
          yAxis: [{
            type: "category",
            inverse: false,
            data: category,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }],
          series: [{
            // 内
            type: "bar",
            barWidth: 18,

            legendHoverLink: false,
            silent: true,
            itemStyle: {
              normal: {
                color: function (params) {
                  var color;
                  if (params.dataIndex == 19) {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#EB5118" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#F21F02" // 100% 处的颜色
                        }
                      ]
                    }
                  } else if (params.dataIndex == 18) {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#FFA048" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#B25E14" // 100% 处的颜色
                        }
                      ]
                    }
                  } else if (params.dataIndex == 17) {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#F8E972" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#E5C206" // 100% 处的颜色
                        }
                      ]
                    }
                  } else {
                    color = {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: "#1588D1" // 0% 处的颜色
                      },
                        {
                          offset: 1,
                          color: "#0F4071" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                  return color;
                },
              }
            },
            label: {
              normal: {
                show: true,
                position: "left",
                formatter: "{b}",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            data: category,
            z: 1,
            animationEasing: "elasticOut"
          },
            {
              // 分隔
              type: "pictorialBar",
              itemStyle: {
                normal: {
                  color: "#061348"
                }
              },
              symbolRepeat: "fixed",
              symbolMargin: 6,
              symbol: "rect",
              symbolClip: true,
              symbolSize: [1, 21],
              symbolPosition: "start",
              symbolOffset: [1, -1],
              symbolBoundingData: this.total,
              data: category,
              z: 2,
              animationEasing: "elasticOut"
            },
            {
              // 外边框
              type: "pictorialBar",
              symbol: "rect",
              symbolBoundingData: total,
              itemStyle: {
                normal: {
                  color: "none"
                }
              },
              label: {
                normal: {
                  formatter: (params) => {
                    var text;
                    if (params.dataIndex == 1) {
                      text = '{a|  100%}{f|  ' + params.data + '}';
                    } else if (params.dataIndex == 2) {
                      text = '{b|  100%}{f|  ' + params.data + '}';
                    } else if (params.dataIndex == 3) {
                      text = '{c|  100%}{f|  ' + params.data + '}';
                    } else {
                      text = '{d|  100%}{f|  ' + params.data + '}';
                    }
                    return text;
                  },
                  rich: {
                    a: {
                      color: 'red'
                    },
                    b: {
                      color: 'blue'
                    },
                    c: {
                      color: 'yellow'
                    },
                    d: {
                      color: "green"
                    },
                    f: {
                      color: "#ffffff"
                    }
                  },
                  position: 'right',
                  distance: 0, // 向右偏移位置
                  show: true
                }
              },
              data: datas,
              z: 0,
              animationEasing: "elasticOut"
            },
            {
              name: "外框",
              type: "bar",
              barGap: "-120%", // 设置外框粗细
              data: [total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total, total],
              barWidth: 25,
              itemStyle: {
                normal: {
                  color: "transparent", // 填充色
                  barBorderColor: "#1C4B8E", // 边框色
                  barBorderWidth: 1, // 边框宽度
                  // barBorderRadius: 0, //圆角半径
                  label: {
                    // 标签显示位置
                    show: false,
                    position: "top" // insideTop 或者横向的 insideLeft
                  }
                }
              },
              z: 0
            }
          ]
        };
       // const myChart2 = eCharts.init(document.getElementById("echartsResultShow"));
       // myChart2.setOption(this.option);
      }
    }
  };
</script>

<style>


  body {
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
    text-shadow: 0 1px rgba(122, 174, 195, 0.15),
    0 1px rgba(122, 174, 195, 0.30),
    0 1px rgba(122, 174, 195, 0.45),
    0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75),
    2px 4px 5px rgba(122, 174, 195, 1);
    /* border: 1px solid #21A5CA;*/
    /*  clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);*/
  }

  main {
    display: flex;
    justify-content: space-evenly;
  }

  main > aside:first-child::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: calc(100% - 20px);
    height: 3px;
    left: 20px;
    bottom: 0;
    background-image: linear-gradient(to right, rgba(24, 88, 130, 1) 0%, rgba(24, 88, 130, 0.1) 100%, transparent 50%);
    background-size: 100% 3px;
    background-repeat: repeat-x;
  }

  main > aside:first-child {
    width: 300px;
    height: calc(100vh - 70px);
    position: relative;
    background: rgba(31, 37, 46, 0.61);
    clip-path: polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 20px 100%, 0% calc(100% - 20px),
    0 70%, 10px calc(70% - 10px), 10px calc(100px + 10px), 0 100px);
    filter: drop-shadow(2px 4px 4px rgba(8, 13, 17, 0.64));
    color: white;
  }

  aside ul {
    background: rgba(73, 68, 65, 0.31);
    margin-left: 15px;
    margin-right: 5px;
    padding-left: 20px;
    clip-path: polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 10px 100%, 0% calc(100% - 10px));
    position: relative;
  }

  /* aside ul:first-child::after {
     content: "";
     position: absolute;
     display: inline-block;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     border-bottom: 2px solid;
     border-image: linear-gradient(rgba(94, 110, 127, 0.4), rgba(94, 110, 127, 1), rgba(94, 110, 127, 0.4)) 1 10 1;
   }*/

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

  aside ul > li:first-child {
    color: rgba(97, 114, 127, 0.98);
  }

  .showADResult::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 2px;
    left: 0;
    top: 0;
    background-image: linear-gradient(to right, #70A1B6 0%, rgba(112, 161, 182, 0.15) 50%, transparent 50%);
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
    text-shadow: 0 1px rgba(122, 174, 195, 0.15),
    0 1px rgba(122, 174, 195, 0.30),
    0 1px rgba(122, 174, 195, 0.45),
    0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75),
    2px 4px 5px rgba(122, 174, 195, 1);
  }

  .showADResult::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: 0;
    background-image: linear-gradient(to right, #70A1B6 0%, rgba(112, 161, 182, 0.15) 50%, transparent 50%);
    background-size: 45px 12px;
    background-repeat: repeat-x;
  }

  #echartsResultShow {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 0;
    bottom: 0;
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
    clip-path: polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 20px 100%, 0% calc(100% - 20px));
    filter: drop-shadow(3px 4px 4px #3B8CF8);
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
    background: linear-gradient(to right, rgba(72, 123, 213, 1) 0%, rgba(72, 123, 213, 0.2) 100%);
    clip-path: polygon(0% 0%, 100% 0, 100% 2px, 60% 2px, calc(60% - 10px) 100%, 0 100%);
  }

  .myDefined {
    position: fixed;
    right: 0;
    top: 95px;
    height: 300px;
    width: 300px;
    border-left: 1px solid;
    border-radius: 5px;
    border-bottom: 1px solid;
    color: white;
    border-image: linear-gradient(rgba(72, 123, 213, 0.3), rgba(72, 123, 213, 1), rgba(72, 123, 213, 0.3)) 1 10 1;
  }

  .myDefined::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 38%;
    height: 15px;
    left: 60%;
    top: -11px;
    background-image: linear-gradient(to right, rgba(72, 123, 213, 0.5) 0%, rgba(72, 123, 213, 0) 50%, transparent 50%);
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

  footer::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    left: 0;
    top: 0;
    height: 3px;
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(65, 117, 214, 1) 50%, rgba(0, 0, 0, 0) 100%);
  }

  footer {
    position: fixed;
    width: calc(100% - 550px);
    height: 100px;
    left: 450px;
    bottom: 0;
  }

  /*重写vis整体风格*/
  div.vis-tooltip {
    font-size: small;
    border: 0 !important;
    border-radius: 5px;
    width: 300px;
    padding: 10px;
    box-shadow: 0 1px 4px #ddd;
    background-color: rgba(112, 142, 245, 0.55) !important;
    color: white;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-up {
    background-image: url(/images/vis/upArrow.png);
    bottom: 50px;
    left: 55px
  }

  div.vis-network div.vis-navigation div.vis-button.vis-down {
    background-image: url(/images/vis/downArrow.png);
    bottom: 10px;
    left: 55px
  }

  div.vis-network div.vis-navigation div.vis-button.vis-left {
    background-image: url(/images/vis/leftArrow.png);
    bottom: 10px;
    left: 15px
  }

  div.vis-network div.vis-navigation div.vis-button.vis-right {
    background-image: url(/images/vis/rightArrow.png);
    bottom: 10px;
    left: 95px
  }

  div.vis-network div.vis-navigation div.vis-button.vis-zoomIn {
    background-image: url(/images/vis/plus.png);
    bottom: 10px;
    right: 15px
  }

  div.vis-network div.vis-navigation div.vis-button.vis-zoomOut {
    background-image: url(/images/vis/minus.png);
    bottom: 10px;
    right: 55px
  }

  div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
    background-image: url(/images/vis/zoomExtends.png);
  }
  div.vis-network div.vis-navigation div.vis-button:hover {
    box-shadow: 0px 0px 10px 1px #AC85B4,
    0 0 1px #AC85B4,
    0 0 1px #AC85B4,
    0 0 1px #AC85B4,
    0 0 1px #AC85B4,
    0 0 1px #AC85B4,
    0 0 1px #AC85B4;
  }

  div.vis-network div.vis-navigation div.vis-button:active {
    box-shadow: 0px 0px 10px 1px #3B8CF8,
    0 0 1px #3B8CF8,
    0 0 1px #3B8CF8,
    0 0 1px #3B8CF8,
    0 0 1px #3B8CF8,
    0 0 1px #3B8CF8,
    0 0 1px #3B8CF8;
  }
</style>
