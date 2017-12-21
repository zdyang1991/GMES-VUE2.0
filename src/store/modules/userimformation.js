/*
 * @author: EVUN前端组
 * @modify: kelichao
 * @update: 2017-10-12
 * @decript: 用户信息获取集合
 */

import * as types from '../mutation-types'
import { getUser, getUserStatus, getTerminalStations, getUserAllModuleMenus} from '../../api/userimformation'
import socket from '../../api/socket'
const state = {
	items: 1,
	userData: {},
	userStations: {},
	terminalStations: {},
	operStations: [],
	operStationsL: 1,
	moduleMenus: {},
}
//对于引用对象的而言 只有引用地址发生变化才能出发 计算属性方法

// getters
const getters = {
	recordLists: state => state.items,
	recorduserData: state => state.userData,
	recordmoduleMenus: state => state.moduleMenus,
	recordoperStationsL: state => state.operStationsL,
	recordoperuserStations: state => state.userStations,
	recordterminalStations: state => state.terminalStations
}

const actions = {
	text({ commit }, options = {}) {
		commit(types.ADD_TO_COUNT, options)
	},
	async getModuleMenus({ commit }, options = {}) {
		const MMlist = await getUserAllModuleMenus();
		commit(types.GET_TO_MODULEMENU, MMlist)
	},
	async getUserData({ commit }, options = {}) {
		const loginUser = await getUser();
		if (loginUser.returnCode != 0) {
			return false
		}
		commit(types.GET_TO_USERDATA, loginUser)
		const userStations = await getUserStatus(loginUser.data.userCode);
		commit(types.GET_TO_USERSTATIONS, userStations)
		const terminalStations = await getTerminalStations(loginUser.data.userCode);
		commit(types.GET_TO_TERMINALSTATIONS, terminalStations)
		commit(types.GET_TO_OPERSTATIONS)

		socket(loginUser.data.userCode) //消息订阅
	},
}


const mutations = {
	[types.ADD_TO_COUNT](state, index) {
		state.items = state.items + 1
	},
	[types.GET_TO_MODULEMENU](state, list) {
		const reg = /\.html/gi;
		// 过滤favorMenu后缀
		list.data.favorMenu.map(function(item) {
			item.url = item.url.replace(reg, "");
			return item;
		});
		// 过滤navMenu后缀
		list.data.navMenu.forEach(function(item, index) {
			if (list.data.navMenu[index].children) {
				list.data.navMenu[index].children.map(function(item) {
					if (item.data.url) {
						item.data.url = item.data.url.replace(reg, "");
					}
					return item;
				});
			}
		});
		state.moduleMenus = list.data
	},
	[types.GET_TO_USERDATA](state, list) {
		state.userData = list.data
	},
	[types.GET_TO_USERSTATIONS](state, list) {
		const obj = {};
		list.data.forEach((item) => {
			obj[item.stationCode] = item.stationText;
		});
		state.userStations = obj;
	},
	[types.GET_TO_TERMINALSTATIONS](state, list) {
		const obj = {};
		list.data.forEach((item) => {
			obj[item.stationCode] = item.stationText;
		});
		state.terminalStations = obj;
	},
	[types.GET_TO_OPERSTATIONS](state) {
		state.operStations = [];
		if (state.terminalStations && state.userStations) {
			for (var name in state.userStations) {
				if (state.terminalStations[name]) {
					state.operStations.push({
						"stationCode": name,
						"stationText": state.userStations[name]
					});
				}
			}
		}
		state.operStationsL = state.operStations.length;
		// 将环境信息赋值给总变量
		//Object.assign(this.user.profile, this.setSysInfo());
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
