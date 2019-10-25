import {
    getNotificationsEmails,
    createNotification,
    deleteNotification
} from "@/api/NotificationsEmails.api"

export default {
    namespaced: true,
    state: {
        items: []
    },
    actions: {
        getNotificationsEmails({commit}) {
            return getNotificationsEmails();
        },
        createNotification({commit}, payload) {
            return createNotification(payload);
        },
        deleteNotification({commit},notificationId){
            return deleteNotification(notificationId);
        }
    },
    mutations: {
        SET_EMAILS(state, data) {
            state.items = data;
        }
    }
}