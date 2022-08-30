import Authentication from "src/commons/services/AuthenticationService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export default {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      const login = await Authentication.login(user);
      if (login?.accessToken) {
        localStorage.setItem("user", JSON.stringify(login));
        commit("loginSuccess", login);
      } else {
        commit("loginFailure");
      }
      return login;
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    },
    register({ commit }, user) {
      const register = Authentication.register(user);
      if (register) {
        commit("registerSuccess");
        return register;
      } else {
        commit("registerFailure");
        return false;
      }
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
