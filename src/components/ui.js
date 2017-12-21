import {Users} from '../components/users';
import {AssemblyOrder} from '../components/assemblyorder'

window.document.addEventListener('touchstart', function (event) {
  /* Do Nothing */
}, false);

const install = function (Vue) {
  Vue.component(Users.name, Users);
  Vue.component(AssemblyOrder.name, AssemblyOrder);


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
