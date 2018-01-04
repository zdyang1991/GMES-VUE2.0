const apiBaseUrl = 'http://10.200.188.232:8021/'
const apiPcsUrl = 'http://10.200.151.229:8021/pcs/'
const serviceModule = {
  //保存串口配置
  saveSystemCom: {
    url: apiBaseUrl + 'restful/cm/saveTerminalunit',
    method: 'post'
  },
  //登录接口
  logIn: {
    url: apiBaseUrl + 'restful/doLogin',
    method: 'post'
  },
  //初始化获取当前工单信息
  getinitializeTable: {
    url: apiPcsUrl + 'restful/pp/getProcutionOrderQueue',
    method: 'get'
  },
  //初始化获取历史记录信息
  getHistoryInfo: {
    url: apiPcsUrl + 'restful/pp/getProductionStnRecords',
    method: 'get'
  },
  //初始化工单修改信息上传
  setReviseInfo: {
    url: apiPcsUrl + 'restful/pp/changeProductionOrder',
    method: 'post'
  },
  //获取服务器时间
  getServertime: {
    url: apiBaseUrl + 'restful/cm/getServerTime',
    method: 'get'
  },
  //装配上线获取当前工单信息
  getAssemblyData: {
    url: apiPcsUrl + 'restful/pp/getProcutionOrderQueue',
    method: 'get'
  }
}
const ApiSetting = {...serviceModule}

export default ApiSetting
