import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    clubs: [],
    teams: [],
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    'GET_PLAYERS' (state) {
      axios
        .get('https://www.thesffl.co.uk/api/player/read.php')
        .then(response => {
          state.players = response.data.players
        })
    },
    'GET_CLUBS' (state) {
      axios
        .get('https://www.thesffl.co.uk/api/club/read.php')
        .then(response => {
          state.clubs = response.data.clubs
        })
    },
    'GET_TEAMS' (state) {
      axios
        .get('https://www.thesffl.co.uk/api/team/read.php')
        .then(response => {
          state.teams = response.data.teams
        })
        .catch(error => console.log(error))
    },
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
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
    },
    login ({ commit, dispatch }, authData) {
      axios.post('https://www.thesffl.co.uk/api/user/login.php', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          // console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.token,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          dispatch('getPlayers')
          dispatch('getClubs')
          dispatch('getTeams')
        })
        .catch(error => console.log(error))
    },
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/login')
    },
    tryAutoLogin ({ commit, dispatch }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
      dispatch('getPlayers')
      dispatch('getClubs')
      dispatch('getTeams')
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
    },
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})
