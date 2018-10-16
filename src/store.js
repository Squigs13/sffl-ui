import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    'GET_PLAYERS' (state) {
      axios
      .get('https://sffl-squigs.c9users.io/api/player/read.php')
      .then(response => {
          state.players = response.data.players
      })
    }
  },
  actions: {
    getPlayers: ({ commit }) => {
      commit('GET_PLAYERS');
    }
  },
  getters: {
    players: state => {
      return state.players;
    }
  }
})
