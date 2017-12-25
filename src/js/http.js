// import 'whatwg-fetch'
// import config from './config'
// import { Message } from 'element-ui';
//
// class Fetchbase{
// 	constructor(){
//
// 	}
//
// 	throwError(data) {
// 		if (data.success) return
// 		httpErrorCb(data.errCode)
// 		//alert(data.errMsg || data.message)
// 		var err = new Error(data.message || data.errMsg)
// 		err.name = data.status || data.errCode
// 		throw err
// 	}
//
// 	throwMsg(data) {
// 		//if (data.returnCode == 0 || data.code == 0) return
// 		Message({message: "错误：" + (data.code || data.returnCode || "") + (data.errorMessage || data.message), type: "error"});
// 	}
//
// 	getUrl(url) {
// 		if (/\?/.test(url)) {
// 			url = `${url}&siteCode=${config.apiBaseUrl.siteCode}&access_token=${localStorage.access_token}`
// 		}else{
// 			url = `${url}?siteCode=${config.apiBaseUrl.siteCode}&access_token=${localStorage.access_token}`
// 		}
// 		return config.apiBaseUrl.baseApi + url
// 	}
//
// 	async get(url, params = {}) {
// 		return await this.fetch(url, params)
// 	}
//
// 	postHeaderSet(options){
// 		options = Object.assign({
// 			method: 'POST',
// 			headers: {}
// 		}, options)
// 		options.body = typeof options.body == 'string' ? options.body : this.jsonToFormData(options.body);
// 		options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 		return options
// 	}
//
// 	async post(url, options = {}) {
// 		options = this.postHeaderSet(options)
// 		return await this.fetch(url, options)
// 	}
//
// 	async fetch(url, options = {}) {
// 		url = this.getUrl(url)
// 		options.headers = Object.assign({
// 			"Authorization": "Basic aW1lLWNsaWVudC1wYWQ6"
// 		}, options.headers)
// 		try{
// 			var resp = await window.fetch(url, options)
// 			var data = await this.parseResponse(resp)
// 			//throwMsg(data)
// 			return data
// 		}catch(err){
// 			const data = {
// 				returnCode:8,
// 				errorMessage:'请求返回出错或网络中断'
// 			};
// 			this.throwMsg(data)
// 			return data
// 		}
//
// 	}
//
// 	jsonToFormData(json){
// 		let data = '';
// 		const keys = Object.keys(json);
// 		keys.forEach((key,i)=>{
// 			i === (keys.length-1) ? data+=`${key}=${json[key]}` : data+=`${key}=${json[key]}&`
// 		})
// 		return data
// 	}
//
// 	async parseResponse(resp) {
// 		var type = resp.headers.get('Content-Type')
// 		if(resp.status === 200 || resp.status === 201){
// 			if (/text\/html/.test(type)) {
// 				return await resp.text()
// 			} else if (/application\/json/.test(type)) {
// 				return await resp.json()
// 			} else {
// 				return await resp.blob()
// 			}
// 		}else{
// 			Message('获取用户信息失败，请重新登录')
// 			router.push('login')
// 			return await Promise.resolve({returnCode:8,errorMsg:'获取用户信息失败，请重新登录'})
// 		}
// 	}
// }
//
// class Fetch extends Fetchbase{
// 	constructor(){
// 		super()
// 	}
//
// 	postHeaderSet(options){
// 		const data = {...options}
// 		if(!options.body){
// 			options = {};
// 			options.body = data;
// 		}
// 		options = Object.assign({
// 			method: 'POST',
// 			headers: {}
// 		}, options)
// 		options.body = typeof options.body == 'string' ? options.body : this.jsonToFormData(options.body);
// 		options.headers.Accept = "application/json";
// 		options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 		return options
// 	}
//
// 	async parseResponse(resp) {
// 		var type = resp.headers.get('Content-Type')
// 		if(resp.status === 200){
// 			if (/text\/html/.test(type)) {
// 				return await resp.text()
// 			} else if (/application\/json/.test(type)) {
// 				return await resp.json()
// 			} else {
// 				return await resp.blob()
// 			}
// 		}else{
// 			const errorRes = await resp.json();
// 			super.throwMsg(errorRes)
// 			return await Promise.resolve({returnCode:9,status:resp.status,errorMsg:'有错误',data: []});// 需要data防止乱码报错
// 		}
// 	}
//
// }
//
// const http = new Fetchbase();
// const fetch = new Fetch()
// export {http, fetch};
