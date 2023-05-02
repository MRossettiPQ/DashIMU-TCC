import AuthenticationService from "src/commons/services/AuthenticationService";
import StorageUtils from "src/commons/utils/StorageUtils";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = { status: { loggedIn: !!user }, user };

export default {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      if (user?.accessToken) {
        commit("loginSuccess", user);
      } else {
        commit("loginFailure");
      }
      return user;
    },
    async context({ commit }) {
      let context = null;
      try {
        if (initialState.user != null) {
          context = await AuthenticationService.context();
          commit("loginSuccess", context);
        }
      } catch (e) {
        console.log(e);
        commit("logout");
      }
      return context;
    },
    async logout({ commit }) {
      commit("logout");
    },
  },
  mutations: {
    async loginSuccess(state, user) {
      await StorageUtils.setUser(user);
      state.status.loggedIn = true;
      state.user = user;
    },
    async loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    async logout(state) {
      await StorageUtils.remove("user");
      state.status.loggedIn = false;
      state.user = null;
      await this.$router.push("/");
    },
  },
};
