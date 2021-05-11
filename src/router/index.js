import Vue from 'vue'
import VueRouter from 'vue-router'
import MapIndex from '@/views/MapIndex.vue'
import MapIndex2 from '@/views/MapIndex2.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'MapIndex',
  component: MapIndex
},{
  path: '/MapIndex2',
  name: 'MapIndex2',
  component: MapIndex2
}]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router