import * as fb from '@/firebase';
import router from '@/router';

export default {
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async login ({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      dispatch('fetchUserProfile', user)
    },
    async signup ({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email
      })

      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile ({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout ({ commit }) {
      await fb.auth.signOut()

      commit('setUserProfile', {})

      router.push('/login')
    },
  },
  getters: {
    userProfile (state) {
      return state.userProfile
    }
  }
}
