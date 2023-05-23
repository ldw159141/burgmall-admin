import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from '@/utils/axios'

Vue.prototype.axios = axios //不知道vscode搞什么鬼，代码有效但是不提示

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
