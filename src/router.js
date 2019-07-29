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
    {
      path: "/",
      name: "vue",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      children: [
        {
          path: "/",
          component: () => import("./views/Home.vue")
        },
        {
          path: "login",
          component: () => import("./views/login/Login.vue")
        },
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
      path: "/firstPage",
      name: "firstPage",
      component: () => import("./views/first/FirstPage.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register/Register.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
