import * as types from '../mutation-types'

const state = {
  headTitle:'首页',
}

const getters = {
  getTitle : state => state.headTitle
}

const actions = {
  setTitle({ commit }, title = 'PAD') {
    commit(types.SET_TO_HEADTITLE, title)
  }
}

const mutations = {
  [types.SET_TO_HEADTITLE](state,title) {
    state.headTitle = title
  },
}

export default {
	state,
	getters,
	actions,
	mutations,
}