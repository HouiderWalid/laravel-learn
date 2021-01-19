function checkAuth({ store, next }){
    if (!store.getters.getAuth) {
        return next({path: '/login'})
    }
}

function preventAuth({ store, next }){
    if (store.getters.getAuth) {
        return next({path: '/'})
    }
}

function middlewarePipeline(context, middlewares, next){

}

export {
    checkAuth,
    preventAuth
}
