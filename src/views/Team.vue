<template>
    <b-container>
        <b-card bg-variant="light"
                :header="team.name">
            <b-table striped small responsive :items="lineup" :fields="fields">
              <template slot="player_id" slot-scope="data">
                    <router-link :to="`/players/${data.item.player_id}`">
                        {{ getPlayerName(data.item.player_id) }}
                    </router-link>
              </template>
              <template slot="club" slot-scope="data">
                    {{ getPlayerClub(data.item.player_id) }}
              </template>
              <template slot="position" slot-scope="data">
                    {{ getPlayerPosition(data.item.player_id) }}
              </template>
            </b-table>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      fields: [
        { key: 'player_id', label: 'Name' },
        { key: 'club' },
        { key: 'position' }
      ],
      lineup: []
    }
  },
  computed: {
    team () {
      return this.$store.getters.teams.find(element => element.id == this.$route.params.id)
    }
  },
  methods: {
    getPlayerName (playerId) {
      const player = this.$store.getters.players.find(element => element.id == playerId)
      if (player.knownas == '') {
        return player.firstname + ' ' + player.lastname
      } else {
        return player.knownas
      }
    },
    getPlayerPosition (playerId) {
      const player = this.$store.getters.players.find(element => element.id == playerId)
      return player.position
    },
    getPlayerClub (playerId) {
      const player = this.$store.getters.players.find(element => element.id == playerId)
      return player.team_id
    }
  },
  created () {
    axios
      .get('https://www.thesffl.co.uk/api/team/readOne.php?id=' + this.$route.params.id)
      .then(response => {
        this.lineup = response.data.lineup.players
      })
  }
}
</script>

<style>

</style>
