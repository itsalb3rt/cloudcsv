import {getAllUsers} from "@/api/Users.api"

export default {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers(state) {
            return state.users;
        }
    },
    actions: {
        fetchUsers({commit}) {
            return new Promise((resolve, reject) => {
                getAllUsers().then(response => {
                    commit('SET_USERS', response.data);
                    resolve();
                }).catch(error => {
                    reject();
                });
            });
        }
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data;
        }
    }

}