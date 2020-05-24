<template>
  <main>
    <div id="allCountEcharts"></div>
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
          animationDelay: function(idx) {
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
      var jsonData = {
        "RECORDS": [{
          "enterprises": "XX汽车有限公司",
          "TotalTax": 11111111111.11,
          "TotalTax_Rank": 1,
          "TotalTaxLeave": 555555555.55,
          "TotalTaxLeave_Rank": 7,
          "TotalContribute": 444444444.44,
          "TotalContribute_Rank": 6,
          "TotalAppropriation": 111111111.11,
          "TotalAppropriation_Rank": 9
        },
          {
            "enterprises": "XX股份有限公司XX分公司",
            "TotalTax": 8888888888.88,
            "TotalTax_Rank": 2,
            "TotalTaxLeave": 1111111111.11,
            "TotalTaxLeave_Rank": 2,
            "TotalContribute": 888888888.888,
            "TotalContribute_Rank": 2,
            "TotalAppropriation": 222222222.223,
            "TotalAppropriation_Rank": 5
          },
          {
            "enterprises": "XX公司",
            "TotalTax": 6666666666.66,
            "TotalTax_Rank": 3,
            "TotalTaxLeave": 3333333333.33,
            "TotalTaxLeave_Rank": 1,
            "TotalContribute": 1111111111.11,
            "TotalContribute_Rank": 1,
            "TotalAppropriation": 2222222222.22,
            "TotalAppropriation_Rank": 1
          }
        ]
      };

      var dataStyle = {
        normal: {
          shadowBlur: 40,
          shadowColor: 'rgba(40, 40, 40, 0.5)',
        }
      };
      var placeHolderStyle = {
        normal: {
          color: 'rgba(0,0,0,0)',
        },
        emphasis: {
          color: 'rgba(0,0,0,0)'
        }
      };
      var option = {
        title: {
          text: '开发区2015-2017年度税收前三名企业对比',
          target: 'self',
          textStyle: {
            color: '#000',
            fontSize: 23,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          show: true,
          formatter: function(params) {
            if (params.name != 'invisible' && params.name != '是否与第一名统一税收比例') {
              var relVal = params.seriesName;
              relVal += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span>' + params.name + ': ' + params.value.toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '(' + params.percent + '%)';
              if (params.name == '税收') {
                relVal += '<br/>税收排名: ' + jsonData.RECORDS[Math.floor(params.seriesIndex / 4)].TotalTax_Rank;
              } else if (params.name == '留成') {
                relVal += '<br/>留成排名: ' + jsonData.RECORDS[Math.floor(params.seriesIndex / 4)].TotalTaxLeave_Rank;
              } else if (params.name == '财力贡献') {
                relVal += '<br/>财力贡献排名: ' + jsonData.RECORDS[Math.floor(params.seriesIndex / 4)].TotalContribute_Rank;
              } else if (params.name == '拨款') {
                relVal += '<br/>拨款排名: ' + jsonData.RECORDS[Math.floor(params.seriesIndex / 4)].TotalAppropriation_Rank;
              }
              return relVal;
            }
          }

          //formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#c23531'],
        legend: {
          itemGap: 12,
          top: '5%',
          width: '420',
          textStyle: {
            color: '#000',
            fontSize: 18
          },
          data: ['税收', '留成', '财力贡献', '拨款', {
            name: '是否与第一名统一税收比例',
            icon: 'circle',
            textStyle: {
              fontWeight: 'bold'
            }
          }]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        series: [{
          type: 'pie',
          center: ['50%', '33%'],
          clockWise: false,
          radius: ['35%', '35%'],
          itemStyle: dataStyle,
          hoverAnimation: false,
          label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
          name: jsonData.RECORDS[0].enterprises,
          data: [{
            value: jsonData.RECORDS[0].TotalTax,
            name: '税收'
          },
            {
              value: 0,
              name: 'invisible',
              label:{
                show:false
              },
              itemStyle: placeHolderStyle
            }

          ]
        },
          {
            type: 'pie',
            center: ['50%', '33%'],
            clockWise: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[0].enterprises,
            data: [{
              value: jsonData.RECORDS[0].TotalTaxLeave,
              name: '留成'
            },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[0].TotalTaxLeave,
                name: 'invisible',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: 'pie',
            center: ['50%', '33%'],
            clockWise: false,
            hoverAnimation: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            name: jsonData.RECORDS[0].enterprises,
            data: [{
              value: jsonData.RECORDS[0].TotalContribute,
              label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
              name: '财力贡献'
            },
              {
                value: jsonData.RECORDS[0].TotalAppropriation,
                label:{normal:{show:true,formatter:'{d}%'}},
                labelLine:{normal:{length:0,show:true,length:0,length2:2}},
                name: '拨款'
              },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[0].TotalContribute - jsonData.RECORDS[0].TotalAppropriation,
                name: 'invisible',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: 'pie',
            center: ['50%', '33%'],
            clockWise: false,
            hoverAnimation: false,

            radius: [0, 1],
            itemStyle: dataStyle,
            name: jsonData.RECORDS[0].enterprises,
            label: {
              normal: {
                show: true,
                position: 'center',
                color: 'black',
                //fontWeight:'bold',
                formatter: [
                  '{title|{a}}{abg|}',
                  '  {stringHead|指标名}{valueHead|指标值}{rateHead|排名}',
                  '{hr|}',
                  '    {string|税收}{value|' + (Math.round(jsonData.RECORDS[0].TotalTax * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[0].TotalTax_Rank * 100) / 100 + '}',
                  '    {string|留成}{value|' + (Math.round(jsonData.RECORDS[0].TotalTaxLeave * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[0].TotalTaxLeave_Rank * 100) / 100 + '}',
                  '  {stringL|财力贡献}{value|' + (Math.round(jsonData.RECORDS[0].TotalContribute * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[0].TotalContribute_Rank * 100) / 100 + '}',
                  '    {string|拨款}{value|' + (Math.round(jsonData.RECORDS[0].TotalAppropriation * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[0].TotalAppropriation_Rank * 100) / 100 + '}',
                ].join('\n'),
                backgroundColor: '#eee',
                borderColor: '#777',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  title: {
                    color: '#eee',
                    align: 'center'
                  },
                  abg: {
                    backgroundColor: '#333',
                    width: '100%',
                    align: 'right',
                    height: 25,
                    borderRadius: [4, 4, 0, 0]
                  },
                  string: {
                    height: 20,
                    align: 'left',
                    color: 'black',
                    padding: [0, 20, 0, 0]
                  },
                  stringL: {
                    height: 20,
                    align: 'left',
                    color: 'black',
                    padding: [0, 10, 0, 0]
                  },
                  stringHead: {
                    color: '#333',
                    height: 24,
                    align: 'left',
                    padding: [0, 20, 0, 0]
                  },
                  hr: {
                    borderColor: 'rgba(119,119,119, 0.4)',
                    width: '100%',
                    align: 'right',
                    borderWidth: 0.5,
                    height: 0
                  },
                  value: {
                    width: 40,
                    padding: [0, 10, 0, 40],
                    align: 'left'
                  },
                  valueHead: {
                    color: '#333',
                    width: 40,
                    padding: [0, 10, 0, 30],
                    align: 'center'
                  },
                  rate: {
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  },
                  rateHead: {
                    color: '#333',
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  }
                }

                //formatter: "{a} {b} : {c} ({d}%)"
              }
            },
            data: [{
              value: 1,
              name: 'invisible'
            }]
          },

          {
            type: 'pie',
            center: ['33%', '67%'],
            clockWise: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[1].enterprises,
            data: [{
              value: jsonData.RECORDS[1].TotalTax,
              name: '税收'
            },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[1].TotalTax,
                name: '是否与第一名统一税收比例',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }

            ]
          },
          {
            type: 'pie',
            center: ['33%', '67%'],
            clockWise: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[1].enterprises,
            data: [{
              value: jsonData.RECORDS[1].TotalTaxLeave,
              name: '留成'
            },
              {
                value: jsonData.RECORDS[1].TotalTax - jsonData.RECORDS[1].TotalTaxLeave,
                name: 'invisible',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[1].TotalTax,
                name: '是否与第一名统一税收比例',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: 'pie',
            center: ['33%', '67%'],
            clockWise: false,
            hoverAnimation: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[1].enterprises,
            data: [{
              value: jsonData.RECORDS[1].TotalContribute,
              name: '财力贡献'
            },
              {
                value: jsonData.RECORDS[1].TotalAppropriation,
                name: '拨款'
              },
              {
                value: jsonData.RECORDS[1].TotalTax - jsonData.RECORDS[1].TotalContribute - jsonData.RECORDS[1].TotalAppropriation,
                name: 'invisible',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[1].TotalTax,
                name: '是否与第一名统一税收比例',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: 'pie',
            center: ['33%', '67%'],
            clockWise: false,
            hoverAnimation: false,
            radius: [0, 1],
            itemStyle: dataStyle,
            name: jsonData.RECORDS[1].enterprises,
            label: {
              normal: {
                show: true,
                position: 'center',
                color: 'black',
                //fontWeight:'bold',
                formatter: [
                  '{title|{a}}{abg|}',
                  '  {stringHead|指标名}{valueHead|指标值}{rateHead|排名}',
                  '{hr|}',
                  '    {string|税收}{value|' + (Math.round(jsonData.RECORDS[1].TotalTax * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[1].TotalTax_Rank * 100) / 100 + '}',
                  '    {string|留成}{value|' + (Math.round(jsonData.RECORDS[1].TotalTaxLeave * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[1].TotalTaxLeave_Rank * 100) / 100 + '}',
                  '  {stringL|财力贡献}{value|' + (Math.round(jsonData.RECORDS[1].TotalContribute * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[1].TotalContribute_Rank * 100) / 100 + '}',
                  '    {string|拨款}{value|' + (Math.round(jsonData.RECORDS[1].TotalAppropriation * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[1].TotalAppropriation_Rank * 100) / 100 + '}',
                ].join('\n'),
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderColor: '#777',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  title: {
                    color: '#eee',
                    align: 'center'
                  },
                  abg: {
                    backgroundColor: '#333',
                    width: '100%',
                    align: 'right',
                    height: 25,
                    borderRadius: [4, 4, 0, 0]
                  },
                  string: {
                    height: 20,
                    align: 'left',
                    color: 'black',
                    padding: [0, 20, 0, 0]
                  },
                  stringL: {
                    height: 20,
                    align: 'left',
                    color: 'black',
                    padding: [0, 10, 0, 0]
                  },
                  stringHead: {
                    color: '#333',
                    height: 24,
                    align: 'left',
                    padding: [0, 20, 0, 0]
                  },
                  hr: {
                    borderColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    align: 'right',
                    borderWidth: 0.5,
                    height: 0
                  },
                  value: {
                    width: 40,
                    padding: [0, 10, 0, 40],
                    align: 'left'
                  },
                  valueHead: {
                    color: '#333',
                    width: 40,
                    padding: [0, 10, 0, 30],
                    align: 'center'
                  },
                  rate: {
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  },
                  rateHead: {
                    color: '#333',
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  }
                }

                //formatter: "{a} {b} : {c} ({d}%)"
              }
            },
            data: [{
              value: 1,
              name: 'invisible'
            }]
          },

          {
            type: 'pie',
            center: ['67%', '67%'],
            clockWise: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[2].enterprises,
            data: [{
              value: jsonData.RECORDS[2].TotalTax,
              name: '税收'
            },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[2].TotalTax,
                name: '是否与第一名统一税收比例',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle,

              }

            ]
          },
          {
            type: 'pie',
            center: ['67%', '67%'],
            clockWise: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[2].enterprises,
            data: [{
              value: jsonData.RECORDS[2].TotalTaxLeave,
              name: '留成'
            },
              {
                value: jsonData.RECORDS[2].TotalTax - jsonData.RECORDS[2].TotalTaxLeave,
                name: 'invisible',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[2].TotalTax,
                name: '是否与第一名统一税收比例',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }

            ]
          },
          {
            type: 'pie',
            center: ['67%', '67%'],
            clockWise: false,
            hoverAnimation: false,
            radius: ['35%', '35%'],
            itemStyle: dataStyle,
            label:{normal:{show:true,position:'inside',formatter:'{d}%'}},
            name: jsonData.RECORDS[2].enterprises,

            data: [{
              value: jsonData.RECORDS[2].TotalContribute,
              name: '财力贡献'
            },
              {
                value: jsonData.RECORDS[2].TotalAppropriation,
                name: '拨款'
              },
              {
                value: jsonData.RECORDS[2].TotalTax - jsonData.RECORDS[2].TotalContribute - jsonData.RECORDS[2].TotalAppropriation,
                name: 'invisible',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              },
              {
                value: jsonData.RECORDS[0].TotalTax - jsonData.RECORDS[2].TotalTax,
                name: '是否与第一名统一税收比例',
                label:{
                  show:false
                },
                itemStyle: placeHolderStyle
              }

            ]
          },
          {
            type: 'pie',
            center: ['67%', '67%'],
            clockWise: false,
            hoverAnimation: false,
            radius: [0, 1],
            itemStyle: dataStyle,
            name: jsonData.RECORDS[2].enterprises,
            label: {
              normal: {
                show: true,
                position: 'center',
                color: 'black',
                //fontWeight:'bold',
                formatter: [
                  '{title|{a}}{abg|}',
                  '  {stringHead|指标名}{valueHead|指标值}{rateHead|排名}',
                  '{hr|}',
                  '    {string|税收}{value|' + (Math.round(jsonData.RECORDS[2].TotalTax * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[2].TotalTax_Rank * 100) / 100 + '}',
                  '    {string|留成}{value|' + (Math.round(jsonData.RECORDS[2].TotalTaxLeave * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[2].TotalTaxLeave_Rank * 100) / 100 + '}',
                  '  {stringL|财力贡献}{value|' + (Math.round(jsonData.RECORDS[2].TotalContribute * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[2].TotalContribute_Rank * 100) / 100 + '}',
                  '    {string|拨款}{value|' + (Math.round(jsonData.RECORDS[2].TotalAppropriation * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') + '}{rate|' + Math.round(jsonData.RECORDS[2].TotalAppropriation_Rank * 100) / 100 + '}',
                ].join('\n'),
                backgroundColor: '#eee',
                borderColor: 'rgba(0,0,0,0.5)',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  title: {
                    color: '#eee',
                    align: 'center'
                  },
                  abg: {
                    backgroundColor: '#333',
                    width: '100%',
                    align: 'right',
                    height: 25,
                    borderRadius: [4, 4, 0, 0]
                  },
                  string: {
                    height: 20,
                    align: 'left',
                    color: 'black',
                    padding: [0, 20, 0, 0]
                  },
                  stringL: {
                    height: 20,
                    align: 'left',
                    color: 'black',
                    padding: [0, 10, 0, 0]
                  },
                  stringHead: {
                    color: '#333',
                    height: 24,
                    align: 'left',
                    padding: [0, 20, 0, 0]
                  },
                  hr: {
                    borderColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    align: 'right',
                    borderWidth: 0.5,
                    height: 0
                  },
                  value: {
                    width: 40,
                    padding: [0, 10, 0, 40],
                    align: 'left'
                  },
                  valueHead: {
                    color: '#333',
                    width: 40,
                    padding: [0, 10, 0, 30],
                    align: 'center'
                  },
                  rate: {
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  },
                  rateHead: {
                    color: '#333',
                    width: 40,
                    align: 'right',
                    padding: [0, 10, 0, 0]
                  }
                }

                //formatter: "{a} {b} : {c} ({d}%)"
              }
            },
            data: [{
              value: 1,
              name: 'invisible'
            }]
          },

        ]
      };
      const myChart = eCharts.init(
          document.getElementById("everyCountEcharts")
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
</style>
