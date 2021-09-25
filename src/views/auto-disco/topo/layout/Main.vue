<template>
  <main>
    <aside>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <!-- 制作折线stroke:线条颜色;opacity:透明度-->
        <!-- 制作折线stroke:线条颜色;opacity:透明度-->
        <defs>
          <linearGradient id="blue_line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: rgba(36,99,136, 0.65);" />
            <stop offset="100%" style="stop-color: rgba(36,99,136, 0);" />
          </linearGradient>
        </defs>
        <g>
          <title>broken line1</title>
          <!--stroke-linecap="round"圆角-->
          <line
            stroke-width="1px"
            stroke="url(#blue_line)"
            x1="100%"
            y1="20px"
            x2="calc(100% - 20px)"
            y2="0%"
            stroke-linecap="round"
          />
          <line
            stroke-width="1px"
            opacity="0.65"
            fill="none"
            stroke="#2385BD"
            x1="calc(100% - 20px)"
            y1="0%"
            x2="0%"
            y2="0%"
            stroke-linecap="round"
          />
          <line
            stroke-width="1px"
            opacity="0.65"
            fill="none"
            stroke="#2385BD"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100px"
            stroke-linecap="round"
          ></line>
          <line
            stroke-width="1px"
            opacity="0.65"
            fill="none"
            stroke="#2385BD"
            x1="0%"
            y1="100px"
            x2="10px"
            stroke-linecap="round"
            y2="calc(100px + 10px)"
          ></line>
        </g>
      </svg>
      <p class="showADResult">自动发现网络设备采集结果</p>
      <p class="batchResult">
        <el-select
          style="width: 100%;"
          v-model="currentSelect"
          filterable
          placeholder="请选择"
          @change="change"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </p>
      <div style="display: flex; flex-direction: column;">
        <aside class="myDefined">
          <ol>
            <li>网络设备总数</li>
            <li>24台</li>
          </ol>
          <ol>
            <li>端口总数</li>
            <li>121个</li>
          </ol>
          <ol>
            <li>活动端口总数</li>
            <li>62个</li>
          </ol>
          <ol>
            <li>CMDB已入库</li>
            <li>24台</li>
          </ol>
          <ol>
            <li>使用中</li>
            <li>24台</li>
          </ol>
          <ol>
            <li>与上次相比</li>
            <li>
              2台<span style="margin-left: 5px; color: rgba(232,79,138,0.85)"
            >↓</span
            >
            </li>
          </ol>
          <ol>
            <li>采集时间</li>
            <li>2020-07-27 19:50:01</li>
          </ol>
        </aside>
        <aside id="echartsResultShow"></aside>
        <aside class="collectDataCount">
          <ul>
            <li>交换机</li>
            <li>
              4台<span style="margin-left: 40px; color: rgba(232,79,138,0.85)"
            >↓</span
            >
            </li>
          </ul>
          <ul>
            <li>路由器</li>
            <li>
              3台<span style="margin-left: 40px; color: rgba(232,79,138,0.85)"
            >↓</span
            >
            </li>
          </ul>
          <ul>
            <li>防火墙</li>
            <li>4台</li>
          </ul>
          <ul>
            <li>物理主机</li>
            <li>7台</li>
          </ul>
          <ul>
            <li>虚拟机</li>
            <li>6台</li>
          </ul>
        </aside>
      </div>
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
          name: "物理机",
          img: "/images/network/machine.svg"
        },
        {
          name: "虚拟机",
          img: "/images/network/virtual.svg"
        },
        {
          name: "其他",
          img: "/images/network/default.svg"
        }
      ],
      options: [
        {
          value: "auto_20210727000000",
          label: "auto_20210727000000"
        },
        {
          value: "auto_20210726000000",
          label: "auto_20210726000000"
        },
        {
          value: "auto_20210725000000",
          label: "auto_20210725000000"
        },
        {
          value: "auto_20210724000000",
          label: "auto_20210724000000"
        },
        {
          value: "auto_20210723000000",
          label: "auto_20210723000000"
        },
        {
          value: "auto_20210722000000",
          label: "auto_20210722000000"
        },
        {
          value: "auto_20210721000000",
          label: "auto_20210721000000"
        },
        {
          value: "auto_20210720000000",
          label: "auto_20210720000000"
        }
      ],
      currentSelect: "auto_20210727000000"
    };
  },
  mounted() {
    this.createEcharts();
  },
  methods: {
    //change
    change(item){
      //得到点击的item点击后跳转到相应日期的数据
      this.$emit('childFn', item);
    },
    // echarts
    createEcharts() {
      var titleColor = "#f8f6dd";
      var fontColor = "#f4f2f1";
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
      let list = [];
      var names = ["物理机", "虚拟机", "交换机", "路由器", "防火墙", "VPN接入"];
      var data = [2444, 4501, 45, 128, 31, 51];
      var total = 0;
      for (var i in data) {
        total += data[i];
      }
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
              itemStyle: {
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
              }
            }
        );
      }
      var option = {
        title: {
          text: "资源分布情况",
          textStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: titleColor
          },
          x: "center"
        },
        tooltip: {
          show: false
        },
        legend: {
          /*orient: 'vertical',*/
          data: names,
          icon: "path://M60.217 633.91S310.415 738.469 434.781 964.54c149.378-279.763 436.11-540.714 521.05-560.014V63.083c-342.237 226.07-506.576 642.342-506.576 642.342l-180.05-191.614-208.988 120.1z",
          right: "0px",
          top: "20px",
          textStyle: {
            color: fontColor,
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
                  formatter: function (params) {
                    var percent = ((params.value / total) * 100).toFixed(1);
                    var name = params.name.replace(/\n/g, "");
                    if (params.name !== "") {
                      return name +"("+ params.value + ")\n{white|" + percent + "%}";
                    } else {
                      return "";
                    }
                  },
                  rich: {
                    white: {
                      align: "center",
                      padding: [3, 0]
                    }
                  }
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
            animationDelay: function (idx) {
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
      const myChart = eCharts.init(document.getElementById("echartsResultShow"));
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
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
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
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
  width: calc(100% - 300px);
  height: 100%;
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
    )
    1 10 1;
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
#echartsResultShow::before {
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

#echartsResultShow::after {
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

#echartsResultShow {
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 50px;
}
</style>
