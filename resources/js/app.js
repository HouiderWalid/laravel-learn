require('./bootstrap');
window.Vue = require('vue');
import PortalVue from 'portal-vue'
import i18n from './plugins/i18n';
import store from './store'
import router from './router/routes'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import vSelect from 'vue-select'
import FlagIcon from 'vue-flag-icon';
import RootPage from './components/root_page'
import plugins from './plugins'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faBell as faBellSolid,
    faSignOutAlt,
    faBars,
    faGlobe,
    faSyncAlt,
    faExclamation,
    faChevronDown,
    faChevronUp,
    faChevronRight,
    faUser,
    faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import {faBell as faBellRegular} from '@fortawesome/free-regular-svg-icons'
import {faFontAwesome} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} from '@fortawesome/vue-fontawesome'
import { BCarousel } from 'bootstrap-vue'

Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FlagIcon);
Vue.use(plugins)
library.add(faBellRegular, faFontAwesome, faSignOutAlt, faBars, faGlobe, faSyncAlt, faExclamation, faChevronDown, faChevronUp, faChevronRight, faUser, faShoppingCart)
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('v-select', vSelect)
Vue.component('v-root', RootPage)
Vue.component('b-carousel', BCarousel)

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    i18n,
    store,
    router,
}).$mount('#app');
