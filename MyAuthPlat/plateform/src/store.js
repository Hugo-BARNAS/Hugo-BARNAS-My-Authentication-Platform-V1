import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: "",
        name: "",
        contacts: "",
        id: "",
    },
    getters: {
        name(state) {
            return `${state.name}`
        },
        contacts(state) {
            return state.contacts
        },
        id(state) {
            return state.id
        }
    },
    mutations: {
        TOKEN_MUTATION(state, tokenSent) {
            state.token = tokenSent
        },
        DELETE_TOKEN: (state) => {
            state.token = ""
        },
        NAME_USER(state, userName) {
            state.name = userName
        },
        CONTACTS_USER(state, contacts) {
            state.contacts = contacts
        },
        ID_USER(state, id) {
            state.id = id
        },
    },

    // plugins: [createPersistedState()],
    actions: {
        sentToken(context, tokenSent) {
            context.commit('TOKEN_MUTATION', tokenSent)
        },
        deleteToken: (store) => {
            store.commit('DELETE_TOKEN')
        },
        nameUser(context, userName) {
            context.commit('NAME_USER', userName)
        },
        idUser(context, idUser) {
            context.commit('ID_USER', idUser)
        },
        contacts(context, contactsUser) {
            context.commit('CONTACTS_USER', contactsUser)
        }
    }
});  