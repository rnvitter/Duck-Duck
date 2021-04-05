import * as fb from '@/firebase';
import router from '@/router';
import { auth } from '@/firebase';
import md5 from 'md5';

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

      const imageUrl = [
        `https://www.gravatar.com/avatar/`,
        md5('ryanvitter@gmail.com'.trim().toLowerCase()),
        `?s=60`,
        `&d=retro`
      ];
      const image = imageUrl.join('')

      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        image
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
    async logout ({ commit, rootState }) {
      if (rootState.polls.pollListenerUnsubscribe) rootState.polls.pollListenerUnsubscribe();
      if (rootState.polls.votesListenerUnsubscribe) rootState.polls.votesListenerUnsubscribe();
      await fb.auth.signOut();

      commit('setUserProfile', {});

      router.push('/login');
    },
  },
  getters: {
    userId () {
      return auth.currentUser.uid
    },
    userProfile (state) {
      return state.userProfile
    }
  }
}
