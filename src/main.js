import Vue from 'vue'
import VueiClient from '@supermap/vue-iclient-mapboxgl'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/httpConfig'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueiClient, {
  theme: 'dark'
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')