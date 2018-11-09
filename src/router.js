import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/standings',
      name: 'standings',
      component: () => import(/* webpackChunkName: "standings" */ './views/Standings.vue')
    },
    {
      path: '/players',
      name: 'players',
      component: () => import(/* webpackChunkName: "players" */ './views/Players.vue')
    },
    {
      path: '/players/:id',
      name: 'player',
      component: () => import(/* webpackChunkName: "player" */ './views/Player.vue')
    },
    {
      path: '/teams/:id',
      name: 'teams',
      component: () => import(/* webpackChunkName: "team" */ './views/Team.vue')
    },
    {
      path: '/match/:id',
      name: 'match',
      component: () => import(/* webpackChunkName: "match" */ './views/Match.vue')
    }
  ]
})
