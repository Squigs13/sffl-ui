<template>
    <b-container>
        <b-row>
            <b-col>
                <b-card>
                    <h1 class="text-center" v-if="player.knownas == ''">{{ player.firstname }} {{ player.lastname }}</h1>
                    <h1 class="text-center" v-else>{{ player.knownas }}</h1>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12" md="6">
                <b-card header="Player Details" no-body>
                    <b-list-group>
                        <b-list-group-item>Club: {{ getClubFromAbbr(player.team_id) }}</b-list-group-item>
                        <b-list-group-item>Position: {{ player.position }}</b-list-group-item>
                        <b-list-group-item>Squad Number: {{ player.shirt_no}}</b-list-group-item>
                        <b-list-group-item v-if="player.news != ''">Info: {{ player.news }}</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col sm="12" md="6">
                <b-card header="Quick Stats" no-body>
                    <b-list-group>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Minutes: <b-badge variant="primary" pill>{{ player.mins }}</b-badge></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Tackles: <b-badge variant="primary" pill>{{ player.tackles }}</b-badge></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Passes: <b-badge variant="primary" pill>{{ player.passes }}</b-badge></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Goals: <b-badge variant="primary" pill>{{ player.goals }}</b-badge></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Assists: <b-badge variant="primary" pill>{{ player.assists }}</b-badge></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Clean Sheets: <b-badge variant="primary" pill>{{ player.cleansheets }}</b-badge></b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">Team Points: <b-badge variant="primary" pill>{{ player.pts }}</b-badge></b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Detailed Stats">
                    <b-table hover small responsive :items="stats" :fields="fields">
                        <template slot="date" slot-scope="data">
                            {{ data.item.date | moment("DD MMM") }}
                        </template>
                        <template slot="score" slot-scope="data">
                            <router-link :to="`/match/${data.item.match_id}`">
                                {{ data.item.score }}
                            </router-link>
                        </template>
                        <template slot="opponent_id" slot-scope="data">
                            {{ getClubName(data.item.opponent_id) }}
                        </template>
                    </b-table>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="History">
                    <b-table hover small responsive :items="history" :fields="historyFields">
                        <template slot="season_id" slot-scope="data">
                            {{ getSeason(data.item.season_id) }}
                        </template>
                        <template slot="club_id" slot-scope="data">
                            {{ getClubName(data.item.club_id) }}
                        </template>
                    </b-table>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      stats: [],
      history: [],
      fields: [
        { key: 'date' },
        { key: 'opponent_id', label: 'Opponent' },
        { key: 'score' },
        { key: 'mins' },
        { key: 'tackles' },
        { key: 'passes' },
        { key: 'goals' },
        { key: 'assists' },
        { key: 'cleansheets', label: 'CS' },
        { key: 'pts' }
      ],
      historyFields: [
        { key: 'season_id', label: 'Season' },
        { key: 'club_id', label: 'Club' },
        { key: 'mins' },
        { key: 'tackles' },
        { key: 'passes' },
        { key: 'goals' },
        { key: 'assists' },
        { key: 'cleansheets', label: 'CS' },
        { key: 'pts' }
      ]
    }
  },
  computed: {
    player () {
      return this.$store.getters.players.find(element => element.id == this.$route.params.id)
    }
  },
  methods: {
    getClubName (clubId) {
      const club = this.$store.getters.clubs.find(element => element.id == clubId)
      return club.name
    },
    getClubFromAbbr (clubAbbr) {
      const club = this.$store.getters.clubs.find(element => element.abbr === clubAbbr)
      return club.name
    },
    getSeason (seasonId) {
      const slice = seasonId.slice(2)
      const endYear = parseInt(slice) + 1
      return seasonId + '/' + endYear
    }
  },
  created() {
      axios
        .get('https://www.thesffl.co.uk/api/player/readOne.php?id=' + this.$route.params.id)
        .then(response => {
          this.history = response.data.history
          this.stats = response.data.stats
        })
  }
}
</script>

<style>
 .row {
     padding-bottom: 1rem;
 }
</style>
