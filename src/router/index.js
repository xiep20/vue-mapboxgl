import Vue from 'vue'
import VueRouter from 'vue-router'
import MapIndex from '@/views/MapIndex.vue'
import MapIndex2 from '@/views/MapIndex2.vue'
import MapIndex3 from '@/views/MapIndex3.vue'
import MapIndex4 from '@/views/MapIndex4.vue'
import MapStatis1 from '@/views/MapStatis1.vue'
import MapStatis2 from '@/views/MapStatis2.vue'
import MapStatis3 from '@/views/MapStatis3.vue'
import MapStatis4 from '@/views/MapStatis4.vue'
import MapStatis5 from '@/views/MapStatis5.vue'
import MapStatis6 from '@/views/MapStatis6.vue'
import MapStatis7 from '@/views/MapStatis7.vue'
import MapStatis8 from '@/views/MapStatis8.vue'
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
}, {
  path: '/MapIndex4',
  name: 'MapIndex4',
  component: MapIndex4
}, {
  path: '/MapStatis1',
  name: 'MapStatis1',
  component: MapStatis1
}, {
  path: '/MapStatis2',
  name: 'MapStatis2',
  component: MapStatis2
}, {
  path: '/MapStatis3',
  name: 'MapStatis3',
  component: MapStatis3
}, {
  path: '/MapStatis4',
  name: 'MapStatis4',
  component: MapStatis4
}, {
  path: '/MapStatis5',
  name: 'MapStatis5',
  component: MapStatis5
}, {
  path: '/MapStatis6',
  name: 'MapStatis6',
  component: MapStatis6
}, {
  path: '/MapStatis7',
  name: 'MapStatis7',
  component: MapStatis7
}, {
  path: '/MapStatis8',
  name: 'MapStatis8',
  component: MapStatis8
}

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router