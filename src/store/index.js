import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/Snackbar'
import users from './modules/Users'
import auth from './modules/Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    snackbar,
    users,
    auth
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
