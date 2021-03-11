import Vue from "vue";
import Router from "vue-router";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
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
      component: () => import("./views/home/Home.vue"),
      children: [
        {
          path: "",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/echarts/cmdb/resources/Host.vue")
        },
        {
          path: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/about/About.vue")
        },
        {
          path: "device/topo",
          component: () => import("./views/cmdb/device-topo/Topo.vue")
        },
        {
          path: "ai",
          component: () => import("./views/cmdb/ai/Ai.vue")
        },
        {
          path: "es",
          component: () => import("./views/es/Es.vue")
        },
        {
          path: "guide",
          component: () => import("./views/cmdb/guide/Guide.vue")
        },
        {
          path: "deploy",
          component: () => import("./views/cmdb/deploy/Deploy.vue")
        },
        {
          path: "model/create",
          component: () => import("./views/cmdb/model/create/Create.vue")
        },
        {
          path: "auto-disco/compare/guide",
          component: () => import("./views/auto-disco/deploy/Deploy.vue")
        },
        {
          path: "auto-disco/topo",
          component: () => import("./views/auto-disco/topo/Topo.vue")
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
      component: () => import("./views/register/Register.vue"),
      children: [
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
      path: "/cmdb",
      name: "cmdb",
      component: () => import("./views/cmdb/Cmdb.vue"),
      children: [
        {
          path: "topo",
          component: () => import("./views/cmdb/device-topo/Topo.vue")
        },
        {
          path: "ai",
          component: () => import("./views/cmdb/ai/Ai.vue")
        },
        {
          path: "es",
          component: () => import("./views/es/Es.vue")
        },
        {
          path: "guide",
          component: () => import("./views/cmdb/guide/Guide.vue")
        },
        {
          path: "deploy",
          component: () => import("./views/cmdb/deploy/Deploy.vue")
        },
        {
          path: "model/create",
          component: () => import("./views/cmdb/model/create/Create.vue")
        }
      ]
    },
    {
      path: "/auto-disco",
      name: "auto-disco",
      component: () => import("./views/auto-disco/Index.vue"),
      children: [
        {
          path: "database/config/loginConfig",
          component: () =>
            import("./views/auto-disco/database/config/LoginConfig.vue")
        },
        {
          path: "result/show",
          component: () => import("./views/auto-disco/result/Show.vue")
        },
        {
          path: "compare/config/show",
          component: () => import("./views/auto-disco/compare/config/Show.vue")
        },
        {
          path: "topo",
          component: () => import("./views/auto-disco/topo/Topo.vue")
        },
        {
          path: "topo/all-network",
          component: () => import("./views/auto-disco/all-topo/Topo.vue")
        }
      ]
    },
    {
      path: "/es",
      name: "ES",
      component: () => import("./views/es/Es.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/profile/Profile.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
