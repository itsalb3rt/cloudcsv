import {getAllUsers,update} from "@/api/Users.api"

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
            return getAllUsers();
        },
        update({commit},payload){
            return update(payload);
        }
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data;
        }
    }

}