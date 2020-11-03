<template>
  <main>
    <aside class="tabShow">
      <nav v-for="tab of tabGroup" :key="tab.id">
        <input :id="tab.id" type="radio" name="tab" :value="tab.value" :checked="tab.check ? true : false"/>
        <label :for="tab.id" :title="tab.title" @click="selectTable(tab.value)"><img :src="tab.img" width="20"
                                                                                     height="20"></label>
      </nav>
    </aside>
    <div id="cmdbDeployEcharts"></div>
  </main>
</template>
<script>
  const eCharts = require("echarts");
  var ie = 'path://M22.944 19.651h7.377c0.057-0.512 0.080-1.034 0.080-1.569 0-2.507-0.673-4.858-1.848-6.883 1.215-3.228 1.172-5.968-0.455-7.606-1.547-1.54-5.697-1.29-10.388 0.787-0.347-0.026-0.697-0.040-1.051-0.040-6.439 0-11.841 4.431-13.335 10.402 2.020-2.586 4.145-4.461 6.984-5.826-0.258 0.242-1.764 1.739-2.018 1.993-7.486 7.484-9.847 17.26-7.306 19.8 1.931 1.93 5.43 1.604 9.449-0.364 1.869 0.952 3.984 1.488 6.226 1.488 6.035 0 11.15-3.885 13.003-9.295h-7.433c-1.023 1.887-3.023 3.171-5.319 3.171s-4.296-1.284-5.319-3.171c-0.455-0.852-0.716-1.83-0.716-2.864v-0.023h12.071zM10.884 16.025c0.171-3.035 2.694-5.456 5.774-5.456s5.604 2.421 5.774 5.456h-11.548zM28.030 5.119c1.048 1.059 1.021 3.007 0.125 5.438-1.535-2.341-3.766-4.186-6.4-5.239 2.816-1.207 5.106-1.367 6.274-0.199zM2.921 30.227c-1.337-1.337-0.934-4.144 0.788-7.526 1.072 3.008 3.161 5.534 5.854 7.161-2.982 1.354-5.423 1.584-6.643 0.365z'; //IE

  var garbage = 'path://M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14zM26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z'; //删除

  var database = "path://M600.255321 133.164178c120.213708 0 219.218733 68.021482 " +
      "232.313549 155.527628h21.531936c-6.225171-97.884819-117.4874-175.858037-253.843452-175.858037S352.637041 " +
      "190.806986 346.411869 288.691806h21.529903c13.094816-87.506146 112.099841-155.527628 " +
      "232.313549-155.527628z,M600.255321 436.760206c-120.213708 0-219.218733-68.021482-232.313549-155.527627H346.409836c6.225171 " +
      "97.884819 117.4874 175.858037 253.843452 175.858036s247.620314-77.973217 " +
      "253.843452-175.858036h-21.531936c-13.09075 87.504113-112.095775 155.527628-232.309483 " +
      "155.527627z,M346.125211 741.541498c0 101.900075 113.7771 184.508626 254.13011 " +
      "184.508625 140.350978 0 254.130111-82.60855 254.130111-184.508625v-444.199103c0-2.901149-0.103685-5.784001-" +
      "0.286659-8.650589h-21.531936c0.971794 6.4854 1.486153 13.076519 1.486153 19.757091v421.988131c0 " +
      "96.803242-104.675176 175.282686-233.799702 175.282686s-233.799702-78.479444-233.799701-175." +
      "282686V308.448897c0-6.680572 0.516392-13.269658 1.486152-19.757091h-21.529903a135.835594 " +
      "135.835594 0 0 0-0.286658 8.650589v444.199103z";

  var person = 'path://M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM16 18.711c3.623 0 7.070-0.963 10-2.654-0.455 5.576-4.785 9.942-10 9.942s-9.544-4.371-10-9.947c2.93 1.691 6.377 2.658 10 2.658zM8 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3s-2-1.343-2-3zM20 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3s-2-1.343-2-3z'; //笑脸
  var next_per = 'path://M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM25 8c0.55 0 1 0.45 1 1v3c0 1.1-0.9 2-2 2h-4c-1.1 0-2-0.9-2-2h-4c0 1.1-0.9 2-2 2h-4c-1.1 0-2-0.9-2-2v-3c0-0.55 0.45-1 1-1h6c0.55 0 1 0.45 1 1v1h4v-1c0-0.55 0.45-1 1-1h6zM16 24c2.913 0 5.462-1.557 6.861-3.884l1.715 1.029c-1.749 2.908-4.935 4.855-8.576 4.855-1.514 0-2.95-0.337-4.236-0.94l1.036-1.727c0.98 0.429 2.061 0.668 3.199 0.668z'; //戴墨镜

  var email = 'path://M164,210.677v33.47l154.656,66.356L468,243.681v-33.004H164L164,210.677z M164,282.255L164,282.255v134.76h304V282.061l-149.012,66.615L164,282.255L164,282.255z';


  export default {
    name: "AutoDiscoMain",
    data() {
      return {
        currentSelect: 1,
        tabGroup: [
          {id: "openTab1", title: "IP发现", value: "ip", group: "tab", check: true, img: "/images/auto-disco/ip.svg"},
          {
            id: "openTab2",
            title: "主机发现",
            value: "host",
            group: "tab",
            check: false,
            img: "/images/auto-disco/host.svg"
          },
          {
            id: "openTab3",
            title: "主机用户发现",
            value: "user",
            group: "tab",
            check: false,
            img: "/images/auto-disco/user.svg"
          },
          {id: "openTab4", title: "文件系统发现", value: "fs", group: "tab", check: false, img: "/images/auto-disco/fs.svg"},
          {
            id: "openTab5",
            title: "主机网卡发现",
            value: "nic",
            group: "tab",
            check: false,
            img: "/images/auto-disco/nic.svg"
          },
          {id: "openTab6", title: "中间件发现", value: "mid", group: "tab", check: false, img: "/images/auto-disco/mid.svg"},
          {id: "openTab7", title: "数据库发现", value: "db", group: "tab", check: false, img: "/images/auto-disco/db.svg"},
          {
            id: "openTab8",
            title: "表空间发现",
            value: "db_space",
            group: "tab",
            check: false,
            img: "/images/auto-disco/db_space.svg"
          },
          {
            id: "openTab9",
            title: "数据库用户发现",
            value: "db_user",
            group: "tab",
            check: false,
            img: "/images/auto-disco/db_user.svg"
          },
          {
            id: "openTab10",
            title: "网络设备发现",
            value: "net",
            group: "tab",
            check: false,
            img: "/images/auto-disco/net.svg"
          },
          {
            id: "openTab11",
            title: "网络设备端口发现",
            value: "port",
            group: "tab",
            check: false,
            img: "/images/auto-disco/port.svg"
          },
          {
            id: "openTab12",
            title: "存储发现",
            value: "store",
            group: "tab",
            check: false,
            img: "/images/auto-disco/store.svg"
          },
        ],
        nodes: [],
        lines: []
      }
    },
    mounted() {
      this.$http.get("/json/auto-disco/ip.json").then((response) => {
        var nodes = response.data.nodes;
        nodes.forEach(function (item) {
          if (item.icon) {
            item.icon = item.icon.replace("${database}", database)
                .replace("${garbage}", garbage)
                .replace("${ie}", ie)
                .replace("${email}", email)
                .replace("${next_per}", next_per)
                .replace("${person}", person);
          }
        });
        this.nodes = nodes;
        this.lines = response.data.lines;
        this.createEcharts();
      })
    },
    methods: {
      selectTable(val) {
        this.$http.get("/json/auto-disco/" + val + ".json").then((response) => {
          var nodes = response.data.nodes;
          nodes.forEach(function (item) {
            if (item.icon) {
              item.icon = item.icon.replace("${database}", database)
                  .replace("${garbage}", garbage)
                  .replace("${ie}", ie)
                  .replace("${email}", email)
                  .replace("${next_per}", next_per)
                  .replace("${person}", person);
            }
          });
          this.nodes = nodes;
          this.lines = response.data.lines;
          this.createEcharts();
        })
        // console.log(val)
      },
      createEcharts() {
        var tmp = [];
        this.lines.forEach(function (value) {
          if (value.source && value.target) {
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
                  color: '#2b91e4'
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
              title: data[i].label,
              desc: data[i].desc,
              name: data[i].name,
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
                  }
                }
              },
              itemStyle: {
                color: data[i].icon_color ? data[i].icon_color : "rgba(8,130,230, 1)"
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
                    if (tmp) {
                      for (var x = 0; x < tmp.length; x++) {
                        if (x % 19 == 18) {
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
              links: this.links,
              data: seriesData(this.nodes),
              label: {
                formatter: function (item) {
                  return item.data.title
                }
              }
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
                curveness: 0,
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
        myChart.setOption(option);
      }
    },
    watch: {}
  };
</script>
<style scoped>

  main {
    position: relative;
    width: 100%;
    height: calc(100vh - 100px);
  }

  #cmdbDeployEcharts {
    height: 100%;
  }
</style>
