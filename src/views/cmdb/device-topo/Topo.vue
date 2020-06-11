<template>
  <article class="autoDiscoTopo">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </article>
</template>

<script>
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
        nodes: [],
        edges: []
      };
    },
    mounted() {
      this.createVisNetwork();
    },
    methods: {
      createVisNetwork: function () {
        var that = this;
        // create a network
        this.nodes = [];
        for (var i = 0; i < 30; i++) {
          this.nodes.push({
            id: i,
            title:
                "<p>" +
                (i < 10 ? "192.168." + i + ".1" : "192.168.1." + i) +
                "</p>" +
                "<ol><li>设备名称</li><li>" +
                (i < 10 ? "192.168." + i + ".1" : "192.168.1." + i) +
                "</li></ol>" +
                "<ol><li>设备类型</li><li>" +
                (i < 10 ? "交换机" : "主机") +
                "</li></ol>" +
                "<ol><li>硬件负责人</li><li>管理员</li></ol>" +
                "<ol><li>维护科室</li><li>信息技术部</li></ol>",
            label: i < 10 ? "192.168." + i + ".1" : "192.168.1." + i,
            group: parseInt(i / 10)
          });
        }

        // create an array with edges
        this.edges = [];
        for (var j = 0; j < 30; j++) {
          if (parseInt(j / 10) == j) {
            continue;
          }
          this.edges.push({from: parseInt(j / 10), to: j});
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
              to: {enabled: true, scaleFactor: 1, type: "arrow"}
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
          },
          manipulation: {
            addNode: function (data, callback) {
              // filling in the popup DOM elements
              document.getElementById("operation").innerHTML = "新增节点";
              document.getElementById("node-id").value = data.id;
              document.getElementById("node-label").value = data.label;
              document.getElementById("saveButton").onclick = that.$options.methods.saveData.bind(
                  this,
                  data,
                  callback
              );
              document.getElementById(
                  "cancelButton"
              ).onclick = that.$options.methods.clearPopUp.bind();
              document.getElementById("network-popUp").style.display = "block";
            },
            editNode: function (data, callback) {
              // filling in the popup DOM elements
              document.getElementById("operation").innerHTML = "编辑节点";
              document.getElementById("node-id").value = data.id;
              document.getElementById("node-label").value = data.label;
              document.getElementById("saveButton").onclick = that.$options.methods.saveData.bind(
                  this,
                  data,
                  callback
              );
              document.getElementById(
                  "cancelButton"
              ).onclick = that.cancelEdit.bind(this, callback);
              document.getElementById("network-popUp").style.display = "block";
            },
            addEdge: function (data, callback) {
              if (data.from == data.to) {
                var r = confirm("Do you want to connect the node to itself?");
                if (r == true) {
                  callback(data);
                }
              } else {
                callback(data);
              }
            }
          }
        };
        new vis.Network(container, data, options);
      },
      clearPopUp: function () {
        document.getElementById("saveButton").onclick = null;
        document.getElementById("cancelButton").onclick = null;
        document.getElementById("network-popUp").style.display = "none";
      },
      cancelEdit: function (callback) {
        document.getElementById("saveButton").onclick = null;
        document.getElementById("cancelButton").onclick = null;
        document.getElementById("network-popUp").style.display = "none";
        callback(null);
      },

      saveData: function (data, callback) {
        data.id = document.getElementById("node-id").value;
        data.label = document.getElementById("node-label").value;
        document.getElementById("saveButton").onclick = null;
        document.getElementById("cancelButton").onclick = null;
        document.getElementById("network-popUp").style.display = "none";
        callback(data);
      },
      destroy: function (network) {
        if (network !== null) {
          network.destroy();
          network = null;
        }
      },
    }
  };
</script>
<style scoped>
  @import "../../../../public/css/vis-reset.css";

  .autoDiscoTopo {
    overflow-x: hidden;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.85) !important;
    /* background: url("../../../../npage/cmdb/auto-find/topo/1.png") fixed no-repeat;*/
    background-size: cover;
  }
</style>
