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
      <p class="showADResult">自动发现网络设备采集结果</p>
      <p class="batchResult">
        <el-select style="width: 100%;" v-model="currentSelect" filterable placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </p>
      <aside class="myDefined">
        <ol>
          <li>网络设备总数</li>
          <li>107台</li>
        </ol>
        <ol>
          <li>端口总数</li>
          <li>12143个</li>
        </ol>
        <ol>
          <li>活动端口总数</li>
          <li>6254个</li>
        </ol>
        <ol>
          <li>CMDB已入库</li>
          <li>107台</li>
        </ol>
        <ol>
          <li>使用中</li>
          <li>107台</li>
        </ol>
        <ol>
          <li>与上次相比</li>
          <li>2台<span style="margin-left: 5px; color: rgba(232,79,138,0.85)">↓</span></li>
        </ol>
        <ol>
          <li>采集时间</li>
          <li>2020-07-27 19:50:01</li>
        </ol>
      </aside>
      <aside class="collectDataCount">
        <ul>
          <li>交换机</li>
          <li>45台<span style="margin-left: 40px; color: rgba(232,79,138,0.85)">↓</span></li>
        </ul>
        <ul>
          <li>路由器</li>
          <li>18台<span style="margin-left: 40px; color: rgba(232,79,138,0.85)">↓</span></li>
        </ul>
        <ul>
          <li>防火墙</li>
          <li>20台</li>
        </ul>
        <ul>
          <li>负载均衡</li>
          <li>16台</li>
        </ul>
        <ul>
          <li>VPN接入</li>
          <li>2台</li>
        </ul>
        <ul>
          <li>入侵防御系统</li>
          <li>2台</li>
        </ul>
        <ul>
          <li>ARRAY</li>
          <li>2台</li>
        </ul>
        <ul>
          <li>清洗设备</li>
          <li>2台</li>
        </ul>
      </aside>
      <aside class="topoImageShow">
          <ul v-for="item in showImage">
            <li><img :src="item.img" width="25" height="25"><p>
              {{item.name}}
            </p></li>
          </ul>
      </aside>
      <div id="echartsResultShow" style="display: none;"></div>
    </aside>
    <section id="mynetwork"></section>
  </main>
</template>
<script>
  const eCharts = require("echarts");
  export default {
    name: "TopoMain",
    data() {
      return {
        showImage: [
          {
            name: "交换机",
            img: "/images/network/switch.svg"
          },
          {
            name: "路由器",
            img: "/images/network/router.svg"
          },
          {
            name: "防火墙",
            img: "/images/network/fireware.svg"
          },
          {
            name: "VPN",
            img: "/images/network/vpn.svg"
          },
          {
            name: "负载均衡",
            img: "/images/network/nlb.svg"
          },
          {
            name: "清洗设备",
            img: "/images/network/default.svg"
          },
          {
            name: "入侵防御系统",
            img: "/images/network/ips.svg"
          },
          {
            name: "其他",
            img: "/images/network/default.svg"
          }
        ],
        options: [{
          value: 'auto_20200727000000',
          label: 'auto_20200727000000'
        }, {
          value: 'auto_20200726000000',
          label: 'auto_20200726000000'
        }, {
          value: 'auto_20200725000000',
          label: 'auto_20200725000000'
        }, {
          value: 'auto_20200724000000',
          label: 'auto_20200724000000'
        }, {
          value: 'auto_20200723000000',
          label: 'auto_20200723000000'
        }, {
          value: 'auto_20200722000000',
          label: 'auto_20200722000000'
        }, {
          value: 'auto_20200721000000',
          label: 'auto_20200721000000'
        }, {
          value: 'auto_20200720000000',
          label: 'auto_20200720000000'
        }],
        currentSelect: 'auto_20200727000000'
      }
    },
    mounted() {
      this.createEcharts();
    },
    methods: {
      // echarts
      createEcharts() {
        var category = [
          {
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
          yAxis: [
            {
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
            }
          ],
          series: [
            {
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
                        colorStops: [
                          {
                            offset: 0,
                            color: "#EB5118" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#F21F02" // 100% 处的颜色
                          }
                        ]
                      };
                    } else if (params.dataIndex == 18) {
                      color = {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#FFA048" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#B25E14" // 100% 处的颜色
                          }
                        ]
                      };
                    } else if (params.dataIndex == 17) {
                      color = {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#F8E972" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#E5C206" // 100% 处的颜色
                          }
                        ]
                      };
                    } else {
                      color = {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#1588D1" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#0F4071" // 100% 处的颜色
                          }
                        ]
                      };
                    }
                    return color;
                  }
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
                  formatter: params => {
                    var text;
                    if (params.dataIndex == 1) {
                      text = "{a|  100%}{f|  " + params.data + "}";
                    } else if (params.dataIndex == 2) {
                      text = "{b|  100%}{f|  " + params.data + "}";
                    } else if (params.dataIndex == 3) {
                      text = "{c|  100%}{f|  " + params.data + "}";
                    } else {
                      text = "{d|  100%}{f|  " + params.data + "}";
                    }
                    return text;
                  },
                  rich: {
                    a: {
                      color: "red"
                    },
                    b: {
                      color: "blue"
                    },
                    c: {
                      color: "yellow"
                    },
                    d: {
                      color: "green"
                    },
                    f: {
                      color: "#ffffff"
                    }
                  },
                  position: "right",
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
              data: [
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total,
                total
              ],
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
        const myChart2 = eCharts.init(
            document.getElementById("echartsResultShow")
        );
        myChart2.setOption(option);
      }
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

  .collectDataCount ul {
    padding-left: 5px;
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

  .collectDataCount ul > li:first-child {
    color: rgba(97, 114, 127, 0.98);
    width: 100px;
    text-align: right;
  }

  .collectDataCount ul > li:nth-child(2) {
    width: calc(100% - 100px);
    margin-left: 5px;
  }

  .collectDataCount {
    position: relative;
    height: 355px;
    width: 100%;
    padding-top: 5px;
    margin-top: 25px;
  }

  .collectDataCount::before {
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
            0 95%,
            45% 95%,
            calc(45% + 10px) 0%,
            100% 0,
            100% 2px,
            60% 2px,
            calc(60% - 10px) 100%,
            0 100%
    );
  }

  .collectDataCount::after {
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

  .collectDataCount > ul::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .collectDataCount > ul:first-child::after {
    box-shadow: 0 0 10px rgba(245, 120, 120, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(2)::after {
    box-shadow: 0 0 10px rgba(248, 178, 16, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(3)::after {
    box-shadow: 0 0 10px rgba(9, 94, 6, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(4)::after {
    box-shadow: 0 0 10px rgba(32, 94, 75, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(5)::after {
    box-shadow: 0 0 10px rgba(45, 58, 94, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(6)::after {
    box-shadow: 0 0 10px rgba(76, 205, 252, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(7)::after {
    box-shadow: 0 0 10px rgba(84, 14, 94, 0.85) inset;
  }

  .collectDataCount > ul:nth-child(8)::after {
    box-shadow: 0 0 10px rgba(94, 30, 7, 0.85) inset;
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
    margin: 15px 20px 0 20px;
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

  .batchResult {
    position: relative;
    height: 25px;
    line-height: 25px;
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
            0 95%,
            45% 95%,
            calc(45% + 10px) 0%,
            100% 0,
            100% 2px,
            60% 2px,
            calc(60% - 10px) 100%,
            0 100%
    );
  }

  .myDefined {
    position: relative;
    margin-top: 45px;
    height: 250px;
    width: 100%;
    border-radius: 5px;
    padding-top: 5px;
    color: white;
    border-image: linear-gradient(
            rgba(72, 123, 213, 0.3),
            rgba(72, 123, 213, 1),
            rgba(72, 123, 213, 0.3)
    ) 1 10 1;
    border: 0;
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
    padding-left: 10px;
  }

  .myDefined > ol > li:first-child {
    color: hsl(210, 13%, 30%);
    width: 100px;
    text-align: right;
  }

  .myDefined > ol > li:nth-child(2) {
    margin-left: 5px;
    width: calc(100% - 120px);
  }

  .topoImageShow {
    position: relative;
    margin-top: 12px;
    height: 80px;
    width: 100%;
    color: white;
    border: 0;
    overflow:hidden;
    display: flex;
    justify-content : center;
  }


  .topoImageShow ul> {

  }

  .topoImageShow ul>li {
    width: 80px;
    display: flex;
    flex-wrap: wrap;
    animation: 15s startToEndLine linear infinite normal;
    animation-play-state: running;
  }

  .topoImageShow img {
    margin: 0 auto;
    width: 100%;
  }

  .topoImageShow p {
    margin-top: 5px;
    width: 100%;
    text-align: center;
  }


  .topoImageShow ul:hover {
    animation-play-state: paused;
  }

  @keyframes startToEndLine {
    0% {
      transform: translate3d(400%, 0, 0);
    }
    25% {
      transform: translate3d(100%, 0, 0);
    }
    50% {
      transform: translate3d(-200%, 0, 0);
    }
    75% {
      transform: translate3d(-500%, 0, 0);
    }
    100% {
      transform: translate3d(-800%, 0, 0);
    }
  }

  #echartsResultShow {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 0;
    bottom: 270px;
  }

</style>
