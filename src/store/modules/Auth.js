import {login} from "@/api/Auth.api"

export default {
    namespaced:true,
    state: {
        user: []
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    actions: {
        login({commit},payload) {
            return new Promise((resolve, reject) => {
                login(payload).then(response => {
                    commit('SET_USER', response.data);
                    resolve();
                }).catch(error => {
                    reject();
                });
            });
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        }
    }
}