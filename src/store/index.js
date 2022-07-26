import Vue from 'vue'
import Vuex from 'vuex'
import identity from './modules/Identity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    identity
  },
  strict: true
})
