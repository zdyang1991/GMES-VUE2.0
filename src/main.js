//使用`import`命令加载的Vue构建版本
//（仅运行时或独立）已在webpack.base.conf中设置别名。
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './app';
import vueRouter from 'vue-router';
import routes from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zh from './locals/zh-cn.json';
import en from './locals/en.json';
import './css/common.css';
import UI from './components/ui';
import utils from  "./plugins/utils";
import axios from 'axios'
import vueAxios from 'vue-axios'
import './utils/util.js'
import './config/config.js'

var locales = {
  'zh-cn':{
  	...zh,
  	...zhLocale
  },
  'en': {
    ...en,
    ...enLocale
  },
}
Vue.use(utils);
Vue.use(ElementUI);
Vue.use(vueAxios, axios);
Vue.use(VueI18n);
Vue.use(UI);
Vue.config.lang = localStorage.lang || 'zh-cn';
// 全局添加x-token字段
// global.xtoken = '';
// axios.defaults.headers.common['X-Token'] = global.xtoken;
// // 请求拦截
// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Vue.use(vueRouter)
window.router = new vueRouter({
  routes
})

/*router.beforeEach((to, from, next) => {
  // ...
})*/

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
