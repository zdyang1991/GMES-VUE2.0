const apiBaseUrl = 'http://10.200.188.232:8021/';
// const apiPcsUrl = 'http://10.200.151.229:8041/pcs/';//高文龙
const apiPcsUrl = 'http://10.200.188.232:8041/pcs/';//服务器
const serviceModule = {
  //保存串口配置:#系统配置
  saveSystemCom: {
    url: apiBaseUrl + 'restful/cm/saveTerminalunit',
    method: 'post'
  },
  //登录接口:#登录界面
  logIn: {
    url: apiBaseUrl + 'restful/doLogin',
    method: 'get'
  },
  //退出接口:系统退出
  logout: {
    url: apiBaseUrl + 'restful/loginOut',
    method: 'get'
  },
  //当前工单队列：#初始化
  getinitializeTable: {
    url: apiPcsUrl + 'restful/pp/getProcutionOrderQueue',
    method: 'get'
  },
  //获取历史记录信息：#初始化#装配上线
  getHistoryInfo: {
    url: apiPcsUrl + 'restful/pp/getProductionStnRecords',
    method: 'get'
  },
  // //初始化工单修改信息上传
  // setReviseInfo: {
  //   url: apiPcsUrl + 'restful/pp/changeProductionOrder',
  //   method: 'post'
  // },
  //获取服务器时间
  getServertime: {
    url: apiBaseUrl + 'restful/cm/getServerTime',
    method: 'get'
  },
  //装配上线获取当前工单信息
  getAssemblyData: {
    url: apiPcsUrl + 'restful/pp/getProcutionOrderQueue',
    method: 'get'
  },
  //校验物料条码: #机加上线
  validMachiningProductRecord:{
    url:apiPcsUrl + 'restful/pp/validMachiningProductRecord',
    method:'post'
  },
  //根据产品序列号(发动机号)获取工单信息：#机加下线 #装配下线#热试
  getSerialNoInformation: {
    url: apiPcsUrl + 'restful/pp/getSerialNoInformation',
    method: 'get'
  },
  //根据工厂编号获取工单信息: #初始化界面
  getCurrentProductionOrder:{
    url: apiPcsUrl + 'restful/pp/getCurrentProductionOrder',
    method: 'get'
  },
  // 物料唯一性校验
  materialSole: {
    url: apiPcsUrl + 'restful/pp/assemblyUniqueCheck',
    method: 'get'
  },
  //获取机加工单队列
  getMachiningProductionQueue: {
    url: apiPcsUrl + 'restful/pp/getMachiningProductionQueue',
    method: 'get'
  },
  //  托条码查询#机加下线
  getPalletizedRecords:{
    url: apiPcsUrl +'restful/pp/getPalletizedRecords',
    method: 'get'
  },
//  物料主数据查询：热试
  getMaterialByCode:{
    url:apiPcsUrl +'restful/cm/getMaterialByCode',
    method:'get'
  },
  //
  updateMachiningProduction:{
    url:apiPcsUrl+'restful/pp/updateMachiningProduction',
    method: 'post'
  },
//  装配明细批量上传
  batchSavePartsData:{
    url:apiPcsUrl+'restful/pp/batchMachiningPartsData',
    method:"post"
  }

}
const ApiSetting = {...serviceModule};

export default ApiSetting
