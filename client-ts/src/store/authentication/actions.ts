import { ActionContext, ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { User } from 'src/common/models/User';
import { State } from 'src/store/authentication/index';

const actions: ActionTree<State, StateInterface> = {
  async login({ commit }: ActionContext<State, unknown>, user: User) {
    if (user?.accessToken) {
      commit('login', user);
    } else {
      commit('logout');
    }
    return user;
  },
  async logout({ commit }: ActionContext<State, unknown>) {
    commit('logout');
  },
};

export default actions;
