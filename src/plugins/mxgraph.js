import mx from 'mxgraph';
const mxgraph = mx({
    mxImageBasePath: '/mxgraph/images',
    mxBasePath: '/mxgraph'
});
// decode bug https://github.com/jgraph/mxgraph/issues/49
window.mxGraph = mxgraph.mxGraph;
window.mxGraphModel = mxgraph.mxGraphModel;
window.mxEditor = mxgraph.mxEditor;
window.mxGeometry = mxgraph.mxGeometry;
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler;
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu;
window.mxStylesheet = mxgraph.mxStylesheet;
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar;
window.mxEvent = mxgraph.mxEvent;
window.mxDivResizer = mxgraph.mxDivResizer;
window.mxOutline = mxgraph.mxOutline;
window.mxCellOverlay = mxgraph.mxCellOverlay;
window.mxGraphHandler = mxgraph.mxGraphHandler;
window.mxGraphModel = mxgraph.mxGraphModel;
export default mxgraph;