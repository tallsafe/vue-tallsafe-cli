import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/iconfont.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
// import VueResource from 'Vue-resource'

// import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)
// Vue.use(VueResource)
Vue.prototype.axios = axios;
if (process.env.NODE_ENV === 'production') {
}else{
  Window.config = {
    isWebGetMenu:false,
    url:""
    //url:"http://10.0.0.183:7088"
  }
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
