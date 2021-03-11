<template>
  <main>
    <section>
      <div id="cmdbMapEcharts" data-word="全国省份分布情况"></div>
    </section>
    <aside>
      <div
        class="myEcharts"
        id="allCountEcharts"
        data-word="资源分布情况"
      ></div>
      <div class="myEcharts" id="everyCountEcharts" data-word="资源总数"></div>
      <div
        class="myEcharts"
        id="resourcePercentEcharts"
        data-word="资源占用百分比"
      ></div>
      <div
        class="myEcharts"
        id="resourceSinglePercentEcharts"
        data-word="单资源占用百分比"
      ></div>
    </aside>
  </main>
</template>
<script>
const eCharts = require("echarts");
const tick =
  "path://M60.217 633.91S310.415 738.469 434.781 964.54c149.378-279.763 436.11-540.714 521.05-560.014V63.083c-342.237 226.07-506.576 642.342-506.576 642.342l-180.05-191.614-208.988 120.1z";
const eye =
  "path://M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z";
export default {
  name: "TopoMain",
  data() {
    return {
      chinaMap: {}
    };
  },
  mounted() {
    this.$http.get("/json/map/china-map.json").then(response => {
      this.chinaMap = response.data;
      this.createMapEcharts();
    });
    this.createEcharts1();
    this.createEcharts2();
    this.createEcharts3();
    this.createEcharts4();
  },
  methods: {
    // echarts
    createMapEcharts() {
      var geoCoordMap = {
        台湾: [121.5135, 25.0308],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      };

      var colors = [
        [
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3"
        ],
        [
          "#37A2DA",
          "#67E0E3",
          "#32C5E9",
          "#9FE6B8",
          "#FFDB5C",
          "#FF9F7F",
          "#FB7293",
          "#E062AE",
          "#E690D1",
          "#E7BCF3",
          "#9D96F5",
          "#8378EA",
          "#8378EA"
        ],
        [
          "#DD6B66",
          "#759AA0",
          "#E69D87",
          "#8DC1A9",
          "#EA7E53",
          "#EEDD78",
          "#73A373",
          "#73B9BC",
          "#7289AB",
          "#91CA8C",
          "#F49F42"
        ]
      ];
      var colorIndex = 0;
      var year = ["2018"];
      var mapData = [[], []];

      /*柱子Y名称*/
      for (var key in geoCoordMap) {
        mapData[0].push({
          year: "2018",
          name: key,
          value: 10
        });
      }
      eCharts.registerMap("china", this.chinaMap);
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      var convertToLineData = [
        [
          {
            coord: [108.479, 23.1152]
          },
          {
            coord: [116.0046, 28.6633]
          }
        ]
      ];

      var optionXyMap01 = {
        timeline: {
          data: year,
          axisType: "category",
          autoPlay: true,
          playInterval: 3000,
          left: "10%",
          right: "10%",
          bottom: "3%",
          width: "80%",
          //  height: null,
          label: {
            normal: {
              textStyle: {
                color: "#ddd"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          symbolSize: 10,
          lineStyle: {
            color: "#555"
          },
          checkpointStyle: {
            borderColor: "#777",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: "#666",
              borderColor: "#666"
            },
            emphasis: {
              color: "#aaa",
              borderColor: "#aaa"
            }
          }
        },
        baseOption: {
          animation: true,
          animationDuration: 1000,
          animationEasing: "cubicInOut",
          animationDurationUpdate: 1000,
          animationEasingUpdate: "cubicInOut",
          grid: {
            right: "1%",
            top: "15%",
            bottom: "10%",
            width: "20%"
          },
          tooltip: {
            trigger: "axis", // hover触发器
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: "rgba(150,150,150,0.1)" //hover颜色
              }
            }
          },
          geo: {
            show: true,
            map: "china",
            roam: true,
            zoom: 1,
            center: [113.83531246, 34.0267395887],
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(128, 217, 248, 1)",
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: "#389BB7",
                borderWidth: 0
              }
            }
          }
        },
        options: []
      };
      for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
          series: [
            //未知作用
            {
              //文字和标志
              name: "light",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(mapData[n]),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              }
            },
            //地图？
            {
              type: "map",
              map: "china",
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: "#031525",
                  borderColor: "#FFFFFF"
                },
                emphasis: {
                  areaColor: "#2B91B7"
                }
              },
              animation: false,
              data: mapData
            },
            //地图点的动画效果
            {
              //  name: 'Top 5',
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(
                mapData[n]
                  .sort(function(a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 20)
              ),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke"
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  shadowBlur: 10,
                  shadowColor: colors[colorIndex][n]
                }
              },
              zlevel: 1
            },
            //地图线的动画效果
            {
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: "arrow", //箭头图标
                symbolSize: 3 //图标大小
              },
              lineStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  width: 0.1, //尾迹线条宽度
                  opacity: 0.5, //尾迹线条透明度
                  curveness: 0.3 //尾迹线条曲直度
                }
              },
              data: convertToLineData
            }
          ]
        });
      }
      const myChart = eCharts.init(document.getElementById("cmdbMapEcharts"));
      myChart.setOption(optionXyMap01, true);
    },
    createEcharts1() {
      var color = [
        "#f33768",
        "#f6d54a",
        "#45dbf7",
        "#f69846",
        "#f845f1",
        "#4777f5",
        "#5045f6",
        "#ad46f3",
        "#f845f1",
        "#24f352",
        "#f8f819",
        "#96e8f3",
        "#f86614",
        "#3ff3ce",
        "#f8f6dd",
        "#9577f3",
        "#f8ae9f",
        "#dbf3af",
        "#e286f8",
        "#7babf8"
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
          icon: tick,
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
                color: [
                  [0.09, "lime"],
                  [0.82, "#1e90ff"],
                  [1, "#ff4500"]
                ],
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
          icon: eye, // 图例形状
          bottom: 45,
          center: 0,
          itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 14,
            color: "#ade3ff"
          },
          data: ["最近一个月", "2017", "2018"]
        },
        radar: [
          {
            indicator: [
              {
                text: "中间件发现",
                max: 100
              },
              {
                text: "主机发现",
                max: 100
              },
              {
                text: "网络设备发现",
                max: 100
              },
              {
                text: "数据库发现",
                max: 100
              },
              {
                text: "IP发现",
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
            name: "资源管理",
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
                name: "最近一个月",
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
              }
              /*{
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
              }*/
            ]
          }
        ]
      };
      const myChart = eCharts.init(
        document.getElementById("resourcePercentEcharts")
      );
      myChart.setOption(option);
    },
    createEcharts4() {
      /**
       * 图标所需数据
       */
      var data = {
        value: 24.2,
        text: "-",
        color: [
          "rgba(36, 209, 209, 1)",
          "rgba(252, 142, 108, 1)",
          "rgba(68, 163, 252, 1)",
          "rgba(165, 211, 255, 1)"
        ],
        xAxis: ["主机", "物理机", "虚拟机", "网络设备"],
        values: ["76", "78", "22", "33"]
      };

      var seriesData = [];
      var titleData = [];
      data.values.forEach(function(item, index) {
        titleData.push({
          left: "70%",
          top: 18 * (index + 1) - 0.5 + "%",
          textAlign: "center",
          textStyle: {
            fontSize: "8",
            color: "rgba(255,255,255,0.5)",
            fontWeight: "20"
          },
          subtext: data.xAxis[index],
          subtextStyle: {
            fontSize: "8",
            color: "rgba(255,255,255,0.5)",
            fontWeight: "20"
          }
        });
        seriesData.push({
          type: "pie",
          radius: ["26", "30"],
          center: ["50%", 22 * (index + 1) + "%"],
          hoverAnimation: false,
          label: {
            normal: {
              position: "center"
            }
          },
          data: [
            {
              value: item,
              name: data.text,
              itemStyle: {
                normal: {
                  color: data.color[index]
                }
              },
              label: {
                normal: {
                  show: false
                }
              }
            },
            {
              value: 100 - item,
              name: "占位",
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: "#edf1f4"
                }
              },
              label: {
                normal: {
                  formatter: item,
                  textStyle: {
                    fontSize: 8,
                    color: "rgba(255,255,255,1)"
                  }
                }
              }
            }
          ]
        });
      });

      var option = {
        title: titleData,
        series: seriesData,
        grid: {
          top: "30px",
          left: "45px",
          right: "0",
          bottom: "39px"
        }
      };
      const myChart = eCharts.init(
        document.getElementById("resourceSinglePercentEcharts")
      );
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
section {
  flex: 1;
}
aside {
  width: 300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
}
.myEcharts {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  position: relative;
}

#cmdbMapEcharts {
  flex: 1;
  height: 100%;
}

#allCountEcharts::before,
#everyCountEcharts::before,
#resourcePercentEcharts::before,
#resourceSinglePercentEcharts::before {
  content: attr(data-word);
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 15px;
  line-height: 12px;
  left: 0;
  padding-left: 20px;
  font-size: 0.8rem;
  top: -15px;
  background: transparent;
  color: #dfd5e0;
  text-shadow: 0 1px rgba(122, 174, 195, 0.15), 0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45), 0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75), 2px 2px 2px rgba(122, 174, 195, 1);
}
#allCountEcharts::after,
#everyCountEcharts::after,
#resourcePercentEcharts::after,
#resourceSinglePercentEcharts::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 15px;
  left: 0;
  top: -15px;
  background: linear-gradient(
    to right,
    rgba(166, 162, 162, 0.5) 0%,
    rgb(28, 94, 192) 50%,
    rgba(70, 83, 201, 0.5) 100%
  );
  clip-path: polygon(
    0 95%,
    45% 95%,
    calc(45% + 4%) 0%,
    100% 0,
    100% 2px,
    calc(100% - 4%) 100%,
    calc(100% - 6%) 100%,
    calc(100% - 2%) 2px,
    calc(100% - 4%) 2px,
    calc(100% - 8%) 100%,
    calc(100% - 10%) 100%,
    calc(100% - 6%) 2px,
    calc(100% - 8%) 2px,
    calc(100% - 12%) 100%,
    calc(100% - 14%) 100%,
    calc(100% - 10%) 2px,
    calc(100% - 12%) 2px,
    calc(100% - 16%) 100%,
    calc(100% - 18%) 100%,
    calc(100% - 14%) 2px,
    calc(100% - 16%) 2px,
    calc(100% - 20%) 100%,
    calc(100% - 22%) 100%,
    calc(100% - 18%) 2px,
    calc(100% - 20%) 2px,
    calc(100% - 24%) 100%,
    calc(100% - 26%) 100%,
    calc(100% - 22%) 2px,
    calc(100% - 24%) 2px,
    calc(100% - 28%) 100%,
    calc(100% - 30%) 100%,
    calc(100% - 26%) 2px,
    calc(100% - 28%) 2px,
    calc(100% - 32%) 100%,
    calc(100% - 34%) 100%,
    calc(100% - 30%) 2px,
    calc(100% - 32%) 2px,
    calc(100% - 36%) 100%,
    calc(100% - 38%) 100%,
    calc(100% - 34%) 2px,
    calc(100% - 36%) 2px,
    calc(100% - 40%) 100%,
    calc(100% - 42%) 100%,
    calc(100% - 38%) 2px,
    calc(100% - 40%) 2px,
    60% 2px,
    calc(60% - 4%) 100%,
    0 100%
  );
}
</style>
