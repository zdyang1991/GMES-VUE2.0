//使用`import`命令加载的Vue构建版本
//（仅运行时或独立）已在webpack.base.conf中设置别名。
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './app';
import vueRouter from 'vue-router';
import routes from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './css/common.css';
import UI from './components/ui';
import utils from  "./plugins/utils";
import axios from 'axios'
import vueAxios from 'vue-axios'
import './utils/util.js'
import './config/config.js'

Vue.use(utils);
Vue.use(ElementUI);
Vue.use(vueAxios, axios);
Vue.use(VueI18n);
Vue.use(UI);
// 全局添加x-token字段
// global.xtoken = '';
// axios.defaults.headers.common['X-Token'] = global.xtoken;
// // 请求拦截
// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });


Vue.use(vueRouter)
window.router = new vueRouter({
  routes
})

/*router.beforeEach((to, from, next) => {
  // ...
})*/

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
