import Vue from "vue";
import App from "./App.vue";
// vuex
import router from "./router";
import store from "./store";
// element-ui
import "./plugins/element.js";
// ajax
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
