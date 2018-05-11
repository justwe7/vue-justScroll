import Vue from 'vue'
import App from './App'
import './axios'

import "./common/css/reset.css"

import justScroll from './lib/index.js'
Vue.use(justScroll)

Vue.config.productionTip = false;//禁止vue启动提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
