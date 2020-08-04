<template>
  <article class="autoDiscoTopo">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </article>
</template>

<script>
import networkData from "../../../../public/json/network.json";
import linkData from "../../../../public/json/link.json";
/* author : admin */
import Main from "./layout/Main";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

require("vis-network/dist/vis-network.min.css");
var vis = require("vis-network/dist/vis-network.min.js");
export default {
  name: "TopoCore",
  components: { Header, Main, Footer },
  data() {
    return {
      networkData: networkData,
      linkData: linkData,
      nodes: [],
      edges: []
    };
  },
  mounted() {
    this.createVisNetwork();
  },
  methods: {
    createVisNetwork() {
      // create a network
      this.nodes = [];
      for (var i = 0; i < this.networkData.length; i++) {
        var sysName = this.networkData[i].sysName;
        var type = this.networkData[i].type;
        var image = "default";
        if(type.indexOf("交换机") > 0) {
          image = "switch";
        } else if (type.indexOf("路由器") > 0) {
          image = "router";
        } else if (type.indexOf("防火墙") > 0) {
          image = "fireware";
        } else if (type.indexOf("VPN") > 0) {
          image = "vpn";
        } else if (type.indexOf("负载均衡") > 0) {
          image = "nlb";
        } else if (type.indexOf("防御系统") > 0) {
          image = "ips";
        }
        this.nodes.push({
          id: this.networkData[i].id,
          label: sysName + "\n" + this.networkData[i].ip,
          group: this.networkData[i].group,
          shape: "image",
          image: "/images/network/" + image + ".svg",
          title: `<div class="vis-popup">
            <p>${sysName}</p>
            <ol><li>设备IP</li><li>${this.networkData[i].ip}</li></ol>
            <ol><li>设备类型</li><li>${type}</li></ol>
            <ol><li>设备厂商</li><li>${this.networkData[i].brand}</li></ol>
            <ol><li>设备型号</li><li>${this.networkData[i].model}</li></ol>
            <ol><li>端口总数</li><li>${this.networkData[i].ifNum}个</li></ol>
            <ol><li>活动端口数</li><li>${this.networkData[i].ifUseNum}个</li></ol>
            <ol><li>硬件负责人</li><li>龚纯</li></ol>
            <ol><li>维护部门</li><li>信息技术部</li></ol>
          </div>`
        });
      }

      // create an array with edges
      this.edges = [];
      for (var j = 0; j < this.linkData.length; j++) {
        this.edges.push({ from: this.linkData[j].from, to: this.linkData[j].to });
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
          /*是否启用鼠标聚焦事件*/
          hover: false
        },
        physics: {
          enabled: true,
          stabilization: true,
          barnesHut: {
            springLength: 200
          }
        }
      };
      var net = new vis.Network(container, data, options);
      net.on("doubleClick", e => { //双击完成
        var _nodeId = e.nodes[0];
        if (typeof _nodeId === 'undefined') {
          return;
        }
        net.focus(_nodeId, {
          scale: 1.5,
          animation: {
            duration: 1500,
            easingFunction: "linear"
          },
        });
      });
    }
  }
};
</script>
<style scoped>
  @import '../../../../public/css/vis-reset.css';
  .autoDiscoTopo {
    overflow-x: hidden;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.85) !important;
    /* background: url("../../../../npage/cmdb/auto-find/topo/1.png") fixed no-repeat;*/
    background-size: cover;
  }

</style>