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

        // 移出报警
        var delOverlay = function (id) {
          // 获取ID单元
          var cell = graph.getModel().getCell(id);
          // 修改有报警物体的样式
          graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, "#CCCCCC", [cell]);
          graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, "#000000", [cell]);
          // 移除告警
          graph.removeCellOverlays(cell);
        };

        // 给物体添加报警
        var addOverlay = function (id, state) {
          // 获取ID单元
          var cell = graph.getModel().getCell(id);
          // 添加告警
          graph.addCellOverlay(cell, createOverlay(graph.warningImage, '状态: ' + state));
        };

        // 创建告警信息
        var createOverlay = function (image, tooltip) {
          //function mxCellOverlay(image,tooltip,align,verticalAlign,offset,cursor)
          //image图片，tooltip提示，align位置，verticalAlign竖直位置
          var overlay = new mxCellOverlay(image, tooltip);
          overlay.addListener(mxEvent.CLICK, function (sender, evt) {
            mxUtils.alert(tooltip);
          });
          return overlay;
        };


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

        // Enables connect preview for the default edge style
        // Specifies the default edge style
        graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
        new mxDivResizer(outline);
        new mxOutline(graph, outline);
        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();
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
        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
          var v0 = graph.insertVertex(parent, null, '<h3>SAAS</h3>', 20, 20, 1800, 400,
              'shape=swimlane;dashed=1;horizontal=0;startSize=40;fontColor=white;fillColor=none;fontSize=20;');
          var v01 = graph.insertVertex(v0, null, '节点1', 20, 40, 80, 30,
              'verticalLabelPosition=bottom;verticalAlign=top;fontColor=rgba(122, 174, 195, 1)');
          v01.lod = 1.5;
          addOverlay(v01.id, "告警");
          var v02 = graph.insertVertex(v0, null, '节点2', 200, 150, 80, 30, 'glass=1');
          v02.lod = 1.5;
          var e1 = graph.insertEdge(parent, null, '关联', v01, v02, 'dashed=1;endFill=0;spacingBottom=30;');
          e1.lod = 1.5;

          var v1 = graph.insertVertex(parent, null, '<h3>PAAS</h3>', 20, 430, 1800, 400,
              'shape=swimlane;horizontal=0;startSize=40;fillColor=none;rounded=1;arcSize=2;dashed=1;strokeWidth=3;strokeColor=#e75c59;fontColor=white;fontSize=18;');

          var v2 = graph.insertVertex(parent, null, '<h3>IAAS</h3>', 20, 840, 1800, 400,
              'shape=swimlane;elbow=vertical;horizontal=0;verticalAlign=middle;startSize=40;fillColor=none;rounded=1;arcSize=2;dashed=1;strokeWidth=2;strokeColor=#6cae3e;fontColor=white;fontSize=18;');

          graph.insertEdge(parent, null, '关联', v1, v2, 'startArrow=block;startSize=12;endArrow=block;strokeColor=white;fontColor=white;startFill=1;endFill=1;spacingBottom=30;sourcePerimeterSpacing=2;targetPerimeterSpacing=2');
        } finally {
          // Updates the display
          graph.getModel().endUpdate();
        }


        var encoder = new mxCodec();
        var node = encoder.encode(graph.getModel());
        console.log(mxUtils.getPrettyXml(node));

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
      if (cell != null) {
        //获取所有被选择的元素
        menu.addItem('设备基础信息', null, function () {
          mxUtils.alert('MenuItem1');
        });
      } else {

      }
      menu.addSeparator();
      var submenu1 = menu.addItem('位置', null, null);
      menu.addSeparator();
      menu.addItem('居中展示', null, function () {
        graph.fit();//自适应
        graph.center(true, true, 0.5, 0.5);//将画布放到容器中间
      }, submenu1);
      menu.addItem('位置重置', null, function () {
        //  mxUtils.alert('MenuItem3: ' + graph.getSelectionCount() + ' selected');
        graph.zoomActual();
        graph.zoomFactor = 1.2;
      }, submenu1);
    }
  }
};
</script>

<style scoped>
@import "../../../../../public/mxgraph/css/common.css";
@import "../../../../../public/mxgraph/css/explorer.css";

article {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>