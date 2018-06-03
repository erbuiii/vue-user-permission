/* 
    当用户登录后，获取role，将role和路由便的每个页面所需权限作比较
    调用router.addRoutes(store.getter.addRouters)添加用户可访问的路由
    生成最终用户可访问的路由表。路由表存在vuex内
*/
import router from './router'
import store from "./store"
import { Message } from "element-ui";
import { getToken } from "./utils/auth";

//不重定向白名单
const whiteList = ['/login', 'authredirect']

//对白名单以外的跳转进行拦截然后跳转登录，同时判断用户权限，是否登录等
router.beforeEach((to, from, next) => {
    //判断是否有token
    if (getToken()) {
        if(to.path === '/login') {
            next()
        } else {
            //判断当前用户是否已拉取完user_info信息
            if (store.getters.roles.length === 0) {

                //拉取用户信息
                store.dispatch('GetInfo').then(res => {
                    const roles = res.data.res;     //roles必须是数组

                    //根据roles权限生成可访问的路由表
                    store.dispatch('GenerateRoutes', {roles}).then(() => {
                        //动态添加可访问路由表
                        router.addRoutes(store.getters.addRoutes);

                        //hack方法，确保addRoutes已完成 -->
                        //在router.addRoutes之后的next()可能会失效，因为可能next()的时候路由并没有完全add完成
                        //设置replace为true：导航不会留下历史记录？？
                        next({...to, replace: true})
                    })
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error('验证失败，请重新登录');
                        next({
                            path: '/login'
                        })
                    })
                })
            } else {
                //store.getters.roles.length === 1
                //当有用户权限的时候，说明所有可访问路由已生成
                //如果访问没有权限的页面会自动进入404页面
                next()
            }
        }
    } else {
        if(whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})