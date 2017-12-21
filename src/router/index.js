// 外壳
import Login from '@/views/login/index.vue';
import Index from '@/views/index/index.vue';
import Home from '@/views/home/index.vue';

// 页面
import Dailywork 						from '@/views/dailywork/index.vue';
import Message 							from '@/views/message/index.vue';
import QueuingIndication 				from '@/views/pcs/queuingIndication.vue';
import QueuingDoubleIndication 			from '@/views/pcs/queuingDoubleIndication.vue';
import QueuingMultipleIndication 		from '@/views/pcs/queuingMultipleIndication.vue';
import QueuingIndicationConfirm 		from '@/views/pcs/queuingIndicationConfirm.vue';
import Dailyworklist 					from '@/views/dailyworklist/index.vue';
import UserCenter 						from '@/views/usercenter/index.vue';
import AndonPullCordsMultilevelOperate 	from '@/views/andon/andonPullCordsMultilevelOperate.vue';
import AndonMonitoring 					from '@/views/andon/andonMonitoring/index.vue';
import SopWorkInstruction from '@/views/pcs/sopWorkInstruction';
import RealTimeMonitoringOfPositionDefect from '@/views/pqc/realTimeMonitoringOfPositionDefect';
import Initialize from '@/views/initialize/initialize.vue';
import AssemblyOnline from '@/views/online/assemblyOnline.vue';
import MachineplusOnline from '@/views/online/machineplusOnline.vue';
const routes = [
  {
    path: '/', component: Index, redirect: '/home',
    children: [
      {path: '/home', component: Home},
      {path: '/message', component: Message},
      {path: '/dailywork', component: Dailywork},
      {path: '/dailyworklist', component: Dailyworklist},
      {path: '/userCenter', component: UserCenter},
      {path: '/pcs/queuingIndication', component: QueuingIndication},
      {path: '/pcs/queuingDoubleIndication', component: QueuingDoubleIndication},
      {path: '/pcs/queuingMultipleIndication', component: QueuingMultipleIndication},
      {path: '/pcs/queuingIndicationConfirm', component: QueuingIndicationConfirm},
      {path: '/pcs/sopWorkInstruction', component: SopWorkInstruction},
      {path: '/pqc/realTimeMonitoringOfPositionDefect', component: RealTimeMonitoringOfPositionDefect},
      {path: '/andon/andonMonitoring', component: AndonMonitoring},
      {path: '/andon/andonPullCordsMultilevelOperate', component: AndonPullCordsMultilevelOperate},
      {path: '/initialize', component: Initialize, name: '初始化'},
      {path: '/online/assemblyOnline', component: AssemblyOnline, name: '装配上线'},
      {path: '/online/machineplusOnline', component: MachineplusOnline, name: '机加上线'}
    ]
  },
  {path: '/login', component: Login}
]


export default routes;
