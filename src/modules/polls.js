import * as fb from '@/firebase';
import { auth } from '@/firebase';

const store = {
  state: {
    // polls: [
    //   {
    //     id: 1,
    //     name: 'Movie Night 3/31/30',
    //     items: ['Judas and the Black Messiah', 'Star Wars: A New Hope', 'Soul', 'Wall-E', 'Goodwill Hunting']
    //   },
    //   {
    //     id: 2,
    //     name: 'Next Binge Watch',
    //     items: ['Fargo', 'Parks & Rec', 'What We Do In The Shadows', 'The Mandolorian']
    //   },
    //   {
    //     id: 3,
    //     name: 'Next Book For Book Club',
    //     items: ['March', 'The Human Cosmos', 'It\'s What I Do', 'Moon Walking With Einstein']
    //   }
    // ]
    polls: [],
    votes: []
  },
  mutations: {
    setPolls (state, polls) {
      state.polls = polls
    },
    setVotes (state, votes) {
      state.votes = votes
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
          username: user.username,
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
      fb.pollsCollection.orderBy('created', 'desc').onSnapshot(snapshot => {
        let polls = []
        snapshot.forEach(doc => {
          let poll = doc.data()
          poll.id = doc.id
          polls.push(poll)
        })
        commit('setPolls', polls)
      })
    },
    async getVotes ({ commit }, poll) {
      fb.votesCollection.where('poll', '==', poll).onSnapshot(snapshot => {
        let votes = []
        snapshot.forEach(doc => {
          let vote = doc.data()
          vote.id = doc.id
          votes.push(vote)
        })
        commit('setVotes', votes)
      })
    }
  },
  getters: {
    polls: (state) => (id) => {
      if (id) {
        return state.polls.find(p => p.id === id)
      }
      return state.polls
    },
    votes: (state) => (id) => {
      return state.votes.filter(v => v.poll === id)
    }
  }
}

export default store
