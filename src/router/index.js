// 外壳
import Login from '@/views/login/login.vue';
import Index from '@/views/index/index.vue';

// 页面
import SystemConfiguration from '@/views/system/systemconfiguration.vue';
import Initialize from '@/views/initialize/initialize.vue';
import AssemblyOnline from '@/views/online/assemblyOnline.vue';
import MachineplusOnline from '@/views/online/machineplusOnline.vue';
import AssembleInsert from '@/views/assembleInsert/assembleInsert.vue';
import HostTest from '@/views/hottest/hottest.vue';
import MachineInsert from '@/views/machineWorkInsert/machineWorkInsert.vue';
import Home from '@/views/home/home.vue';
import crankshaftOnline from '@/views/online/crankshaftOnline.vue';
const routes = [
  {
    path: '/', component: Index, redirect: '/login',
    children: [
      {path: '/system',component: SystemConfiguration,name: '系统配置'},
      {path: '/initialize', component: Initialize, name: '初始化'},
      {path: '/online/assemblyOnline', component: AssemblyOnline, name: '装配上线'},
      {path: '/online/machineplusOnline', component: MachineplusOnline, name: '机加上线'},
      {path: '/assembleInsert', component: AssembleInsert, name: '装配下线'},
      {path: '/hothost', component: HostTest, name: '热试'},
      {path: '/MachineInsert', component: MachineInsert, name: '机加下线'},
      {path: '/online/crankshaftOnline', component: crankshaftOnline, name: '曲轴上线'},
      {path:'/home', component: Home, name:'首页'}
    ]
  },
  {path: '/login', component: Login}
];


export default routes;
