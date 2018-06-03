/**
 * 通过用户的权限和之前在router.js里面的asyncRouterMap的每一个页面所需要的权限做匹配
 * 最后返回一个该用户能访问的路由有哪些
 */
import { asyncRouterMap, constantRouterMap } from "@/router";
import { resolve } from "uri-js";

/** 
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
*/

function hasPermission(roles, route) {
    if(route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/** 
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
*/
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return false
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTWES: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
            console.log('state.routers', state.routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters
                if (roles.indexOf('admin') >= 0) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission