import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
/* TODO 注意要点:
   1. 子路由(children)不要使用斜杠, 非子路由存在子路由时必须加上<router-view></router-view>标签;
   2. 新版h5的history模式路由在测试环境、生产环境必须配合nginx才能使用,
      如果对url要求不高或无强迫症患者使用hash模式即可，两者使用起来差别不是很大；
   3. 推荐使用懒加载配置对应的模块加载，下面的路由便是样板；
   4.
 */
export default new Router({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    /*{
      path: "/",
      name: "vue",
      redirect: "/register"
    },*/
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/Home.vue"),
      children: [
        {
          path: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/about/About.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/Login.vue")
    },
    {
      path: "/firstPage",
      name: "firstPage",
      component: () => import("./views/first/FirstPage.vue")
    },
    {
      path: "/register",
      name: "register",
      // 这个只是个容器，实际上children才起实际作用
      component: () => import("./views/register/index.vue"),
      children: [
        {
          // 进到register渲染该组件
          path: "/",
          component: () => import("./views/register/core/Register.vue")
        },
        {
          path: "agreement1",
          component: () => import("./views/register/agreement/Agreement1.vue")
        },
        {
          path: "agreement2",
          component: () => import("./views/register/agreement/Agreement2.vue")
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/profile/Profile.vue")
    },
    {
      path: "/auto-find/database/config/loginConfig",
      name: "databaseLoginConfig",
      component: () =>
        import("./views/auto-find/database/config/LoginConfig.vue")
    },
    {
      path: "/auto-find/result/show",
      name: "AutoFindResultShow",
      component: () => import("./views/auto-find/result/Show.vue")
    },
    {
      path: "/auto-find/topo",
      name: "AutoFindTopo",
      component: () => import("./views/auto-find/topo/Topo.vue")
    },
    {
      path: "/es",
      name: "ES",
      component: () => import("./views/es/Es.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
