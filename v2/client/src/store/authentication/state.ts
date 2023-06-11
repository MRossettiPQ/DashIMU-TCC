import { State } from 'src/store/authentication/index';

function state(): State {
  return { loggedIn: false, user: null } as State;
}

export default state;
