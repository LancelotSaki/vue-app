import Vue from "vue";
import App from "./App.vue";
// animate.css
import animate from "animate.css";
// vuex
import router from "./router";
import store from "./store";
// element-ui
import "./plugins/element.js";
// ajax
import axios from "axios";
import VueAxios from "vue-axios";
import echarts from "echarts";
var VueDragula = require("vue-dragula");
Vue.use(VueDragula);
Vue.use(animate);
Vue.prototype.$echarts = echarts;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
