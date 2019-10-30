import i18n from '@/i18n'
import {
    getTables,
    getTable,
    create,
    deleteFromDataBase,
    updateColumn,
    createColumn,
    deleteColumn
} from "@/api/Tables.api"

export default {
    namespaced: true,
    state: {
        items: [],
        columnstypes: [{
                name: i18n.t("callAction.text"),
                value: "text"
            },
            {
                name: i18n.t("callAction.number"),
                value: "number"
            }
        ],
        forbiddenColumnNames: [
            "table",
            "create_at",
            "id_user",
            "user",
            "users_sessions",
            "table_storage",
            "delete_log",
            "recovered_accounts",
            "notifications_emails",
            "tables_columns"
          ]
    },
    getters: {
        getTables(state) {
            return state.items;
        },
        getColumnsTypes(state){
            return state.columnstypes;
        },
        getForbiddenColumnNames(state){
            return state.forbiddenColumnNames;
        }
    },
    actions: {
        createTable({
            commit
        }, payload) {
            return create(payload);
        },
        fetchAll({
            commit
        }) {
            return getTables();
        },
        fetch({
            commit
        }, id) {
            return getTable(id);
        },
        updateColum({commit},payload){
            return updateColumn(payload);
        },
        createColumn({commit},payload){
            return createColumn(payload);
        },
        deleteColumn({commit},id){
            return deleteColumn(id);
        },
        deleteTable({
            commit
        }, id) {
            return deleteFromDataBase(id);
        }
    },
    mutations: {
        SET_TABLES(state, data) {
            state.items = data;
        },
        REMOVE_TABLE(state, index) {
            state.items.splice(index, 1);
        }
    }
}