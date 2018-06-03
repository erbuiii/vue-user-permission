//声明权限为admin的路由 --> 异步挂载
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//导出

//创建vue实例时，将vue-router挂载，此时挂载的是：登录或无需权限的公有页面
//公有路由
export const constantRouterMap = [
  //路由懒加载：只有当路由访问的时候才加载对应的组件
  //这样可以更加高效，而不会打包出一个巨大的入口文件
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '登录页面',
    component: resolve => require(['../views/login/Login.vue'], resolve),
    hidden: true,
  },
  {
    path: '/Readme',
    //name: 'ReadmeHome',
    index: 'Readme',  //？

    //路由元信息
    meta: {           
      title: 'Readme',
      icon: 'el-icon-menu'
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/',
        name: 'Readme',
        meta: {
          title: 'Readme',
          icon: 'el-icon-menu'
        },
        component: resolve => require(['../components/page/Readme.vue'], resolve),
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

//异步挂载的路由asyncRouteMap
//需要根据权限加载的动态路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    // name: 'permissionhome',
     //路由元信息：通过meta标签来表示该页面能访问的权限有哪些 --> role字段
    meta: {
      title: 'permission',
      icon: 'el-icon-setting',
      roles : ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: 'permission',
        path: '/permission',
        meta: {
          title: 'permission',
          icon: 'el-icon-menu',
          roles: ['admin']
        },
        component: resolve => require(['../components/page/permission.vue'], resolve),
      }
    ]
  },

  /*
    404页面一定要在最后加载，如果放在constantRouterMap里一同声明，
    后面的所有页面都会被拦截到404
  */
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
