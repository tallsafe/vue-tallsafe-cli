import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)
Vue.prototype.axios = axios;
Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
}else{
  Window.config = {
    isWebGetMenu:false
  }
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
