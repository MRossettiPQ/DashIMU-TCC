import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import Authentication from "src/commons/services/AuthenticationService";

@Module
export default class Authentication2 extends VuexModule {
  user = null;

  state = null;

  constructor(module) {
    super(module);

    this.user = JSON.parse(localStorage.getItem("user"));
    this.state = this.user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };
  }

  @Mutation
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  }

  @Mutation
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  }

  @Mutation
  async logoutMutation(state) {
    state.status.loggedIn = false;
    state.user = null;
    await this.$router.push("/");
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: "increment" })
  incr() {
    return 5;
  }

  @Action({ commit: "login" })
  async login({ commit }, user) {
    if (user?.accessToken) {
      localStorage.setItem("user", JSON.stringify(user));
      commit("loginSuccess", user);
    } else {
      commit("loginFailure");
    }
    return user;
  }

  @Action({ commit: "context" })
  async context({ commit }) {
    let context = null;
    try {
      if (initialState.user != null) {
        context = await Authentication.context();
        commit("loginSuccess", context);
      }
    } catch (e) {
      console.log(e);
      commit("logout");
    }
    return context;
  }

  @Action({ commit: "logout" })
  logout({ commit }) {
    localStorage.removeItem("user");
    commit("logout");
  }
}
