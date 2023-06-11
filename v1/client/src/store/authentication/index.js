import _ from "lodash";

const user = JSON.parse(localStorage.getItem("user"));
export default {
  namespaced: true,
  state: { loggedIn: !!user, user },
  getters: {
    logged(state) {
      return state.loggedIn && !_.isNil(state.user);
    },
  },
  actions: {
    async login({ commit }, user) {
      if (user?.accessToken) {
        commit("login", user);
      } else {
        commit("logout");
      }
      return user;
    },
    async logout({ commit }) {
      commit("logout");
    },
  },
  mutations: {
    async login(state, user) {
      state.loggedIn = true;
      state.user = user;
    },
    async logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
  },
};
