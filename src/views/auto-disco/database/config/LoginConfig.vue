<template>
  <div name="databaseLoginConfig">
    <main>
      <div id="network-popUp">
        <span id="operation">node</span> <br />
        <table style="margin:auto;">
          <tbody>
            <tr>
              <td>id</td>
              <td><input id="node-id" value="new value" /></td>
            </tr>
            <tr>
              <td>label</td>
              <td><input id="node-label" value="new value" /></td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="save" id="saveButton" />
        <input type="button" value="cancel" id="cancelButton" />
      </div>
      <br />
      <div id="mynetwork"></div>
    </main>
  </div>
</template>

<script>
/* author : admin */
require("vis-network/dist/vis-network.min.css");
var vis = require("vis-network/dist/vis-network.min.js");

export default {
  name: "LoginConfig",
  data() {
    return {
      nodes: [
        {
          id: 0,
          label: "host",
          title: "I have a popup!",
          shape: "image",
          image: "/images/databases/host-001.png",
          level: 0
        },
        {
          id: 1,
          label: "oracle-master",
          title: "I have a popup!",
          shape: "image",
          image: "/images/databases/oracle-001.png",
          level: 3
        },
        {
          id: 2,
          label: "oracle-slave",
          title: "I have a popup!",
          shape: "image",
          image: "/images/databases/oracle-002.png",
          level: 3
        },
        {
          id: 3,
          label: "mysql-master",
          title: "I have a popup!",
          shape: "image",
          image: "/images/databases/mysql-001.png",
          level: 3
        },
        {
          id: 4,
          label: "mysql-slave",
          title: "I have a popup!",
          shape: "image",
          image: "/images/databases/mysql-002.png",
          level: 3
        }
      ],
      edges: [
        {
          from: 0,
          to: 1,
          arrows: "to",
          dashes: true,
          shadow: { color: "rgb(0,255,0)" },
          arrowStrikethrough: false
        },
        {
          from: 0,
          to: 2,
          arrows: "to",
          dashes: true,
          shadow: { color: "rgb(0,255,0)" },
          arrowStrikethrough: false
        },
        {
          from: 0,
          to: 3,
          arrows: "to",
          dashes: true,
          shadow: { color: "rgb(0,255,0)" },
          arrowStrikethrough: false
        },
        {
          from: 0,
          to: 4,
          arrows: "to",
          dashes: true,
          shadow: { color: "rgb(0,255,0)" },
          arrowStrikethrough: false
        }
      ]
    };
  },
  mounted() {
    this.createVisNetwork();
  },
  methods: {
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
    destroy: function(network) {
      if (network !== null) {
        network.destroy();
        network = null;
      }
    },
    createVisNetwork() {
      var that = this;
      // create a network
      var container = document.getElementById("mynetwork");
      var data = {
        nodes: this.nodes,
        edges: this.edges
      };

      var options = {
        locale: "cn",
        edges: {
          smooth: {
            type: "cubicBezier",
            forceDirection: "horizontal",
            roundness: 0.4
          }
        },
        layout: {
          hierarchical: {
            direction: "UD"
          }
        },
        physics: false,
        interaction: { hover: true },
        manipulation: {
          addNode: function(data, callback) {
            // filling in the popup DOM elements
            document.getElementById("operation").innerHTML = "Add Node";
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
            document.getElementById("operation").innerHTML = "Edit Node";
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
            ).onclick = that.$options.methods.cancelEdit.bind(this, callback);
            document.getElementById("network-popUp").style.display = "block";
          },
          addEdge: function(data, callback) {
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
    }
  }
};
</script>

<style>
#mynetwork {
  width: 100%;
  height: 100vh;
}

table.legend_table {
  font-size: 11px;
  border-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
}

table.legend_table,
td {
  border-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
  padding: 2px;
}

div.table_content {
  width: 80px;
  text-align: center;
}

div.table_description {
  width: 100px;
}

#operation {
  font-size: 28px;
}

#network-popUp {
  display: none;
  position: absolute;
  top: 350px;
  left: 170px;
  z-index: 299;
  width: 250px;
  height: 120px;
  background-color: #f9f9f9;
  border-style: solid;
  border-width: 3px;
  border-color: #5394ed;
  padding: 10px;
  text-align: center;
}
</style>
