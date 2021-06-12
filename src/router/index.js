import Vue from 'vue'
import VueRouter from 'vue-router'
import MapIndex from '@/views/MapIndex.vue'
import SDG1111 from '@/views/SDG1111.vue'
import SDG1121 from '@/views/SDG1121.vue'
import SDG1131 from '@/views/SDG1131.vue'
import SDG1151 from '@/views/SDG1151.vue'
import SDG1161 from '@/views/SDG1161.vue'
import SDG1171 from '@/views/SDG1171.vue'
import SDG1311 from '@/views/SDG1311.vue'
import SDG1322 from '@/views/SDG1322.vue'
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
        path: '/sdg1111',
        name: 'SDG1111',
        component: SDG1111
    }, {
        path: '/sdg1121',
        name: 'SDG1121',
        component: SDG1121
    }, {
        path: '/sdg1131',
        name: 'SDG1131',
        component: SDG1131
    }, {
        path: '/sdg1151',
        name: 'SDG1151',
        component: SDG1151
    }, {
        path: '/sdg1161',
        name: 'SDG1161',
        component: SDG1161
    }, {
        path: '/sdg1171',
        name: 'SDG1171',
        component: SDG1171
    }, {
        path: '/sdg1311',
        name: 'SDG1311',
        component: SDG1311
    }, {
        path: '/sdg1322',
        name: 'SDG1322',
        component: SDG1322
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