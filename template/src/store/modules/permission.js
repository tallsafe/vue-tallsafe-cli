import {constantRouterMap } from '@/router'
import router from '@/router'
import vue from 'vue'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes constantRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const permission = {
  state: {
    headRouters: [],
    sideRouters:[],
    addRouters:[]
  },
  mutations: {
    SET_ROUTERS: (state, data) => {
      let path = window.location.hash
      if(!Window.config.isWebGetMenu){
        for(let el of constantRouterMap){
          if(el.isHome){
            state.headRouters = el.children;
            for(let child of el.children){
              if(child.path==='/'+path.split('/')[1]){
                state.sideRouters = child.children;
              }
            }
          }
        }
      }else{
        state.headRouters = data;
        let path = window.location.hash;
        for(let child of data){
          if(child.path==='/'+path.split('/')[1]){
            state.sideRouters = child.children;
          }
        }
      }
      // state.addRouters = routers
      // state.routers = constantRouterMap.concat(routers)
    },
    SET_SideRouters:(state,data)=>{
      state.sideRouters = data;
    }
  },
  actions: {
    GenerateSideRouters({ commit, state },data){
      for(let el of state.headRouters){
        if(el.path===data){
          if(!el.hasOwnProperty('children')){
            el.children = [];
          }
          commit('SET_SideRouters', el.children);
          break;
        }
      }
    },
    GenerateRoutes({ commit }, data) {
      if(!Window.config.isWebGetMenu){
        return new Promise(resolve => {
          const {roles} = data;
          let accessedRouters
          if (roles.includes('admin')) {
            accessedRouters = constantRouterMap
          } else {
            accessedRouters = filterAsyncRouter(constantRouterMap, roles)
          }
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      }
    },
    WebGetRoute({ commit }, data){
      data = filterAsyncRouter(data.route,data.role)
      commit('SET_ROUTERS', data)
    }
  }
}

export default permission
