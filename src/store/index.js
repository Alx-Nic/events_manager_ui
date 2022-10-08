import Vue from 'vue'
import Vuex from 'vuex'
import identity from './modules/Identity'
import backendError from './modules/backendError'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    identity,
    backendError
  },
  strict: true
})
