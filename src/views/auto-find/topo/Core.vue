<template>
  <div>
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
/* author : admin */
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";

require("vis-network/dist/vis-network.min.css");
var vis = require("vis-network/dist/vis-network.min.js");
const eCharts = require("echarts");
export default {
  name: "TopoCore",
  components: { Header, Main, Footer },
  data() {
    return {
      nodes: [],
      edges: []
    };
  },
  mounted() {
    this.createVisNetwork();
    this.createEcharts();
  },
  methods: {
    createVisNetwork() {
      // var that = this;
      // create a network
      this.nodes = [];
      for (var i = 0; i < 50; i++) {
        this.nodes.push({
          id: i,
          title: "nodeId:" + i,
          label: i < 10 ? "192.168."+i+".1" : "192.168.1."+i,
          group: parseInt(i / 10)
        });
      }

      // create an array with edges
      this.edges = [];
      for (var j = 0; j < 50; j++) {
        if (parseInt(j / 10) == j) {
          continue;
        }
        this.edges.push({ from: parseInt(j / 10), to: j });
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
            color: "#fffbff",
            face: "arial"
          }
        },
        edges: {
          /*全局设置箭头风格*/
          arrows: {
            to: { enabled: true, scaleFactor: 1, type: "arrow" }
          },
          shadow: true,
          /*全局设置线条虚线风格*/
          dashes: false
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
        }
      };
      new vis.Network(container, data, options);
    },
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
                color: function(params) {
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
      const myChart2 = eCharts.init(document.getElementById("echartsResultShow"));
      myChart2.setOption(option);
    }
  }
};
</script>
