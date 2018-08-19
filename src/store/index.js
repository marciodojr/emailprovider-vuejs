import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    layout: "SimpleLayout",
    authToken: null
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    },
    setAuthToken(state, token) {
      state.authToken = token;
    }
  },
  getters: {
    layout(state) {
      return state.layout;
    },
    authToken(state) {
      return state.authToken;
    }
  }
});
