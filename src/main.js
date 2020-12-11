import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import http from './axios/http.js' //axios实例化后引入取名http
Vue.prototype.http = http //放入全局

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
