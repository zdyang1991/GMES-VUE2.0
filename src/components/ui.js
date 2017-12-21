import {Users} from '../components/users';
import {Progress} from '../components/Progress';
import {Proinfo} from '../components/Proinfo';

window.document.addEventListener('touchstart', function (event) {
  /* Do Nothing */
}, false);

const install = function (Vue) {
  Vue.component(Users.name, Users);
  Vue.component(Progress.name, Progress);
  Vue.component(Proinfo.name, Proinfo);

  // Vue.prototype.$dialog = {
  //   confirm: Confirm,
  //   alert: Alert,
  //   toast: Toast,
  //   notify: Notify,
  //   loading: Loading,
  //   prompt: Prompt,
  // };
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install
};
