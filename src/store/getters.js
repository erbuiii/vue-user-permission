const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    roles: state => state.user.roles,
    avatar: state => state.user.avatar,
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
}

export default getters