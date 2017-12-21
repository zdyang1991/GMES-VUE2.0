import { fetch } from '@/js/http'
import config    from '@/js/config'
import getTime   from '@/js/timeFormat'
const data = {
	serviceCode:'GMES-CLIENT-MSG0003',
	siteCode:config.apiBaseUrl.siteCode,
	numPerPage:20,
}

const type = {
	NORMAL:'[普通消息]',
	SCROLL:'滚屏消息',
	POPUP:'[弹屏公告]',
}

export default function (param = {}){
	return new Promise(async (resolve,reject)=>{
		const resp = await fetch.post('/restful/service/execute',{...data,...param});
		resp.data.data.map(item=>{
			item.receivedTime = getTime.four(item.receivedTime);
			item.messageTypeEcode = type[item.messageTypeEcode];
			return item;
		})
		resolve(resp)
	})
}