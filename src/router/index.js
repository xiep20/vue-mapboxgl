import Vue from 'vue'
import VueRouter from 'vue-router'
import MapIndex from '@/views/MapIndex.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'MapIndex',
  component: MapIndex
}]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router