const serviceModule = {
  //保存串口配置
  saveSystemCom: {
    url: 'http://10.200.188.232:8021/restful/cm/saveTerminalunit',
    method: 'post'
  },
  //登录接口
  logIn: {
    url: 'http://10.200.151.229:8041/restful/doLogin',
    method: 'post'
  },
  //初始化获取当前工单信息
  getinitializeTable: {
    url: 'http://10.200.151.229:8021/pcs/restful/pp/getProcutionOrderQueue',
    method: 'get'
  },
  //初始化获取历史记录信息
  getHistoryInfo:{
    url: 'http://10.200.151.229:8021/pcs/restful/pp/getProductionStnRecords',
    method:'get'
  },
  //初始化工单修改信息上传
  setReviseInfo: {
    url: 'http://10.200.151.229:8021/pcs/restful/pp/changeProductionOrder',
    method: 'post'
  },
}
const ApiSetting = {...serviceModule}

export default ApiSetting
