import { fetch } from '@/js/http'
import gettime   from '@/js/timeFormat'
const param1 = {
	siteCode:1310,
	serviceCode:'GMES-CLIENT-ANDON005',
	statusECode:1,
	typeCode:'',
	pageNum:1,
	numPerPage:6,
}

export function list(object = {}){
	return fetch.post(
		'restful/service/execute',
    {body:{...param1,...object}}
  );
}

export function change(data = {},serverDate){
	return data.map((item)=>{
		item.triggerTime = gettime.changeTimeLength((serverDate - item.switchOnDateTime)/1000)
		item.switchOnDateTime = gettime.four(item.switchOnDateTime)
		item.statusECode = item.statusECode == 1 ? '触发' : '关闭'
		return item;
	})
}


