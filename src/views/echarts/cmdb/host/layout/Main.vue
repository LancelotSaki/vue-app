<template>
  <main>
    <div id="allCountEcharts">资源</div>
    <div id="everyCountEcharts"></div>
  </main>
</template>
<script>
  const eCharts = require("echarts");
  export default {
    name: "TopoMain",
    mounted() {
      this.createEcharts1();
      this.createEcharts2();
    },
    methods: {
      // echarts
      createEcharts1() {
        let color = ['#f69846', '#f6d54a', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6', '#ad46f3', '#f845f1'];
        let names = ["物理机", "虚拟机", "网络设备", "存储", "其他"];
        let data = [444, 501, 468, 478, 431]
        let list = []
        let total = 0
        for (let i in data) {
          total += data[i]
        }

        let placeHolderStyle = {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
          }
        };

        let rich = {
          white: {
            align: 'center',
            padding: [3, 0]
          }
        };

        for (let i in data) {
          list.push({
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
          }, {
            value: total / 30,
            name: '',
            itemStyle: placeHolderStyle
          })
        }

        let func = (params) => {
          let percent = ((params.value / total) * 100).toFixed(1)
          let name = params.name.replace(/\n/g, '')
          if (params.name !== '') {
            return name + '\n{white|' + percent + '%}'
          } else {
            return ''
          }
        }


        var option = {
          title: {
            text: '资源分布情况',
            textStyle: {
              fontSize: 10,
              fontWeight: 'normal',
              color: '#fff',
            },
            x: 'center'
          },
          tooltip: {
            show: false
          },
          legend: {
            /*orient: 'vertical',*/
            data: names,
            icon: 'circle',
            right: '0px',
            top: '20px',
            textStyle: {
              color: '#fff',
              fontSize: 8
            }
          },
          series: [{
            name: '',
            type: 'pie',
            clockWise: false,
            startAngle: '90',
            center: ['49%', '60%'],
            radius: ['35%', '35%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'outside',
                  formatter: func,
                  rich: rich
                },
                labelLine: {
                  length: 15,
                  length2: 20,
                  show: true,
                  color: '#00ffff'
                }
              }
            },
            data: list,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return idx * 50;
            }
          },
            {
              name: '',
              type: 'pie',
              center: ['49%', '60%'],
              radius: ['35%', '35%'],
              itemStyle: {
                color: 'transparant'
              },
              startAngle: '90',
              data: [{
                value: total,
                name: '',
                label: {
                  normal: {
                    show: true,
                    formatter: '{c|{c}} {b|条记录}',
                    rich: {
                      c: {
                        color: 'rgb(98,137,169)',
                        fontSize: 12,
                        fontWeight: 'bold',
                        lineHeight: 5
                      },
                      b: {
                        color: 'rgb(98,137,169)',
                        fontSize: 14,
                        lineHeight: 5
                      }
                    },
                    textStyle: {
                      fontSize: 14,
                      fontWeight: 'bold'
                    },
                    position: 'center'
                  }
                }
              }]
            }
          ]
        };
        const myChart = eCharts.init(
          document.getElementById("allCountEcharts")
        );
        myChart.setOption(option);
      },
      createEcharts2() {
        var option = {
          tooltip: {
            formatter: '{c}%的{b}'
          },
          series: [
            {
              name: '资源',
              type: 'gauge',
              min: 0,
              max: 100,
              splitNumber: 10,
              center: ['50%', '65%'],    // 默认全局居中
              radius: '120px', //图表尺寸
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                  width: 3,
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                fontWeight: 'bolder',
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
              },
              axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 2,
                  color: '#fff',
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor: '#fff', //默认透明
                shadowBlur: 5,
                length: '70%',
                width: 5
              },
              title: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontSize: 8,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              detail: {
                /*这里就是详情配置*/
                backgroundColor: 'rgba(30,144,255,0.3)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 8,
                  color: '#fff'
                }
              },
              data: [{value: 40, name: '资源占用率'}]
            }
          ]
        };
        const myChart = eCharts.init(
            document.getElementById("everyCountEcharts")
        );
        myChart.setOption(option);
        setInterval(function (){
          option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
          myChart.setOption(option);
        },5000);

      }
    }
  };
</script>
<style scoped>


  #allCountEcharts {
    width: 300px;
    height: 300px;
    float: left;
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
    margin-left: 300px;
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

</style>
