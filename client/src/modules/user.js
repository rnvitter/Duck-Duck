export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    isAuthenticated (state) {
      return state.auth.loggedIn
    },
    loggedInUser (state) {
      return state.auth.user
    }
  }
}
