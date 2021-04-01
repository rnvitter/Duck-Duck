export default {
  state: {
    polls: [
      {
        id: 1,
        name: 'Movie Night 3/31/30',
        items: ['Judas and the Black Messiah', 'Star Wars: A New Hope', 'Soul', 'Wall-E', 'Goodwill Hunting']
      },
      {
        id: 2,
        name: 'Next Binge Watch',
        items: ['Fargo', 'Parks & Rec', 'What We Do In The Shadows', 'The Mandolorian']
      },
      {
        id: 3,
        name: 'Next Book For Book Club',
        items: ['March', 'The Human Cosmos', 'It\'s What I Do', 'Moon Walking With Einstein']
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    polls: (state) => (id) => {
      if (id) {
        return state.polls.find(p => p.id === parseInt(id))
      }
      return state.polls
    }
  }
}
