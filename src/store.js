import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    clubs: []
  },
  mutations: {
    'GET_PLAYERS' (state) {
      axios
      .get('https://sffl-squigs.c9users.io/api/player/read.php')
      .then(response => {
          state.players = response.data.players
      })
    },
    'GET_CLUBS' (state) {
      axios
      .get('https://sffl-squigs.c9users.io/api/club/read.php')
      .then(response => {
          state.clubs = response.data.clubs
      })
    }
  },
  actions: {
    getPlayers: ({ commit }) => {
      commit('GET_PLAYERS');
    },
    getClubs: ({ commit }) => {
      commit('GET_CLUBS');
    }
  },
  getters: {
    players: state => {
      return state.players;
    },
    clubs: state => {
      return state.clubs;
    }
  }
})
