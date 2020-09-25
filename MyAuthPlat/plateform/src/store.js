import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token : "",
    },
    mutations: {
        TOKEN_MUTATION(state, tokenSent){
            state.token = tokenSent
        },
        DELETE_TOKEN:(state) => {
            state.token = ""
        }
    },
    // plugins: [createPersistedState()],
    actions: {
        sentToken(context, tokenSent){
            context.commit('TOKEN_MUTATION', tokenSent)
        },
        deleteToken:(store) => {
            store.commit('DELETE_TOKEN')
        },
    }              
});  