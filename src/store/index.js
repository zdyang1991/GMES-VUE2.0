import Vue from 'vue'
import Vuex from 'vuex'
import userImformation from './modules/userimformation'
import common from './modules/common'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

window.store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      // debugger
      context.commit('increment')
      alert(123)
    }
  },
  modules: {
    userImformation,
    common
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
