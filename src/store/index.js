import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/Snackbar'
import users from './modules/Users'
import auth from './modules/Auth'
import dataImport from './modules/DataImport'
import tables from './modules/Tables'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    snackbar,
    users,
    auth,
    dataImport,
    tables
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
