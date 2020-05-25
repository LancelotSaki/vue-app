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

  #everyCountEcharts {
    width: 600px;
    height: 300px;
    margin-left: 300px;
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
</style>
