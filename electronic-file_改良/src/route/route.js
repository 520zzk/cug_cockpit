import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const device = () => import('../components/device/index.vue')
const network = () => import('../components/network/index.vue')

const router = new Router({
  mode: 'history',
  routes: [ {
    path: '/device',
    name: 'device',
    component: device
  },
  {
    path: '/network',
    name: 'network',
    component: network
  }]
})
export default router
