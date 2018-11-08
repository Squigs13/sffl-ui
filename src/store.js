import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    clubs: [],
    teams: []
  },
  mutations: {
    'GET_PLAYERS' (state) {
      axios
        .get('http://api.thesffl.co.uk/player/read.php')
        .then(response => {
          state.players = response.data.players
        })
    },
    'GET_CLUBS' (state) {
      axios
        .get('http://api.thesffl.co.uk/club/read.php')
        .then(response => {
          state.clubs = response.data.clubs
        })
    },
    'GET_TEAMS' (state) {
      axios
        .get('http://api.thesffl.co.uk/team/read.php')
        .then(response => {
          state.teams = response.data.teams
        })
    }
  },
  actions: {
    getPlayers: ({ commit }) => {
      commit('GET_PLAYERS')
    },
    getClubs: ({ commit }) => {
      commit('GET_CLUBS')
    },
    getTeams: ({ commit }) => {
      commit('GET_TEAMS')
    }
  },
  getters: {
    players: state => {
      return state.players
    },
    clubs: state => {
      return state.clubs
    },
    teams: state => {
      return state.teams
    }
  }
})
