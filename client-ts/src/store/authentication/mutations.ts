import { MutationTree } from 'vuex';
import { User } from 'src/common/models/User';
import { State } from 'src/store/authentication/index';

const mutation: MutationTree<State> = {
  async login(state: State, user: User) {
    state.loggedIn = true;
    state.user = user;
  },
  async logout(state: State) {
    state.loggedIn = false;
    state.user = null;
  },
};

export default mutation;
