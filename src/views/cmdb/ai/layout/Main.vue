<template>
  <main>
    <div id="cmdbDeployEcharts"></div>
  </main>
</template>
<script>
const eCharts = require("echarts");
var pc = 'path://M0 2v20h32v-20h-32zM30 20h-28v-16h28v16zM21 24h-10l-1 4-2 2h16l-2-2z';


var ie = 'path://M22.944 19.651h7.377c0.057-0.512 0.080-1.034 0.080-1.569 ' +
    '0-2.507-0.673-4.858-1.848-6.883 1.215-3.228 1.172-5.968-0.455-7.606-1.547-1.54-5.697-1.29-10.388 ' +
    '0.787-0.347-0.026-0.697-0.040-1.051-0.040-6.439 0-11.841 4.431-13.335 ' +
    '10.402 2.020-2.586 4.145-4.461 6.984-5.826-0.258 0.242-1.764 1.739-2.018 ' +
    '1.993-7.486 7.484-9.847 17.26-7.306 19.8 1.931 1.93 5.43 1.604 9.449-0.364 ' +
    '1.869 0.952 3.984 1.488 6.226 1.488 6.035 0 11.15-3.885 13.003-9.295h-7.433c-1.023 ' +
    '1.887-3.023 3.171-5.319 3.171s-4.296-1.284-5.319-3.171c-0.455-0.852-0.716-1.83-' +
    '0.716-2.864v-0.023h12.071zM10.884 16.025c0.171-3.035 2.694-5.456 5.774-5.456s5.604 ' +
    '2.421 5.774 5.456h-11.548zM28.030 5.119c1.048 1.059 1.021 3.007 0.125 5.438-1.535-2.' +
    '341-3.766-4.186-6.4-5.239 2.816-1.207 5.106-1.367 6.274-0.199zM2.921 30.227c-1.337-1.337-0.934-4.144 ' +
    '0.788-7.526 1.072 3.008 3.161 5.534 5.854 7.161-2.982 1.354-5.423 1.584-6.643 0.365z';

var man = 'path://M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 ' +
    '7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 ' +
    '5.82-13 13-13zM25 8c0.55 0 1 0.45 1 1v3c0 1.1-0.9 2-2 2h-4c-1.1 ' +
    '0-2-0.9-2-2h-4c0 1.1-0.9 2-2 2h-4c-1.1 0-2-0.9-2-2v-3c0-0.55 ' +
    '0.45-1 1-1h6c0.55 0 1 0.45 1 1v1h4v-1c0-0.55 0.45-1 1-1h6zM16 ' +
    '24c2.913 0 5.462-1.557 6.861-3.884l1.715 1.029c-1.749 2.908-4.935 ' +
    '4.855-8.576 4.855-1.514 0-2.95-0.337-4.236-0.94l1.036-1.727c0.98 ' +
    '0.429 2.061 0.668 3.199 0.668z';//戴墨镜
export default {
  name: "TopoMain",
  data() {
    return {
      nodes: [
        {
          name: "BOMC监控平台",
          host: "10.239.86.193;10.239.86.194",
          path: "-",
          icon: pc,
          desc: "BOMC监控平台",
          value: [0, 250],
          offset: [0, 0]
        },
        {
          name: "IT资源管理系统前台",
          host: "10.242.23.146",
          path: "/cmdb/ep/webapps/cloud-h5",
          icon: ie,
          desc: "IT资源管理系统前台",
          alarm: "1",
          alias: "未来两周内10.242.23.146主机容量可能会满载, \n请提前处理",
          url: "http://117.169.37.163:8084/index.html",
          value: [250, 400],
          offset: [0, 0]
        },
        {
          name: "IT资源管理系统后台",
          host: "10.242.23.146",
          path: "/cmdb/ep/webapps/cloud-h5",
          icon: pc,
          desc: "IT资源管理系统后台",
          url: "http://117.169.37.163:8084/index.html",
          value: [250, 250],
          offset: [0, 0]
        },
        {
          name: "业务员",
          desc: "业务员",
          icon: man,
          value: [250, 550],
          offset: [0, 0]
        },
        {
          name: "AIOps",
          desc: "AIOps",
          icon: pc,
          value: [500, 250],
          offset: [0, 0]
        }
      ],
      lines: [
        {
          source: "BOMC监控平台",
          target: "IT资源管理系统后台",
          ref: "数据反馈",
          desc: "机房",
          coords: [[0, 250], [250, 250]]
        },
        {
          source: "IT资源管理系统后台",
          target: "BOMC监控平台",
          ref: "数据同步",
          desc: "机房",
          coords: [[250, 250], [0, 250]]
        },
        {
          source: "IT资源管理系统后台",
          target: "AIOps",
          ref: "数据同步",
          desc: "机房",
          coords: [[250, 250], [500, 250]]
        },
        {
          source: "AIOps",
          target: "IT资源管理系统后台",
          ref: "以不同的维度分析数据返回",
          desc: "机房",
          coords: [[500, 250], [250, 250]]
        },
        {
          source: "IT资源管理系统后台",
          target: "IT资源管理系统前台",
          ref: "反馈",
          desc: "机房",
          coords: [[250, 400], [250, 250]]
        },
        {
          source: "IT资源管理系统前台",
          target: "IT资源管理系统后台",
          ref: "请求",
          desc: "机房",
          coords: [[250, 250], [250, 400]]
        },
        {
          source: "业务员",
          target: "IT资源管理系统前台",
          ref: "查看",
          desc: "机房",
          coords: [[250, 550], [250, 400]]
        }
      ],
      links: [],
      timeout: null,
      interval: null
    }
  },
  mounted() {
    this.createEcharts();
  },
  methods: {
    createEcharts() {
      var tmp = [];
      this.lines.forEach(function (value) {
        // 线条字体风格
        if(value.source && value.target) {
          tmp.push({
            source: value.source,
            target: value.target,
            label: {
              normal: {
                show: true,
                formatter: value.ref
              }
            },
            lineStyle: {
              normal: {
                color: '#2b91e4',
                curveness: 0.2
              }
            }
          });
        }
      });
      this.links = tmp;
      var seriesData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          res.push({
            host: data[i].host,
            path: data[i].path,
            alias: data[i].alias,
            desc: data[i].desc,
            name: data[i].name,
            alarm: data[i].alarm,
            symbol: data[i].icon,
            symbolSize: 30, //图标大小
            symbolOffset: data[i].offset,
            draggable: false,
            fixed: true,
            value: data[i].value,
            label: {
              normal: {
                position: data[i].direction ? data[i].direction : "bottom",
                distance: 2, //离图标多远
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: "rgba(7,0,0,1)",
                  fontWeight: 600
                },
              }
            },
            itemStyle: {
              color: data[i].icon_color ? data[i].icon_color: "rgba(8,130,230, 1)"
            }
          });
        }
        return res;
      };

      var option = {
        grid: {
          left: "80px",
          bottom: "0%",
          top: "0%",
          right: "5%"
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: {
          show: false,
          type: "value"
        },
        tooltip:
            {
              textStyle: {
                fontSize: 8
              },
              formatter: function (params) {//悬浮提示框显示的内容
                /*if (params.data.isLink) {
                  return 'hello';
                }*/
                if (params.dataType === 'node') {
                  var html = '';
                  var h = "";
                  var h0 = "";
                  var h1 = "";
                  var h2 = "";
                  var tmp = params.data.desc;
                  var desc = "";
                  if(tmp) {
                    for(var x = 0; x < tmp.length; x++) {
                      if(x % 19 == 18) {
                        desc += tmp[x] + "<br/>";
                      } else {
                        desc += tmp[x];
                      }
                    }
                  }
                  var host = params.data.host ? params.data.host : "-";
                  h = "<ul>" +
                      "<li>部署主机：</li>" +
                      "<li>" + host + "</li>" +
                      "</ul>";
                  var path = params.data.path ? params.data.path : "-";
                  h0 = "<ul>" +
                      "<li>模块路径：</li>" +
                      "<li>" + path + "</li>" +
                      "</ul>";
                  h1 = "<ul>" +
                      "<li>说明：</li>" +
                      "<li>" + desc + "</li>" +
                      "</ul>";
                  html += "<div class='pop'>" +
                      h + h0 + h1 + h2 +
                      "</div>";
                  return html;
                } else if(params.dataType === 'edge') {
                  var html = '';
                  var h = "";
                  var h0 = "";
                  var h1 = "";
                  var h2 = "";
                  var tmp = params.data.desc;
                  var desc = "";
                  if(tmp) {
                    for(var x = 0; x < tmp.length; x++) {
                      if(x % 19 == 18) {
                        desc += tmp[x] + "<br/>";
                      } else {
                        desc += tmp[x];
                      }
                    }
                  }
                  var host = params.data.host ? params.data.host : "-";
                  h = "<ul>" +
                      "<li>部署主机：</li>" +
                      "<li>" + host + "</li>" +
                      "</ul>";
                  var path = params.data.path ? params.data.path : "-";
                  h0 = "<ul>" +
                      "<li>模块路径：</li>" +
                      "<li>" + path + "</li>" +
                      "</ul>";
                  h1 = "<ul>" +
                      "<li>说明：</li>" +
                      "<li>" + desc + "</li>" +
                      "</ul>";
                  html += "<div class='pop'>" +
                      h + h0 + h1 + h2 +
                      "</div>";
                  return html;
                }
              }
            },//悬浮时的提示框，不设置时是随鼠标移动
        series: [
          {
            type: "graph",
            coordinateSystem: "cartesian2d",
            legendHoverLink: false,
            hoverAnimation: true,
            nodeScaleRatio: false,
            roam: false,
            lineStyle: {
              normal: {
                width: 0,
                shadowColor: "none",
                color: "transparent"
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function (item) {
                    return item.data.alias ? item.data.alias : item.data.name
                  }
                }
              }
            },
            links: this.links,
            data: seriesData(this.nodes)
          },
          {
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            animationEasing: "linear",
            clip: false,
            symbol: ['none', 'none'],
            label: {
              normal: {
                show: true,
                formatter: "Z",
                color: 'rgba(255,255,255, 1)',
                fontStyle: 'oblique',
                textStyle: {
                  fontSize: 8
                },
              }
            },
            effect: {
              show: true,
              smooth: true,
              trailLength: 0,
              symbol: "arrow",
              color: "orange",
              symbolSize: 5,
              period: 4, //特效动画的时间
              loop: true
            },
            lineStyle: {
              curveness: 0.2,
              color: "#0ca361",
              opacity: 0.6,
              width: 1,
              type: "dashed"
            },
            data: this.lines
          }
        ]
      };
      const myChart = eCharts.init(document.getElementById("cmdbDeployEcharts"));
      myChart.setOption(option, true);
      // 用于告警的动态效果
      var nodes = this.nodes;
      this.interval = setInterval(function () {
        var dataI = [];
        for (var n = 0; n < nodes.length; n++) {
          var alarm = nodes[n].alarm
          if (alarm !== null && alarm !== '' && alarm !== undefined) {
            // option.series[0].data[n].symbolSize = 60
            option.series[0].data[n].label = {
              normal: {
                color: '#DC143C'
              }
            }
            option.series[0].itemStyle.normal.label.position = 'bottom';
            option.series[0].itemStyle.normal.label.formatter = function (item) {
              if (item.data.alarm !== undefined) {
                // item.data.name + '\n[ ' + item.data.alarm + ' ]'
                return item.data.alias
              } else {
                return item.data.name
              }
            }
            dataI.push(n)
          }
        }
        myChart.setOption(option);
        this.timeout = setTimeout(function () {
          for (var m = 0; m < dataI.length; m++) {
           // option.series[0].data[dataI[m]].symbolSize = 8
            option.series[0].data[dataI[m]].label = {
              normal: {
                color: '#2b91e4'
              }
            }
            option.series[0].itemStyle.normal.label.formatter = function (item) {
              return item.data.name
            }
          }
          myChart.setOption(option)
        }, 500);
      }, 1000);
    }
  }
};
</script>
<style scoped>

  main {
    position: relative;
    width: 100%;
    height: calc(100vh - 70px);
  }

  #cmdbDeployEcharts {
    height: calc(100vh - 70px);
  }
</style>
