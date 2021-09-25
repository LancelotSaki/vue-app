<template>
  <article class="deviceTopo">
    <Header></Header>
    <Main></Main>
    <nav
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="custom-topo-menu"
    >
      <a>查看详情</a>
      <a>节点下钻</a>
    </nav>
  </article>
</template>

<script>
/* author : admin */
import Main from "./layout/Main";
import Header from "./layout/Header";

require("vis-network/dist/vis-network.min.css");
var vis = require("vis-network/dist/vis-network.min.js");
export default {
  name: "TopoCore",
  components: { Header, Main },
  data() {
    return {
      network: null,
      nodesConfig: null,
      edgesConfig: null,
      visible: false,
      top: 0,
      left: 0
    };
  },

  mounted() {
    this.nodesConfig = new vis.DataSet();
    this.edgesConfig = new vis.DataSet();
    // 初始化画布
    this.draw();
    // 开始填充画布
    this.createVisNetwork();
  },
  methods: {
    draw: function() {
      this.destroy();
      var that = this;
      var container = document.getElementById("mynetwork");
      var data = {
        nodes: this.nodesConfig,
        edges: this.edgesConfig
      };
      var options = {
        locale: "cn", //工具栏显示中文
        locales: {
          cn: {
            // 中文操作对应
            edit: "编辑",
            del: "删除当前节点或关系",
            back: "返回",
            addNode: "添加节点",
            addEdge: "添加连线",
            editNode: "编辑节点",
            editEdge: "编辑连线",
            addDescription: "点击空白处可添加节点",
            edgeDescription: "点击某个节点拖拽连线可连接另一个节点",
            editEdgeDescription: "可拖拽连线改变关系",
            createEdgeError: "无法连接到集群",
            deleteClusterError: "集群不可能被删除",
            editClusterError: "集群不可能被编辑"
          }
        },
        interaction: {
          // 启用操作按钮
          navigationButtons: true,
          keyboard: true,
          /*启用鼠标聚焦事件*/
          hover: true
        },
        physics: {
          // 启用物理碰撞引擎
          enabled: true,
          // 在加载时稳定网络
          stabilization: true,
          forceAtlas2Based: {
            // 影响线长
           // springLength: 800
          },
          // 默认：barnesHut，节点过多推荐：forceAtlas2Based， 其他类型渲染太慢
          solver: "forceAtlas2Based"
        },
        nodes: {
          /*节点字体位置*/
          shape: "dot",
          /*缩小到一定程度才能查看字体*/
          /*节点(图标)大小*/
          size: 14,
          font: {
            /*全局设置拓扑图字体*/
            color: "#75AFFF",
            face: "arial"
          }
        },
        edges: {
          /*全局设置箭头风格*/
          arrows: {
            to: { enabled: true, scaleFactor: 0.5, type: "arrow" }
          },
          font: {
            color: "#a0baff",
            size: 0 // px
          },
          color: { color: "#0ca361", opacity: 0.68 },
          shadow: false,
          /*全局设置线条虚线风格*/
          dashes: false,
          labelHighlightBold: false,
          arrowStrikethrough: false //关系线与节点处无缝隙
        },
        manipulation: {
          //工具栏
          enabled: true,
          initiallyActive: true, //直接显示工具栏
          addNode: function(data, callback) {
            // filling in the popup DOM elements
            document.getElementById("operation").innerHTML = "新增节点";
            document.getElementById("node-id").value = data.id;
            document.getElementById("node-label").value = data.label;
            document.getElementById(
              "saveButton"
            ).onclick = that.$options.methods.saveData.bind(
              this,
              data,
              callback
            );
            document.getElementById(
              "cancelButton"
            ).onclick = that.$options.methods.clearPopUp.bind();
            document.getElementById("network-popUp").style.display = "block";
          },
          editNode: function(data, callback) {
            // filling in the popup DOM elements
            document.getElementById("operation").innerHTML = "编辑节点";
            document.getElementById("node-id").value = data.id;
            document.getElementById("node-label").value = data.label;
            document.getElementById(
              "saveButton"
            ).onclick = that.$options.methods.saveData.bind(
              this,
              data,
              callback
            );
            document.getElementById(
              "cancelButton"
            ).onclick = that.cancelEdit.bind(this, callback);
            document.getElementById("network-popUp").style.display = "block";
          },
          addEdge: function(data, callback) {
            if (data.from === data.to) {
              var r = confirm("Do you want to connect the node to itself?");
              if (r) {
                callback(data);
              }
            } else {
              callback(data);
            }
          }
        }
      };
      window.network = new vis.Network(container, data, options);
      window.network.on("hoverEdge", function(e) {
        this.body.data.edges.update({
          id: e.edge,
          font: {
            size: 12
          }
        });
      });

      window.network.on("blurEdge", function(e) {
        this.body.data.edges.update({
          id: e.edge,
          font: {
            size: 0
          }
        });
      });
      /**
       * TODO 单击事件
       */
      window.network.on("click", function(params) {
        if (!params.nodes || params.nodes.length === 0) {
          return;
        }
        console.log("单击：" + params.nodes);
      });

      /**
       * TODO 双击事件
       */
      window.network.on("doubleClick", function(params) {
        if (!params.nodes || params.nodes.length === 0) {
          return;
        }
        console.log("双击：" + params.nodes);
      });

      // 单击鼠标右键触发
      window.network.on("oncontext", function(params) {
        var nodeId = this.getNodeAt(params.pointer.DOM);
        var rect = params.event;
        console.log(rect);
        // 阻止冒泡
        params.event.preventDefault();
        if (nodeId) {
          console.log(nodeId);
          var clientRect = document
            .getElementById("mynetwork")
            .getBoundingClientRect();
          console.log(clientRect);
          that.top = params.event.pageY;
          that.left = params.event.pageX;
          if (that.top + 210 >= clientRect.bottom) {
            that.top = clientRect.bottom - 210;
          }
          if (that.left + 190 >= clientRect.right) {
            that.left = clientRect.right - 190;
          }
          console.log(that.left + ";" + that.top);
          that.visible = true;
        }
      });
    },
    createVisNetwork: function() {
      // create a network
      var nodes = [];
      for (var i = 1; i <= 100; i++) {
        nodes.push({
          id: i,
          /* title:
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
            "<ol><li>维护科室</li><li>信息技术部</li></ol>",*/
          label: i < 10 ? "192.168." + i + ".1" : "192.168.1." + i,
          group: 1000
        });
      }

      // create an array with edges
      var edges = [];
      for (var j = 1; j <= 1900; j++) {
        if(j === 1) {
          continue;
        }
        edges.push({
          from: 1,
          to: j,
          label: "指向",
          dashes: true
        });
      }
      this.nodesConfig.clear();
      this.edgesConfig.clear();
      this.nodesConfig.add(nodes);
      this.edgesConfig.add(edges);
    },
    clearPopUp: function() {
      document.getElementById("saveButton").onclick = null;
      document.getElementById("cancelButton").onclick = null;
      document.getElementById("network-popUp").style.display = "none";
    },
    cancelEdit: function(callback) {
      document.getElementById("saveButton").onclick = null;
      document.getElementById("cancelButton").onclick = null;
      document.getElementById("network-popUp").style.display = "none";
      callback(null);
    },

    saveData: function(data, callback) {
      data.id = document.getElementById("node-id").value;
      data.label = document.getElementById("node-label").value;
      document.getElementById("saveButton").onclick = null;
      document.getElementById("cancelButton").onclick = null;
      document.getElementById("network-popUp").style.display = "none";
      callback(data);
    },
    destroy: function() {
      if (this.network !== null) {
        this.network.destroy();
        this.network = null;
      }
    },
    closeMenu() {
      this.visible = false;
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>
<style scoped>
@import "../../../../public/css/vis-reset.css";

.deviceTopo {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85) !important;
  /* background: url("../../../../npage/cmdb/auto-disco/topo/1.png") fixed no-repeat;*/
  background-size: cover;
  display: flex;
  flex-direction: column;
}

header {
  padding-top: 10px;
  width: 100%;
  height: 70px;
  text-align: center;
  color: rgba(253, 255, 255, 1);
  font-weight: bolder;
  position: relative;
}

main {
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  min-width: 650px;
  flex-wrap: wrap;
}

.custom-topo-menu {
  position: absolute;
  border: 0 !important;
  border-radius: 5px;
  width: 180px;
  height: 200px;
  padding: 10px;
  box-shadow: 0 1px 4px #a5b7ff !important;
  background-color: rgba(46, 54, 56, 0.85) !important;
  color: white !important;
  z-index: 999;
}

.custom-topo-menu a {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
}

.custom-topo-menu a:hover,
.custom-topo-menu a:active {
  cursor: pointer;
  color: orange;
}
</style>
