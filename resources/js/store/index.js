import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const dataState = createPersistedState({
    key: 'auth-project-storage',
    paths: ['userStorage.user']
})

export default new Vuex.Store({
    modules: {
        userStorage: userModule
    },
    plugins: [dataState]
})
