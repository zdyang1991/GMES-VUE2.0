import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    menulist: [],
    title:''

  },
  mutations:{
    hideSearch(state){
      state.searchShow = false;
    },
  },
  getters:{

  },
  actions:{

  }
});
