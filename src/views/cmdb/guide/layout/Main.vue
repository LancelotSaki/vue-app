<template>
  <main>
    <div id="cmdbGuideEcharts"></div>
  </main>
</template>
<script>
const eCharts = require("echarts");
var path =
  "M1172.985723 682.049233l-97.748643-35.516964a32.583215 32.583215 " +
  "0 0 0-21.830134 61.582735l25.7398 9.123221-488.744218 238.181638L115.670112 " +
  "741.349163l47.245961-19.223356a32.583215 32.583215 0 0 0-22.808051-60.604819l-119.579777 " +
  "47.896905a32.583215 32.583215 0 0 0 0 59.952875l557.820313 251.540496a32.583215 " +
  "32.583215 0 0 0 27.695632 0l570.527227-278.584184a32.583215 32.583215 " +
  "0 0 0-3.258721-59.952875z,M1185.041693 482.966252l-191.587622-68.749123a32.583215 " +
  "32.583215 0 1 0-21.831133 61.254764l118.927833 43.010323-488.744218 " +
  "237.855666-471.474695-213.744727 116.973-47.244961a32.583215 32.583215 " +
  "0 1 0-24.111938-60.604819l-190.609705 75.593537a32.583215 32.583215 0 " +
  "0 0-20.528246 29.650465 32.583215 32.583215 0 0 0 20.528246 30.30141l557.819313 " +
  "251.866468a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 " +
  "32.583215 0 0 0 18.24744-30.953354 32.583215 32.583215 0 0 0-21.505161-29.651465z," +
  "M32.583215 290.075742l557.819313 251.540496a32.583215 32.583215 0 0 0 " +
  "27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0-3.257721-59.952875L626.244463 " +
  "2.042365a32.583215 32.583215 0 0 0-23.134022 0l-570.527226 228.080502a32.583215 32.583215 " +
  "0 0 0-19.224357 30.627382 32.583215 32.583215 0 0 0 19.224357 29.325493zM615.817355 " +
  "67.534767l474.733416 170.408432-488.744218 238.180638-471.474695-215.372588z";
export default {
  name: "TopoMain",
  mounted() {
    this.createGuide();
  },
  methods: {
    createGuide() {
      var obj = [
        {
          name: "自动发现",
          path: path,
          value: [0, 600],
          offset: [0, 0]
        },
        {
          name: "NMAP-IP发现",
          path: path,
          value: [50, 600],
          offset: [0, 0]
        },
        {
          name: "主机发现",
          path: path,
          value: [100, 400],
          offset: [0, 0]
        },
        {
          name: "网络设备发现",
          path: path,
          value: [100, 800],
          offset: [0, 0]
        },
        {
          name: "SNMP采集",
          path: path,
          value: [150, 800],
          offset: [0, 0]
        },
        {
          name: "SSH登录",
          path: path,
          value: [150, 400],
          offset: [0, 0]
        },
        {
          name: "网络-交换机",
          path: path,
          value: [200, 900],
          offset: [0, 0]
        },
        {
          name: "网络-路由器",
          path: path,
          value: [200, 850],
          offset: [0, 0]
        },
        {
          name: "网络-防火墙",
          path: path,
          value: [200, 800],
          offset: [0, 0]
        },
        {
          name: "网络-VPN接入",
          path: path,
          value: [200, 750],
          offset: [0, 0]
        },
        {
          name: "数据库",
          path: path,
          value: [200, 550],
          offset: [0, 0]
        },
        {
          name: "数据库表空间",
          path: path,
          value: [200, 500],
          offset: [0, 0]
        },
        {
          name: "文件系统",
          path: path,
          value: [200, 450],
          offset: [0, 0]
        },
        {
          name: "中间件",
          path: path,
          value: [200, 400],
          offset: [0, 0]
        },
        {
          name: "主机网卡",
          path: path,
          value: [200, 350],
          offset: [0, 0]
        },
        {
          name: "物理机",
          path: path,
          value: [200, 300],
          offset: [0, 0]
        },
        {
          name: "虚拟机",
          path: path,
          value: [200, 250],
          offset: [0, 0]
        },
        {
          name: "未知设备",
          path: path,
          value: [100, 600],
          offset: [0, 0]
        },
        {
          name: "CMDB",
          path: path,
          value: [1000, 600],
          offset: [0, 0]
        },
        {
          name: "EXCEL导入",
          path: path,
          value: [900, 650],
          offset: [0, 0]
        },
        {
          name: "前台页面新增",
          path: path,
          value: [900, 600],
          offset: [0, 0]
        },
        {
          name: "走流程工单",
          path: path,
          value: [900, 550],
          offset: [0, 0]
        },
        {
          name: "资源入库",
          path: path,
          value: [800, 600],
          offset: [0, 0]
        },
        {
          name: "SaaS类",
          path: path,
          value: [700, 1000],
          offset: [0, 0]
        },
        {
          name: "PaaS类",
          path: path,
          value: [700, 800],
          offset: [0, 0]
        },
        {
          name: "IaaS类",
          path: path,
          value: [700, 500],
          offset: [0, 0]
        },
        {
          name: "其他类",
          path: path,
          value: [700, 200],
          offset: [0, 0]
        },
        {
          name: "业务系统",
          path: path,
          value: [600, 1050],
          offset: [0, 0]
        },
        {
          name: "应用服务",
          path: path,
          value: [600, 1000],
          offset: [0, 0]
        },
        {
          name: "CMDB-进程",
          path: path,
          value: [600, 950],
          offset: [0, 0]
        },
        {
          name: "CMDB-中间件",
          path: path,
          value: [600, 900],
          offset: [0, 0]
        },
        {
          name: "CMDB-数据库对象",
          path: path,
          value: [600, 850],
          offset: [0, 0]
        },
        {
          name: "CMDB-数据库实例",
          path: path,
          value: [600, 800],
          offset: [0, 0]
        },
        {
          name: "CMDB-文件系统",
          path: path,
          value: [600, 750],
          offset: [0, 0]
        },
        {
          name: "非关系型数据库",
          path: path,
          value: [600, 700],
          offset: [0, 0]
        },
        {
          name: "CMDB-资源池",
          path: path,
          value: [600, 650],
          offset: [0, 0]
        },
        {
          name: "CMDB-虚拟机",
          path: path,
          value: [600, 600],
          offset: [0, 0]
        },
        {
          name: "CMDB-储存",
          path: path,
          value: [600, 550],
          offset: [0, 0]
        },
        {
          name: "CMDB-网卡",
          path: path,
          value: [600, 500],
          offset: [0, 0]
        },
        {
          name: "CMDB-物理机",
          path: path,
          value: [600, 450],
          offset: [0, 0]
        },
        {
          name: "CMDB-交换机",
          path: path,
          value: [600, 400],
          offset: [0, 0]
        },
        {
          name: "CMDB-路由器",
          path: path,
          value: [600, 350],
          offset: [0, 0]
        },
        {
          name: "CMDB-防火墙",
          path: path,
          value: [600, 300],
          offset: [0, 0]
        },
        {
          name: "关键地市",
          path: path,
          value: [600, 250],
          offset: [0, 0]
        },
        {
          name: "手册",
          path: path,
          value: [600, 200],
          offset: [0, 0]
        },
        {
          name: "合同",
          path: path,
          value: [600, 150],
          offset: [0, 0]
        }
      ];

      var seriesData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          res.push({
            name: data[i].name,
            symbol: "path://" + data[i].path,
            symbolSize: 25, //图标大小
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
                  fontSize: 8,
                  color: "#0ca361",
                  fontWeight: 700
                }
              }
            },
            itemStyle: {
              color: "#0ca361"
            }
          });
        }
        return res;
      };

      var option = {
        grid: {
          left: "5%",
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
            data: seriesData(obj)
          },
          {
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            animationEasing: "linear",
            clip: false,
            effect: {
              show: true,
              smooth: true,
              trailLength: 0,
              symbol: "arrow",
              color: "#0ca361",
              symbolSize: 8,
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
            data: [
              // IP发现
              {
                coords: [
                  [0, 600],
                  [50, 600]
                ]
              },
              // 未知设备
              {
                coords: [
                  [50, 600],
                  [100, 600]
                ]
              },
              // 网络设备发现
              {
                coords: [
                  [50, 600],
                  [100, 800]
                ]
              },
              {
                coords: [
                  [100, 800],
                  [150, 800]
                ]
              },
              {
                coords: [
                  [150, 800],
                  [200, 900]
                ]
              },
              {
                coords: [
                  [150, 800],
                  [200, 850]
                ]
              },
              {
                coords: [
                  [150, 800],
                  [200, 800]
                ]
              },
              {
                coords: [
                  [150, 800],
                  [200, 750]
                ]
              },
              // 主机发现
              {
                coords: [
                  [50, 600],
                  [100, 400]
                ]
              },
              {
                coords: [
                  [100, 400],
                  [150, 400]
                ]
              },
              {
                coords: [
                  [150, 400],
                  [200, 550]
                ]
              },
              {
                coords: [
                  [150, 400],
                  [200, 500]
                ]
              },
              {
                coords: [
                  [150, 400],
                  [200, 450]
                ]
              },
              {
                coords: [
                  [150, 400],
                  [200, 400]
                ]
              },
              {
                coords: [
                  [150, 400],
                  [200, 350]
                ]
              },
              {
                coords: [
                  [150, 400],
                  [200, 300]
                ]
              },

              // CMDB
              {
                coords: [
                  [1000, 600],
                  [900, 650]
                ]
              },
              {
                coords: [
                  [1000, 600],
                  [900, 600]
                ]
              },
              {
                coords: [
                  [1000, 600],
                  [900, 550]
                ]
              },

              {
                coords: [
                  [900, 650],
                  [800, 600]
                ]
              },
              {
                coords: [
                  [900, 600],
                  [800, 600]
                ]
              },
              {
                coords: [
                  [900, 550],
                  [800, 600]
                ]
              },

              {
                coords: [
                  [800, 600],
                  [700, 1000]
                ]
              },
              {
                coords: [
                  [800, 600],
                  [700, 800]
                ]
              },
              {
                coords: [
                  [800, 600],
                  [700, 500]
                ]
              },
              {
                coords: [
                  [800, 600],
                  [700, 200]
                ]
              },

              {
                coords: [
                  [700, 1000],
                  [600, 1050]
                ]
              },
              {
                coords: [
                  [700, 1000],
                  [600, 1000]
                ]
              },

              {
                coords: [
                  [700, 800],
                  [600, 950]
                ]
              },
              {
                coords: [
                  [700, 800],
                  [600, 900]
                ]
              },
              {
                coords: [
                  [700, 800],
                  [600, 850]
                ]
              },
              {
                coords: [
                  [700, 800],
                  [600, 800]
                ]
              },
              {
                coords: [
                  [700, 800],
                  [600, 750]
                ]
              },
              {
                coords: [
                  [700, 800],
                  [600, 700]
                ]
              },

              {
                coords: [
                  [700, 500],
                  [600, 650]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 600]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 550]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 500]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 450]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 400]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 350]
                ]
              },
              {
                coords: [
                  [700, 500],
                  [600, 300]
                ]
              },

              {
                coords: [
                  [700, 200],
                  [600, 250]
                ]
              },
              {
                coords: [
                  [700, 200],
                  [600, 200]
                ]
              },
              {
                coords: [
                  [700, 200],
                  [600, 150]
                ]
              }
            ]
          }
        ]
      };
      const myChart = eCharts.init(document.getElementById("cmdbGuideEcharts"));
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
#cmdbGuideEcharts {
  width: 100%;
  height: 100%;
}

#cmdbGuideEcharts::before {
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

#cmdbGuideEcharts::after {
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
