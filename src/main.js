// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from "vuex";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from "./store";
import { global } from "./global/global";

//权限控制
import '@/permission';
Vue.use(Vuex)
Vue.use(ElementUI, {
  size: 'medium'
})

//加载用户主题
if (localStorage.getItem('themeValue')) {
  global.changeTheme(localStorage.getItem('themeValue'))
} else {
  global.changeTheme('default')
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
