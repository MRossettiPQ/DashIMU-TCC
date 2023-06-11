import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { User } from 'src/common/models/User';

export interface State {
  user?: User | null;
  loggedIn?: boolean;
}

const authenticationModule: Module<State, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default authenticationModule;
