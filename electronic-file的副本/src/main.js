import Vue from 'vue'
import App from './App.vue'
import router from './route/route.js'

import './assets/common.less'

import dataV from '@jiaminghi/data-view'

import store from './store/index.js'

Vue.config.productionTip = false

Vue.use(dataV)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
