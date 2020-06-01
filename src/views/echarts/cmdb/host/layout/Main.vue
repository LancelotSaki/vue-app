<template>
  <main>
    <div id="allCountEcharts">资源</div>
    <div id="everyCountEcharts"></div>
    <div id="resourcePercentEcharts"></div>
  </main>
</template>
<script>
const eCharts = require("echarts");
export default {
  name: "TopoMain",
  mounted() {
    this.createEcharts1();
    this.createEcharts2();
    this.createEcharts3();
  },
  methods: {
    // echarts
    createEcharts1() {
      let color = [
        "#f69846",
        "#f6d54a",
        "#45dbf7",
        "#f69846",
        "#44aff0",
        "#4777f5",
        "#5045f6",
        "#ad46f3",
        "#f845f1"
      ];
      let names = ["物理机", "虚拟机", "网络设备", "存储", "其他"];
      let data = [444, 501, 468, 478, 431];
      let list = [];
      let total = 0;
      for (let i in data) {
        total += data[i];
      }

      let placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0
        }
      };

      let rich = {
        white: {
          align: "center",
          padding: [3, 0]
        }
      };

      for (let i in data) {
        list.push(
          {
            value: data[i],
            name: names[i],
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i],
                color: color[i]
              }
            }
          },
          {
            value: total / 30,
            name: "",
            itemStyle: placeHolderStyle
          }
        );
      }

      let func = params => {
        let percent = ((params.value / total) * 100).toFixed(1);
        let name = params.name.replace(/\n/g, "");
        if (params.name !== "") {
          return name + "\n{white|" + percent + "%}";
        } else {
          return "";
        }
      };

      var option = {
        title: {
          text: "资源分布情况",
          textStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: "#fff"
          },
          x: "center"
        },
        tooltip: {
          show: false
        },
        legend: {
          /*orient: 'vertical',*/
          data: names,
          icon: "circle",
          right: "0px",
          top: "20px",
          textStyle: {
            color: "#fff",
            fontSize: 8
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            startAngle: "90",
            center: ["49%", "60%"],
            radius: ["35%", "35%"],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  formatter: func,
                  rich: rich
                },
                labelLine: {
                  length: 15,
                  length2: 20,
                  show: true,
                  color: "#00ffff"
                }
              }
            },
            data: list,
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return idx * 50;
            }
          },
          {
            name: "",
            type: "pie",
            center: ["49%", "60%"],
            radius: ["35%", "35%"],
            itemStyle: {
              color: "transparant"
            },
            startAngle: "90",
            data: [
              {
                value: total,
                name: "",
                label: {
                  normal: {
                    show: true,
                    formatter: "{c|{c}} {b|条记录}",
                    rich: {
                      c: {
                        color: "rgb(98,137,169)",
                        fontSize: 12,
                        fontWeight: "bold",
                        lineHeight: 5
                      },
                      b: {
                        color: "rgb(98,137,169)",
                        fontSize: 14,
                        lineHeight: 5
                      }
                    },
                    textStyle: {
                      fontSize: 14,
                      fontWeight: "bold"
                    },
                    position: "center"
                  }
                }
              }
            ]
          }
        ]
      };
      const myChart = eCharts.init(document.getElementById("allCountEcharts"));
      myChart.setOption(option);
    },
    createEcharts2() {
      var option = {
        tooltip: {
          formatter: "{c}%的{b}"
        },
        series: [
          {
            name: "资源",
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 10,
            center: ["50%", "50%"], // 默认全局居中
            radius: "100px", //图表尺寸
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
                width: 3,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              // 坐标轴小标记
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 2,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              // 分隔线
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
              length: "70%",
              width: 5
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 8,
                fontStyle: "italic",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            detail: {
              /*这里就是详情配置*/
              backgroundColor: "rgba(30,144,255,0.3)",
              borderWidth: 1,
              borderColor: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
              offsetCenter: [0, "50%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 8,
                color: "#fff"
              }
            },
            data: [{ value: 40, name: "资源占用率" }]
          }
        ]
      };
      const myChart = eCharts.init(
        document.getElementById("everyCountEcharts")
      );
      myChart.setOption(option);
      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option);
      }, 5000);
    },
    createEcharts3() {
      var option = {
        color: ["#00c2ff", "#f9cf67", "#e92b77"],
        legend: {
          show: true,
          // icon: 'circle',//图例形状
          bottom: 45,
          center: 0,
          itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 14,
            color: "#ade3ff"
          },
          data: ["2016", "2017", "2018"]
        },
        radar: [
          {
            indicator: [
              {
                text: "科技创新联盟",
                max: 100
              },
              {
                text: "科技成果转化中心",
                max: 100
              },
              {
                text: "工程技术中心（工程实验室）",
                max: 100
              },
              {
                text: "新型研发机构",
                max: 100
              },
              {
                text: "科技创孵化器",
                max: 100
              }
            ],

            textStyle: {
              color: "red"
            },
            center: ["50%", "50%"],
            radius: 80,
            startAngle: 90,
            splitNumber: 3,
            orient: "horizontal", // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
            name: {
              formatter: "{value}",
              textStyle: {
                fontSize: 14, //外圈标签字体大小
                color: "#5b81cb" //外圈标签字体颜色
              }
            },
            splitArea: {
              // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: ["#141c42", "#141c42"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            },
            // axisLabel:{//展示刻度
            //     show: true
            // },
            axisLine: {
              //指向外圈文本的分隔线样式
              lineStyle: {
                color: "#153269"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#113865", // 分隔线颜色
                width: 1 // 分隔线线宽
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            itemStyle: {
              emphasis: {
                lineStyle: {
                  width: 4
                }
              }
            },
            data: [
              {
                name: "2016",
                value: [85, 65, 55, 90, 82],
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#00c2ff"
                        },
                        {
                          offset: 0.5,
                          color: "rgba(0,0,0,0)"
                        },
                        {
                          offset: 1,
                          color: "#00c2ff"
                        }
                      ],
                      globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                  }
                },
                symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                label: {
                  // 单个拐点文本的样式设置
                  normal: {
                    show: true, // 单个拐点文本的样式设置。[ default: false ]
                    position: "top", // 标签的位置。[ default: top ]
                    distance: 2, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: "#6692e2", // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 14, // 文字的字体大小
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    //图形悬浮效果
                    borderColor: "#00c2ff",
                    borderWidth: 2.5
                  }
                }
                // lineStyle: {
                //     normal: {
                //         opacity: 0.5// 图形透明度
                //     }
                // }
              },
              {
                name: "2017",
                value: [50, 20, 45, 30, 75],
                symbolSize: 2.5,
                itemStyle: {
                  normal: {
                    borderColor: "#f9cf67",
                    borderWidth: 2.5
                  }
                },
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#f9cf67"
                        },
                        {
                          offset: 0.5,
                          color: "rgba(0,0,0,0)"
                        },
                        {
                          offset: 1,
                          color: "#f9cf67"
                        }
                      ],
                      globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                  }
                }
                // lineStyle: {
                //     normal: {
                //         opacity: 0.5// 图形透明度
                //     }
                // }
              },
              {
                name: "2018",
                value: [37, 80, 12, 50, 25],
                symbolSize: 2.5,
                itemStyle: {
                  normal: {
                    borderColor: "#e92b77",
                    borderWidth: 2.5
                  }
                },
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      type: "linear",
                      x: 0, //右
                      y: 0, //下
                      x2: 1, //左
                      y2: 1, //上
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e92b77"
                        },
                        {
                          offset: 0.5,
                          color: "rgba(0,0,0,0)"
                        },
                        {
                          offset: 1,
                          color: "#e92b77"
                        }
                      ],
                      globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                  }
                }
              }
            ]
          }
        ]
      };
      const myChart = eCharts.init(
        document.getElementById("resourcePercentEcharts")
      );
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
#allCountEcharts {
  width: 300px;
  height: 300px;
  position: relative;
}

#allCountEcharts::before {
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
    rgba(72, 123, 213, 0.2) 0%,
    rgba(72, 123, 213, 1) 50%,
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

#allCountEcharts::after {
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

#everyCountEcharts::before {
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
    rgba(72, 123, 213, 0.2) 0%,
    rgba(72, 123, 213, 1) 50%,
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

#everyCountEcharts {
  width: 300px;
  height: 300px;
  position: relative;
}

#everyCountEcharts::after {
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

#resourcePercentEcharts::before {
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
    rgba(72, 123, 213, 0.2) 0%,
    rgba(72, 123, 213, 1) 50%,
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

#resourcePercentEcharts {
  width: 300px;
  height: 300px;
  position: relative;
}

#resourcePercentEcharts::after {
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
</style>
