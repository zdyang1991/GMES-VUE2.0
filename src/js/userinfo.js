/*
 * @name: 用户登录模块
 * @author: EVUN前端组
 * @modify: kelichao
 * @update: 2017-06-13
 * @decript: 登录方法的集合
 */

import { http , fetch} from './http';
import { Message, MessageBox, Loading} from 'element-ui';
import timer    from '@/js/timerManager';
import mqtt from './mqtt';
import store from '../store';

class Useroper {
    // 静态属性
	constructor() {
		this.siteCode = process.env.siteCode;
        this.serverDateTime = undefined;
	    this.user = { profile: null, stations: {}};
	    this.terminal = {macAddress: "1234",stations: {}};// terminalStations 终端站点
	    this.operStations = [];
        this.operStationsL = -1;
	}

    // 获取系统信息方法
	getSysInfo() {
        return {
            version:"test",
            sysAddress: location.origin,
            sysDescript: navigator.userAgent,
            macAddress: this.terminal.macAddress || "获取mac失败",
            canUseSation: this.operStations || "暂无可操作站点",
            system: navigator.userAgent.toLowerCase(),
            address: window.document.URL
        };
    }

    // 获取登录用户信息
    getLoginUser() {

        const _this =this;
        if(_this.user.profile){
           return Promise.resolve(this.user.profile);
        }else{
            return new Promise((resolve,reject) => {
                http.get('/restful/user/getLoginUser')
                .then(data => {
                    if(data.status){
                        throw new Error()
                    }else{
                        _this.user.profile = data.data;
                        console.log("getLoginUser ...OK");
                        resolve(_this.user.profile)
                    }
                })
                .catch(() => {
                    reject('获取登录用户信息出错');
                });
            });
        }
    }

    getUserStations (){
    	const _this =this;
    	return new Promise(async (resolve,reject) => {
            const data = {
                    siteCode: _this.siteCode,
                    userCode: _this.user.profile.userCode,
                    serviceCode: "GMES-CLIENT-CM0002"
                };
        	const resp = await fetch.post('/restful/service/execute',{body:data})
			if(resp.returnCode == 0){
    			resp.data.forEach((item) =>{
                    _this.user.stations[item.stationCode] = item.stationText;
                });
        		resolve()
			}else{
                reject('获取用户站点绑定信息出错')
			}
        })
    }

    //刷新TOKEN
    refershAccessToken (notLoginCallbackFn) {
    		const _this = this;
    		http.post("/oauth/token",{
        		headers:{"Authorization":"Basic aW1lLWNsaWVudC1tb2JpbGUtaGFuZHNldDo="},
        		body:{
        			"grant_type": "refresh_token",
                    "refresh_token": localStorage.getItem("refresh_token")
                }})
    		.then(data=>{
    			if(data.status){
    				throw new Error('')
    			}else{
    				setTimeout(()=> {
                    	//_this.refershAccessToken();
	                }, (data["expires_in"] - 60) * 1000);
	                for (var name in data) {
	                    localStorage.setItem(name, data[name]);
	                }
    			}	
    		})
    		.catch(function(error){
                notLoginCallbackFn && notLoginCallbackFn()
            });
    }
    
    // 初始化用户可操作站点
    initUserOperableStations() {
        // 将环境信息赋值给总变量
        if (this.terminal.stations && this.user.stations) {
            for (var name in this.user.stations) {
                if (this.terminal.stations[name]) {
                    this.operStations.push({
                        "stationCode": name,
                        "stationText": this.user.stations[name]
                    });
                }
            }
        }
        this.operStationsL = this.operStations.length;
    }

    // 获取物理站点信息
    getTerminalStations() {
        if (Object.keys(this.terminal.stations) != 0) {
            return Promise.resolve(this.terminal.stations);
        } else {
            return new Promise((resolve,reject) => {
                const _this = this;
                fetch.post('/restful/service/execute',{body:{
                        siteCode: _this.siteCode,
                        macAddress: _this.terminal.macAddress,
                        serviceCode: "GMES-CLIENT-CM0001"}})
                    .then(data => {
                        if(data.returnCode == 0){
                            data.data.forEach((item) =>{
                                _this.terminal.stations[item.stationCode] = item.stationText;
                            });
                        }else{
                            throw new Error()
                        }
                        resolve(_this.terminal.stations);
                    })
                    .catch(data => {
                        reject('获取用户站点绑定信息出错')
                    })
            })
        }
    }

    getServerDataTime(){
    	const _this = this;
		return new Promise((resolve,reject) => {
        	http.get('/restful/date/getServerDateTime')
        		.then(data => {
        			if(data.status){
        				throw new Error()
        			}else{
	        			_this.serverDateTime = data.data;
	            		resolve(data.data)
	            	}
        		})
        		.catch((data) => {
        			reject('获取获取用户权限信息出错')
        		})
        })
	}
}

let useroper = new Useroper();

export default {
    // 是否登录
    async isLogin(notLoginCallbackFn) {
        var accessToken = localStorage.getItem("access_token");
        if(accessToken){
            
        	const res = await http.get('restful/heartbeat/connect')	
        	if(res.returnCode == 0){ 
                this.loginUserDataInit().catch((data)=>{
                    notLoginCallbackFn()
                });
            }
        	else useroper.refershAccessToken(notLoginCallbackFn)
        }
    },
    loginOut() {
        localStorage.clear();
        timer.clearAll();
        try {
            mqtt.disconnect();
        }
        catch(err) {
            console.log(err);
        }
        location.reload()
    },
    // 获取Tocken
    getAccessToken() {
        return localStorage.getItem("access_token");
    },
    // 刷新Token
    refershAccessToken() {
        useroper.refershAccessToken(()=>{
        	Message('刷新授权失败，请重新登录');
        })
    },
    // 获取用户信息
    getUserProfile() {
        return useroper.getLoginUser();
    },
    getSiteCode() {
        return useroper.siteCode;
    },
    // 获取用户可操作站点信息集合
    getUserOperableStations() {
        return useroper.operStations;
    },
    // 是否为唯一操作站点
    isUniqueOperableStation(length){
        const textMsg = length === 0 ? '当前用户无可操作站点！' : '当前用户配置出现多站点情况，请检查配置信息';
    	if(length !== 1 ){
            MessageBox.alert(textMsg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                router.push('/home')
              }
            });
        }
    },
    isUniqueOS(){
        const _this = this;
        if(useroper.operStationsL != -1){
            return new Promise((resolve,reject)=>{
                _this.isUniqueOperableStation(useroper.operStationsL)
                resolve(useroper.operStations)
            })
        }else{
            return useroper.getLoginUser().then(()=>{
                return useroper.getUserStations()
            }).then(()=>{
                return useroper.getTerminalStations()
            }).then(()=>{
                useroper.initUserOperableStations();
                _this.isUniqueOperableStation(useroper.operStationsL)
                return useroper.operStations
            })
        }
    },
    // 设置终端MAC地址
    setTerminalMacaddress(macAddress) {
        useroper.terminal.macAddress = macAddress;
    },
    
    loginUserDataInit() {
        return useroper.getServerDataTime()
    },
    getServerDataTime(){
        if(useroper.serverDateTime){
    	   return Promise.resolve(useroper.serverDateTime); 
        }
        return useroper.getServerDataTime()
    },
    // 获取终端站点，通过MAC地址获取的站点
    terminalStation() {
        return useroper.getTerminalStations();
    },
    sysInfo() {
        return useroper.getSysInfo();
    }
};

