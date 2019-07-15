const getters = {
  sidebar: state => state.app.sidebar,
  sidebar_opened:state => state.app.sidebar.opened,
  nowHeaderName:state => state.app.nowHeaderName,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.headRouters,
  permission_sideRouters: state => state.permission.sideRouters,
  addRouters: state => state.permission.addRouters,
  skin:state=>state.app.skin
}
export default getters
