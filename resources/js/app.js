require('./bootstrap');
window.Vue = require('vue');
import PortalVue from 'portal-vue'
import i18n from './plugins/i18n';
import store from './store'
import router from './router/routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'
import FlagIcon from 'vue-flag-icon';
import RootPage from './components/root_page'
import plugins from './plugins'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FlagIcon);
Vue.use(plugins)
library.add(faUserSecret)
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('v-select', vSelect)
Vue.component('v-root', RootPage)

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    i18n,
    store,
    router,
}).$mount('#app');
