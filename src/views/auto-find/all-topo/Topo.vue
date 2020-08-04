<template>
  <article class="autoDiscoTopo">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </article>
</template>

<script>
  import networkData from "../../../../public/json/topo.json";
  import linkData from "../../../../public/json/topo-link.json";
  /* author : admin */
  import Main from "./layout/Main";
  import Header from "./layout/Header";
  import Footer from "./layout/Footer";

  require("vis-network/dist/vis-network.min.css");
  var vis = require("vis-network/dist/vis-network.min.js");
  export default {
    name: "TopoCore",
    components: {Header, Main, Footer},
    data() {
      return {
        networkData: networkData,
        nodes: [],
        edges: linkData
      };
    },
    mounted() {
      this.createVisNetwork();
    },
    methods: {
      createVisNetwork() {
        // var that = this;
        // create a network
        this.nodes = [];
        for (var i = 0; i < this.networkData.length; i++) {
          var label = this.networkData[i].label;
          var type = this.networkData[i].type;
          var image = "/images/network/default.svg";
          if (type.indexOf("交换机") != -1) {
            image = "/images/network/switch.svg";
          } else if (type.indexOf("路由器") != -1) {
            image = "/images/network/router.svg";
          } else if (type.indexOf("防火墙") != -1) {
            image = "/images/network/fireware.svg";
          } else if (type.indexOf("VPN") != -1) {
            image = "/images/network/vpn.svg";
          } else if (type.indexOf("负载均衡") != -1) {
            image = "/images/network/nlb.svg";
          } else if (type.indexOf("防御系统") != -1) {
            image = "/images/network/ips.svg";
          } else if (type.indexOf("云平台") != -1) {
            image = "/images/network/cloud.svg";
          }
          this.nodes.push({
            id: this.networkData[i].id,
            label: this.networkData[i].label,
            shape: "image",
            image: image,
            title: `<div class="vis-popup">
            <p>${label}</p>
            <ol><li>硬件负责人</li><li>龚纯</li></ol>
            <ol><li>维护部门</li><li>信息技术部</li></ol>
          </div>`
          });
        }

        // create an array with edges
        /* this.edges = [];
         for (var j = 0; j < this.linkData.length; j++) {
           this.edges.push({ from: this.linkData[j].from, to: this.linkData[j].to });
         }*/
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
              color: "rgba(0, 0, 0, 1)",
              face: "arial"
            }
          },
          edges: {
            /*全局设置箭头风格*/
            arrows: {
              to: {enabled: false, scaleFactor: 0.5, type: "arrow"}
            },
            shadow: true,
            /*全局设置线条虚线风格*/
            dashes: false,
            font: {align: 'middle'}
          },
          interaction: {
            // 启用操作按钮
            navigationButtons: true,
            keyboard: true,
            /*是否启用鼠标聚焦事件*/
            hover: false
          },
          physics: {
            enabled: false,
            stabilization: {
              enabled: false,
              onlyDynamicEdges: true
            },
            barnesHut: {

            }
          }
        };
        new vis.Network(container, data, options);
      }
    }
  };
</script>
<style scoped>
  @import '../../../../public/css/vis-reset.css';

  .autoDiscoTopo {
    overflow-x: hidden;
    overflow-y: auto;
    background: rgba(255, 255, 255, 1) !important;
    /* background: url("../../../../npage/cmdb/auto-find/topo/1.png") fixed no-repeat;*/
    background-size: cover;
  }

</style>