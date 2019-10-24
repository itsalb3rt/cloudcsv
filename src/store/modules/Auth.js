import {
    login,
    register
} from "@/api/Auth.api"

export default {
    namespaced: true,
    state: {
        user: []
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    actions: {
        login({
            commit
        }, payload) {
            return login(payload);
        },
        register({
            commit
        }, payload) {
            return register(payload);
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        }
    }
}