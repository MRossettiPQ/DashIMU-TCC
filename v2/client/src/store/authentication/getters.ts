import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { State } from 'src/store/authentication/index';
import _ from 'lodash';

const getters: GetterTree<State, StateInterface> = {
  logged(state: State) {
    return state.loggedIn && !_.isNil(state.user);
  },
};

export default getters;
