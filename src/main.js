import Vue from 'vue'
import VueiClient from '@supermap/vue-iclient-mapboxgl'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/httpConfig'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false
    // Vue.use(ElementUI)
Vue.prototype.VueiClient = VueiClient
Vue.use(VueiClient, {
    theme: 'dark'
})
window.a = new VueiClient.commontypes.FillStyle({
    "fill-opacity": 0.8,
    "fill-color": "#0D1F49",
    "fill-translate": [0, 0],
    "fill-antialias": true,
    "fill-outline-color": "#0D1F49",
    "fill-translate-anchor": "map",
}, {
    visibility: "visible",
})
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')