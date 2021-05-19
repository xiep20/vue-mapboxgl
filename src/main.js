import Vue from 'vue'
import VueiClient from '@supermap/vue-iclient-mapboxgl'
import * as echarts from 'echarts';
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
Vue.prototype.$echarts = echarts
window.echarts = echarts
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')