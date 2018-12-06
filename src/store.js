import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  plugins: [VuexPersistedState()],
  state: {
    lang:'tw',
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
    },
  },
  actions: {
    setLang({commit}, lang) {
      commit('setLang', lang)
    },
  }
})
