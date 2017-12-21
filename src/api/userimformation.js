import {http ,fetch} from '@/js/http'



export function getUser(){
	return http.get('restful/user/getLoginUser')
}


export function getTerminalStations(){
	const data = {
	siteCode: process.env.siteCode,
	macAddress: '1234',
	serviceCode: "GMES-CLIENT-CM0001"}
	return fetch.post('restful/service/execute',{body:data})
}

// 获取用户绑定站点，适用于部分功能
export function getUserStatus(userCode = ''){
	const data = {
        siteCode: process.env.siteCode,
        userCode: userCode,
        serviceCode: "GMES-CLIENT-CM0002"
    };
    return fetch.post('restful/service/execute',{body:data})
}	

export function getUserAllModuleMenus(){
	return http.get('restful/user/queryUserAllModuleMenus')
}		

