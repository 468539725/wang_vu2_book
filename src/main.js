import Vue from 'vue'
import App from'./App.vue'
import VueAxios from "vue-axios";
import {Drawer,Button,Table,TabPane,Tabs,Notification,Pagination} from 'element-ui'
Vue.use(Drawer)
Vue.use(Button)
Vue.use(Table)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Pagination)


import VueRouter from 'vue-router'
// //引入路由器
import router from './router'
import axios from "axios";

Vue.use(VueAxios,axios)

Vue.use(VueRouter)


import store from './store'
Vue.prototype.$notify=Notification
Vue.config.productionTip = false
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(NProgress)
import qs from 'qs'
new Vue({
  qs,
  axios,
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount('#app')
