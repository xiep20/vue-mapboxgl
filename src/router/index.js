import Vue from 'vue'
import VueRouter from 'vue-router'
import MapIndex from '@/views/MapIndex.vue'
import MapIndex2 from '@/views/MapIndex2.vue'
import MapIndex3 from '@/views/MapIndex3.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'MapIndex',
  component: MapIndex
}, {
  path: '/MapIndex',
  name: 'MapIndex',
  component: MapIndex
}, {
  path: '/MapIndex2',
  name: 'MapIndex2',
  component: MapIndex2
}, {
  path: '/MapIndex3',
  name: 'MapIndex3',
  component: MapIndex3
}]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router