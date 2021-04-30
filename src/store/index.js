import Vue from 'vue'
import Vuex from 'vuex'
import tooBar from "./modules/tooBar"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tooBar,
  }
})
