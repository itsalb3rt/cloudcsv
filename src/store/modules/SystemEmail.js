import {getEmail,save } from "@/api/SystemEmail.api"

export default {
    namespaced: true,
    state: {
        email: '',
    },
    getters:{
        getEmail(state) {
            return state.email;
        }
    },
    actions: {
        saveEmail({commit}, payload) {
            return save(payload);
        },
        getSystemEmail({ commit}) {
            return getEmail();
        },
    },
    mutations: {
        SET_SYSTEM_EMAIL(state, email) {
            state.email = email;
        }
    }
}