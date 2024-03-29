import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import authentication from 'src/store/authentication';

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  authentication: keyof typeof authentication;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);
  return new Vuex.Store<StateInterface>({
    modules: {
      authentication,
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  });
});
