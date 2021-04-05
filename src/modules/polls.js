import * as fb from '@/firebase';
import { auth } from '@/firebase';

const store = {
  state: {
    polls: [],
    pollListenerUnsubscribe: null,
    votes: [],
    votesListenerUnsubscribe: null
  },
  mutations: {
    setPolls (state, polls) {
      state.polls = polls
    },
    setPollListenerUnsubscribe (state, listener) {
      state.pollListenerUnsubscribe = listener
    },
    setVotes (state, votes) {
      state.votes = votes
    },
    setVotesListenerUnsubscribe (state, listener) {
      state.votesListenerUnsubscribe = listener
    }
  },
  actions: {
    async createPoll({ rootState }, poll) {
      const user = rootState.user.userProfile
      // create post in firebase
      await fb.pollsCollection.add({
        name: poll.name,
        items: poll.items,
        created: new Date(),
        author: {
          userId: auth.currentUser.uid,
          name: user.name,
          image: user.image
        }
      })
    },
    async saveVote (state, { poll, user, vote }) {
      await fb.votesCollection.add({
        poll,
        user,
        vote
      })
    },
    async updateVote (state, { voteId, vote }) {
      await fb.votesCollection.doc(voteId).update({
        vote
      })
    },
    async setPolls ({ commit }) {
      const listener = fb.pollsCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
        let polls = []
        snapshot.forEach(doc => {
          let poll = doc.data()
          poll.id = doc.id
          polls.push(poll)
        })
        commit('setPolls', polls)
      })
      commit('setPollListenerUnsubscribe', listener)
    },
    async getVotes ({ commit }, poll) {
      const listener = fb.votesCollection.where('poll', '==', poll).onSnapshot(snapshot => {
        let votes = []
        snapshot.forEach(doc => {
          let vote = doc.data()
          vote.id = doc.id
          votes.push(vote)
        })
        commit('setVotes', votes)
      })
      commit('setVotesListenerUnsubscribe', listener)
    }
  },
  getters: {
    polls: (state) => (id) => {
      if (id) {
        return state.polls.find(p => p.id === id)
      }
      return state.polls
    },
    pollListenerUnsubscribe (state) {
      return state.pollListenerUnsubscribe
    },
    votes: (state) => (id) => {
      return state.votes.filter(v => v.poll === id)
    },
    votesListenerUnsubscribe (state) {
      return state.votesListenerUnsubscribe
    }
  }
}

export default store
