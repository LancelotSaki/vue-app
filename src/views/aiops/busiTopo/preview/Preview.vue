<template>
  <article>
    <div id="graphContainer"
         style="position:relative;overflow:hidden;flex:1;background:url('/images/background/earth.jpg');cursor:default;">
    </div>
    <!-- Creates a container for the outline -->
    <div id="outlineContainer"
         style="z-index:1;position:fixed;overflow:hidden;top:5px;right:5px;width:200px;height:150px;background:transparent;border-style:solid;border-color:lightgray;">
    </div>
  </article>
</template>
<script>
import mxgraph from '../../../../plugins/mxgraph';

const {
  mxGraph,
  mxGraphModel,
  mxClient,
  mxCodec,
  mxUtils,
  mxConstants,
  mxPerimeter,
  mxEvent,
  mxDivResizer,
  mxOutline,
  mxCellOverlay
} = mxgraph;
export default {
  name: "about",
  mounted() {
    this.createBusinessTopo(document.getElementById('graphContainer'));
  },
  methods: {
    createBusinessTopo(container) {
      // Checks if the browser is supported
      if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      } else {
        var outline = document.getElementById('outlineContainer');

        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);
        // Creates the graph inside the given container
        var graph = new mxGraph(container);


        graph.getCursorForCell = function (cell) {
          if (cell != null && cell.value != null && cell.vertex == 1) {
            return 'pointer'
          }
        }
        // label不可编辑
        graph.setCellsEditable(false);
        // 开启提示
        graph.setTooltips(true);
        //节点不可改变大小
        graph.setCellsResizable(false);
        // Label 将显示 Html 格式的 Value
        graph.setHtmlLabels(true);
        //允许移动背景
        graph.panningHandler.ignoreCell = true;
        graph.setPanning(true);
        //不可选中
        graph.clearSelection();
        // Enables connect preview for the default edge style
        // Specifies the default edge style
        // 定义字体默认颜色
        graph.getStylesheet().getDefaultVertexStyle()[mxConstants.STYLE_FONTCOLOR] = 'rgba(255, 255, 255, 1)';
        // 定义节点文字在图标下面
        graph.getStylesheet().getDefaultVertexStyle()['verticalLabelPosition'] = "bottom";
        graph.getStylesheet().getDefaultVertexStyle()['verticalAlign'] = "center";
        graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
        graph.getStylesheet().getDefaultEdgeStyle()['dashed'] = 1;
        new mxDivResizer(outline);
        new mxOutline(graph, outline);
        graph.isCellVisible = function (cell) {
          return cell.lod == null || cell.lod <= this.view.scale;
        };
        // 展开变换容器方向
        graph.model.getStyle = function (cell) {
          var style = mxGraphModel.prototype.getStyle.apply(this, arguments);
          if (graph.isCellCollapsed(cell)) {
            if (style != null) {
              style += ';';
            } else {
              style = '';
            }
            style += 'horizontal=1;align=left;spacingLeft=14;';
          }
          return style;
        };

        this.loadNode(graph);

        // 缩放
        mxEvent.addMouseWheelListener(function (evt, up) {
          if (up) {
            graph.zoomIn();
          } else {
            graph.zoomOut();
          }
          mxEvent.consume(evt);
        });


        // Installs a popupmenu handler using local function (see below).
        graph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
          return this.createPopupMenu(graph, menu, cell, evt);
        };
      }
    },
    createPopupMenu(graph, menu, cell, evt) {
      // menu.addSeparator();
      if (cell != null) {
        //获取所有被选择的元素
        menu.addItem('设备基础信息', null, function () {
          mxUtils.alert('MenuItem1');
        });
        //   menu.addSeparator();
        menu.addItem('下钻查看子节点', null,  () => {
          //  mxUtils.alert('下钻查看子节点');
          this.lookUpSubNode(graph);
        });
        //   menu.addSeparator();
      }
      var submenu1 = menu.addItem('位置', null, null);
      //  menu.addSeparator();
      menu.addItem('居中展示', null, function () {
        graph.fit();//自适应
        graph.center(true, true, 0.5, 0.5);//将画布放到容器中间
      }, submenu1);
      menu.addItem('位置重置', null, function () {
        //  mxUtils.alert('MenuItem3: ' + graph.getSelectionCount() + ' selected');
        graph.zoomActual();
        graph.zoomFactor = 1.2;
      }, submenu1);
      menu.addItem('查看节点数据集', null, function () {
        // 查看数据
        var encoder = new mxCodec();
        var node = encoder.encode(graph.getModel());
        console.log(mxUtils.getPrettyXml(node));
      });
    },
    // 给物体添加报警
    addOverlay(graph, id, state) {
      // 获取ID单元
      var cell = graph.getModel().getCell(id);
      // 修改有报警物体的样式
   //   graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, "#FF0000", [cell]);
   //   graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, "#FFFFFF", [cell]);
      // 添加告警
      graph.addCellOverlay(cell, this.createOverlay(graph.warningImage, '状态: ' + state));
    },

    // 创建告警信息
    createOverlay (image, tooltip) {
      //function mxCellOverlay(image,tooltip,align,verticalAlign,offset,cursor)
      //image图片，tooltip提示，align位置，verticalAlign竖直位置
      var overlay = new mxCellOverlay(image, tooltip);
      overlay.addListener(mxEvent.CLICK, function (sender, evt) {
        mxUtils.alert(tooltip);
      });
      return overlay;
    },
    // 移除报警
    delOverlay(graph, id){
      // 获取ID单元
      var cell = graph.getModel().getCell(id);
      // 修改有报警物体的样式
     /// graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, "#CCCCCC", [cell]);
      //graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, "#000000", [cell]);
      // 移除告警
      graph.removeCellOverlays(cell);
    },
    loadNode(graph) {
      // Adds cells to the model in a single step

      graph.getModel().beginUpdate();
      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).

      try {
        graph.getModel().setRoot(graph.getModel().createRoot());
        var parent = graph.getDefaultParent();
        var container1 = graph.insertVertex(parent, null, '<h3>SAAS</h3>', 20, 20, 2000, 500,
            'shape=swimlane;dashed=1;verticalLabelPosition=middle;horizontal=0;startSize=40;fontColor=white;fillColor=none;fontSize=20;');
        // graph.removeSelectionCell(graph.getModel().getCell(container1.id));
        var container2 = graph.insertVertex(parent, null, '<h3>PAAS</h3>', 20, 530, 2000, 500,
            'shape=swimlane;horizontal=0;verticalLabelPosition=middle;startSize=40;fillColor=none;rounded=1;arcSize=2;dashed=1;strokeWidth=3;strokeColor=#e75c59;fontColor=white;fontSize=18;');
        var container3 = graph.insertVertex(parent, null, '<h3>IAAS</h3>', 20, 1060, 2000, 500,
            'shape=swimlane;elbow=vertical;verticalLabelPosition=middle;horizontal=0;verticalAlign=middle;startSize=40;fillColor=none;rounded=1;arcSize=2;dashed=1;strokeWidth=2;strokeColor=#6cae3e;fontColor=white;fontSize=18;');

        var v01 = graph.insertVertex(container1, null, 'CRM业务系统', 800, 40, 80, 30,
            'verticalAlign=top;fontColor=rgba(122, 174, 195, 1);imageWidth=150;imageHeight=150;image=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAdEAIAAABvSOdfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABgAAAAYADwa0LPAAAAB3RJTUUH5QgaCBwBGurg2AAAA6dJREFUWMO1l01vE1cUht9zx4499tjYJpZgESKQkPgQ4lMikdoNRBZSVqRLpJQWtb8AED+AH0AjNiwjPrKjFbBLCxJCCCTcKgKJDQLBAtQkDrYTeyb2+L5d3LR1guOMP3h3M3Pn3GfOvee9Z4QkSXwFffoE+P7bt2StNjoqEosptfVboX5Nbz7q6VOyWv3tV+py+f0HSL2eTIJKjYyIFYsFidMHoLk50vPu3KEuFd+9g9TqAAQIhUDBxYvKGhy0rKDRugSqVgGtp6fJ4udHj8hK1UA068IFUenMvn1AJBI8csdAr18Dq6tTU1oXFgsFoKG/HHPwIBiJnD4tKh7vNH4HQM+fk6479QtZWKz7QKtKUAoEzp9XVjrdKUoHQPfvk8vLt25RFz+TkI2L87/GxkQ5zvAwEA5/FSCDcvMmWSwC7VAEIDA+LiqR6A7FaFNnyOdJ1719m7pYDBLo6DER2965Ewj1VLktgD5+BHz/2jWyUNB685ys16lTkM638BZAxtxu3NB6aWl19d/rrTQwAAgOHxaJRvsM9PAhWamYwg4e4ugRQdSORAAJmM0AQL4PkHfvUpdLwV9OOKBSE9+JSiZ7gdBNXra2AZ88IavVhQWI32geumsXGA4fPy7Kjg4PA+GBTEbEsrZtAyxrxw4gFOouL/PzgO9PT5PFYj5P7bozM8oaGloD+uN36koFgAAnT4rY9sSESDK5e7fZI72qVgPIly9Jz3v8GKhWX7wg3Wq9DhCHDomKRs2HrQGNjIqy7cnvRVKpvXu7hzBT/vUn4Hl/zwN+fXGRutH48B6o+w0NaVUoZ84AjrNuycbHRXozNFMKV69SL8xvcPM2S7pnDzAwcOKEiG2bOwFapmCanaVeWWl/sDRLBAQnJ5VKpZp3YR+A6nWAzOcJzw3+Vi4nykkcOLCxOekD0LNnpOu6LqADGenQEBgOnTsnkkp9+bQPQA8eUC+Xg4x0HFDJpUvKGsxGo62NtCegV69Iz/uvbW0j4+MGxbjXZiO7PJlN8Zo+Gm3ryLYBkStXlMpm9+/fup3tEmh2llxZefOmXW62bwctdfmysgazwQ22Y6BSCWg0ZmbI0qan3rffCGL2Dz+Klc44DhDkf6wLIHMEXr9OvbRUqaw/EoF0CrDUTz+LpDPNRtepOgAyWZmbIzzP3DH7I5cTSSTOnhVJJGKxzvLRJZDJx7171OVSNguEQmNjouJOLifiOPF4rxDNkiD/9ua5wTLT96MVa61/ANvKkx4pVXg7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA4LTI2VDA4OjI3OjU4KzAwOjAwDgTXQgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wOC0yNlQwODoyNzo1OCswMDowMH9Zb/4AAAAASUVORK5CYII=');

        this.addOverlay(graph, v01.id, "告警");
        var v02 = graph.insertVertex(container1, null, 'CBOSS系统', 200, 150, 80, 30, 'glass=1');
        v02.lod = 1.2;
        var e0102 = graph.insertEdge(parent, null, '', v01, v02, 'dashed=1;endFill=0;spacingBottom=30;');
        e0102.lod =1.2;

        var v03 = graph.insertVertex(container1, null, '营业厅WEB', 600, 150, 80, 30, 'glass=1');
        v03.lod = 1.2;
        var e0103 = graph.insertEdge(parent, null, '', v01, v03, 'dashed=1;endFill=0;spacingBottom=30;');
        e0103.lod = 1.2;

        var v04 = graph.insertVertex(container1, null, '营业APP', 100, 150, 80, 30, 'glass=1');
        v04.lod = 1.2;
        var e0104 = graph.insertEdge(parent, null, '', v01, v04, 'dashed=1;endFill=0;spacingBottom=30;');
        e0104.lod = 1.2;

        var v05 = graph.insertVertex(container1, null, 'CRM-DNS', 1500, 150, 80, 30, 'glass=1');
        v05.lod = 1.2;
        var e0105 = graph.insertEdge(parent, null, '', v01, v05, 'dashed=1;endFill=0;spacingBottom=30;');
        e0105.lod = 1.2;

        var room_1 = graph.insertVertex(container3, null, '五象生产楼4楼机房', 600, 400, 80, 30, 'glass=1');
        var room_2 = graph.insertVertex(container3, null, '五象中心区机房', 1500, 400, 80, 30, 'glass=1');

        var rack_1 = graph.insertVertex(container3, null, 'A01', 300, 300, 80, 30, 'glass=1');
        rack_1.lod = 1.1;
        var rack_2 = graph.insertVertex(container3, null, 'A02', 600, 300, 80, 30, 'glass=1');
        rack_2.lod = 1.1;
        var rack_3 = graph.insertVertex(container3, null, 'A03', 900, 300, 80, 30, 'glass=1');
        rack_3.lod = 1.1;
        var room_rack_11 = graph.insertEdge(parent, null, '装载了', room_1, rack_1, 'dashed=1;endFill=0;spacingBottom=30;');
        room_rack_11.lod = 1.1;
        var room_rack_12 = graph.insertEdge(parent, null, '装载了', room_1, rack_2, 'dashed=1;endFill=0;spacingBottom=30;');
        room_rack_12.lod = 1.1;
        var room_rack_13 = graph.insertEdge(parent, null, '装载了', room_1, rack_3, 'dashed=1;endFill=0;spacingBottom=30;');
        room_rack_13.lod = 1.1;

        var pc_1 = graph.insertVertex(container3, null, '物理机_10.239.134.100', 100, 200, 80, 30, 'glass=1');
        var pc_2 = graph.insertVertex(container3, null, '物理机_10.239.134.101', 200, 200, 80, 30, 'glass=1');
        var pc_3 = graph.insertVertex(container3, null, '物理机_10.239.134.102', 300, 200, 80, 30, 'glass=1');
        var pc_4 = graph.insertVertex(container3, null, '物理机_10.239.134.103', 400, 200, 80, 30, 'glass=1');

        pc_1.lod = 1.2;
        pc_2.lod = 1.2;
        pc_3.lod = 1.2;
        pc_4.lod = 1.2;

        var rack_pc_11 = graph.insertEdge(container3, null, '放置着', rack_1, pc_1, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_11.lod = 1.2;

        var rack_pc_12 = graph.insertEdge(container3, null, '放置着', rack_1, pc_2, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_12.lod = 1.2;

        var rack_pc_13 = graph.insertEdge(container3, null, '放置着', rack_1, pc_3, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_13.lod = 1.2;

        var rack_pc_14 = graph.insertEdge(container3, null, '放置着', rack_1, pc_4, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_14.lod = 1.2;

        var pc_5 = graph.insertVertex(container3, null, '物理机_10.239.134.104', 800, 200, 80, 30, 'glass=1');
        var pc_6 = graph.insertVertex(container3, null, '物理机_10.239.134.105', 900, 200, 80, 30, 'glass=1');

        pc_5.lod = 1.2;
        pc_6.lod = 1.2;
        var rack_pc_35 = graph.insertEdge(container3, null, '放置着', rack_3, pc_5, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_35.lod = 1.2;
        var rack_pc_36 = graph.insertEdge(container3, null, '放置着', rack_3, pc_6, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_36.lod = 1.2;
        var rack_4 = graph.insertVertex(container3, null, 'A01', 1200, 300, 80, 30, 'glass=1');
        rack_4.lod = 1.2;
        var rack_5 = graph.insertVertex(container3, null, 'A02', 1500, 300, 80, 30, 'glass=1');
        rack_5.lod = 1.2;
        var rack_6 = graph.insertVertex(container3, null, 'A03', 1800, 300, 80, 30, 'glass=1');
        rack_6.lod = 1.2;
        var room_rack_24 = graph.insertEdge(parent, null, '装载了', room_2, rack_4, 'dashed=1;endFill=0;spacingBottom=30;');
        room_rack_24.lod = 1.2;
        var room_rack_25 = graph.insertEdge(parent, null, '装载了', room_2, rack_5, 'dashed=1;endFill=0;spacingBottom=30;');
        room_rack_25.lod = 1.2;
        var room_rack_26 = graph.insertEdge(parent, null, '装载了', room_2, rack_6, 'dashed=1;endFill=0;spacingBottom=30;');
        room_rack_26.lod = 1.2;

        var pc_7 = graph.insertVertex(container3, null, '物理机_10.239.134.115', 1500, 200, 80, 30, 'glass=1');
        var pc_8 = graph.insertVertex(container3, null, '物理机_10.239.134.116', 1800, 200, 80, 30, 'glass=1');
        pc_7.lod = 1.2;
        pc_8.lod = 1.2;
        var rack_pc_17 = graph.insertEdge(container3, null, '放置着', rack_5, pc_7, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_17.lod = 1.2;
        var rack_pc_38 = graph.insertEdge(container3, null, '放置着', rack_6, pc_8, 'dashed=1;endFill=0;spacingBottom=30;');
        rack_pc_38.lod = 1.2;

        var vm_1 = graph.insertVertex(container3, null, '虚拟机_10.239.11.188', 1500, 100, 80, 30, 'glass=1');
        vm_1.lod = 1.2;
        var pm_vm_71 = graph.insertEdge(container3, null, '安装着', pc_7, vm_1, 'dashed=1;endFill=0;spacingBottom=30;');
        pm_vm_71.lod = 1.2;

        var mid_1 = graph.insertVertex(container2, null, 'TOMCAT_10.239.11.188:10000', 1300, 250, 80, 30, 'glass=1');
        mid_1.lod = 1.2;
        var vm_mid_11 = graph.insertEdge(container2, null, '安装着', vm_1, mid_1, 'dashed=1;endFill=0;spacingBottom=30;');
        vm_mid_11.lod = 1.2;
        var mid_2 = graph.insertVertex(container2, null, 'nginx_10.239.11.188:80', 1500, 250, 80, 30, 'glass=1');
        mid_2.lod = 1.2;
        var vm_mid_12 = graph.insertEdge(container2, null, '安装着', vm_1, mid_2, 'dashed=1;endFill=0;spacingBottom=30;');
        vm_mid_12.lod = 1.2;
        var mid_3 = graph.insertVertex(container2, null, 'springBoot_10.239.11.188:8080', 1700, 250, 80, 30, 'glass=1');
        mid_3.lod = 1.2;
        var vm_mid_13 = graph.insertEdge(container2, null, '安装着', vm_1, mid_3, 'dashed=1;endFill=0;spacingBottom=30;');
        vm_mid_13.lod = 1.2;

        var busi_mid_1 = graph.insertEdge(container2, null, '安装着', v05, mid_1, 'dashed=1;endFill=0;spacingBottom=30;');
        busi_mid_1.lod = 1.2;
        var busi_mid_2 = graph.insertEdge(container2, null, '安装着', v05, mid_2, 'dashed=1;endFill=0;spacingBottom=30;');
        busi_mid_2.lod = 1.2;
        var busi_mid_3 = graph.insertEdge(container2, null, '安装着', v05, mid_3, 'dashed=1;endFill=0;spacingBottom=30;');
        busi_mid_3.lod = 1.2;
        // graph.insertEdge(parent, null, '关联', container2, container3, 'startArrow=block;startSize=12;endArrow=block;strokeColor=white;fontColor=white;startFill=1;endFill=1;spacingBottom=30;sourcePerimeterSpacing=2;targetPerimeterSpacing=2');
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
    },
    lookUpSubNode(graph) {
      // Adds cells to the model in a single step
      graph.getModel().beginUpdate();
      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      try {
        graph.getModel().setRoot(graph.getModel().createRoot());

        var xml = '<mxGraphModel>\n' +
            '  <root>\n' +
            '    <mxCell id="0" />\n' +
            '    <mxCell id="1" parent="0" />\n' +
            '    <mxCell id="pm" value="物理机_10.239.134.104" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="610" y="80" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="vm" value="虚拟机" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="610" y="170" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="vm_1" value="虚拟机_10.239.134.107" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="610" y="280" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="vm_2" value="虚拟机_10.239.134.109" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="940" y="280" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="fs" value="文件系统" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1840" y="390" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="fs_1" value="/root/cmdb/jar" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1980" y="520" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="fs_2" value="/usr/cmdb/jar" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1730" y="530" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="mid" value="组件" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="940" y="400" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="mid_1" value="NGINX_10.239.134.109:80" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1060" y="530" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="mid_2" value="NGINX_10.239.134.109:10086" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="810" y="530" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="db" value="数据库" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1390" y="400" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="db_1" value="ORACLE_10.239.134.109:1521" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1290" y="530" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>\n' +
            '    <mxCell id="db_2" value="ORACLE_10.239.134.109:1536" style="glass=1" vertex="1" parent="1">\n' +
            '      <mxGeometry x="1510" y="530" width="80" height="30" as="geometry" />\n' +
            '    </mxCell>' +
            '<mxCell id="link_1" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="pm" target="vm">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_2" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="vm" target="vm_1">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_3" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="vm" target="vm_2">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_4" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="vm_2" target="fs">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_5" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="vm_2" target="mid">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_6" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="vm_2" target="db">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_11" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="fs" target="fs_1">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_12" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="fs" target="fs_2">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_13" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="mid" target="mid_1">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_14" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="mid" target="mid_2">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_15" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="db" target="db_1">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '<mxCell id="link_16" value="安装了" style="dashed=1;endFill=0;spacingBottom=30;" edge="1" parent="1" source="db" target="db_2">\n' +
            '      <mxGeometry relative="1" as="geometry" />\n' +
            '    </mxCell>\n' +
            '  </root>\n' +
            '</mxGraphModel>'
        var doc = mxUtils.parseXml(xml);
        var codec = new mxCodec(doc);
        codec.decode(doc.documentElement, graph.getModel());
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
    }
  }
};
</script>

<style scoped>
@import "../../../../../public/mxgraph/css/common.css";
@import "../../../../../public/mxgraph/css/explorer.css";
@import "../../../../../public/mxgraph/css/menu-reset.css";
article {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>