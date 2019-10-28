import {
    getDataByTable,
    save,
    deleteByTable
} from "@/api/DataStorage.api"

export default {
    namespaced: true,
    state: {
        items: [],
    },
    getters:{
        getTables(state) {
            return state.items;
        }
    },
    actions: {
        saveData({commit}, payload) {
            return save(payload);
        },
        getDataByTable({ commit},payload) {
            return getDataByTable(payload);
        },
        deleteRecord({commit},payload){
            return deleteByTable(payload);
        }
    },
    mutations: {
        SET_TABLES(state, data) {
            state.items = data;
        },
        REMOVE_TABLE(state,index){
            state.items.splice(index,1);
        }
    }
}