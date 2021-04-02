import { createStore } from 'vuex'
import modules from './modules'

const strict = process.env.NODE_ENV !== 'production'

export const store = createStore({
  modules,
  strict
});
