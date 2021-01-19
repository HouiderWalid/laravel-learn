import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({ userModule: state.userModule })
});

const plugins = [
    vuexLocal.plugin
];

export default new Vuex.Store({
    modules: {
        userModule
    },
    plugins: plugins
})
