<template>
    <b-container v-if="teamData.length > 0">
        <b-row>
            <b-col sm="12" md="6">
                <b-card>
                    <h3 class="d-flex justify-content-between align-items-center">{{ teamData[0].Name }} <span>{{ matchData.TeamData[0]['@Score'] }}</span></h3>
                    <div class="text-right" v-if="matchData.TeamData[0].Goal">
                        <ul v-if="matchData.TeamData[0].Goal.length">
                            <li v-for="goal in matchData.TeamData[0].Goal" :key="goal['@EventID']">
                                {{ getGoalDetails(goal) }}
                            </li>
                        </ul>
                        <ul v-else>
                            <li>
                                {{ getGoalDetails(matchData.TeamData[0].Goal) }}
                            </li>
                        </ul>
                    </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="6">
                <b-card>
                    <h3 class="d-flex justify-content-between align-items-center">{{ teamData[1].Name }} <span>{{ matchData.TeamData[1]['@Score'] }}</span></h3>
                    <div class="text-right" v-if="matchData.TeamData[1].Goal">
                        <ul v-if="matchData.TeamData[1].Goal.length">
                            <li v-for="goal in matchData.TeamData[1].Goal" :key="goal['@EventID']">
                                {{ getGoalDetails(goal) }}
                            </li>
                        </ul>
                        <ul v-else>
                            <li>
                                {{ getGoalDetails(matchData.TeamData[1].Goal) }}
                            </li>
                        </ul>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12" md="6">
                <b-card :header="teamData[0].Name + ' Stats'" no-body>
                    <b-table class="match-lineup" small responsive hover :items="matchData.TeamData[0].PlayerLineUp.MatchPlayer" :fields="lineupFields">
                        <template slot="@PlayerRef" slot-scope="data">
                            {{ data.item['@ShirtNumber'] }}.
                            <router-link :to="`/players/${data.item['@PlayerRef'].substring(1)}`">
                                {{ getPlayerName(data.item['@PlayerRef'].substring(1)) }}
                            </router-link>
                            <i class='fas fa-square' style='color: yellow;' v-if="getStatValue(data.item['Stat'], 'yellow_card') > 0"></i>
                            <i class='fas fa-square' style='color: red;' v-if="getStatValue(data.item['Stat'], 'red_card') > 0"></i>
                            <i class='fas fa-caret-square-right' style='color: red;' v-if="getStatValue(data.item['Stat'], 'total_sub_off') > 0"></i>
                            <i class='fas fa-caret-square-left' style='color: green;' v-if="getStatValue(data.item['Stat'], 'total_sub_on') > 0"></i>
                        </template>
                        <template slot="M" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'mins_played') }}
                        </template>
                        <template slot="T" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'saves') + getStatValue(data.item['Stat'], 'won_tackle') + getStatValue(data.item['Stat'], 'interception_won') + getStatValue(data.item['Stat'], 'effective_clearance') }}
                        </template>
                        <template slot="P" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'accurate_pass') }}
                        </template>
                        <template slot="G" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'goals') }}
                        </template>
                        <template slot="A" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'goal_assist') }}
                        </template>
                    </b-table>
                </b-card>
            </b-col>
            <b-col sm="12" md="6">
                <b-card :header="teamData[1].Name + ' Stats'" no-body>
                    <b-table class="match-lineup" small responsive hover :items="matchData.TeamData[1].PlayerLineUp.MatchPlayer" :fields="lineupFields">
                        <template slot="@PlayerRef" slot-scope="data">
                            {{ data.item['@ShirtNumber'] }}.
                            <router-link :to="`/players/${data.item['@PlayerRef'].substring(1)}`">
                                {{ getPlayerName(data.item['@PlayerRef'].substring(1)) }}
                            </router-link>
                            <i class='fas fa-square' style='color: yellow;' v-if="getStatValue(data.item['Stat'], 'yellow_card') > 0"></i>
                            <i class='fas fa-square' style='color: red;' v-if="getStatValue(data.item['Stat'], 'red_card') > 0"></i>
                            <i class='fas fa-caret-square-right' style='color: red;' v-if="getStatValue(data.item['Stat'], 'total_sub_off') > 0"></i>
                            <i class='fas fa-caret-square-left' style='color: green;' v-if="getStatValue(data.item['Stat'], 'total_sub_on') > 0"></i>
                        </template>
                        <template slot="M" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'mins_played') }}
                        </template>
                        <template slot="T" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'saves') + getStatValue(data.item['Stat'], 'won_tackle') + getStatValue(data.item['Stat'], 'interception_won') + getStatValue(data.item['Stat'], 'effective_clearance') }}
                        </template>
                        <template slot="P" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'accurate_pass') }}
                        </template>
                        <template slot="G" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'goals') }}
                        </template>
                        <template slot="A" slot-scope="data">
                            {{ getStatValue(data.item['Stat'], 'goal_assist') }}
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
      matchData: {
        MatchInfo: {
          Attendance: ''
        }
      },
      teamData: [],
      lineupFields: [
        { key: '@PlayerRef', label: '' },
        { key: 'M' },
        { key: 'T' },
        { key: 'P' },
        { key: 'G' },
        { key: 'A' }
      ]
    }
  },
  methods: {
    getPlayerName (playerId) {
      const player = this.$store.getters.players.find(element => element.id == playerId)
      if (player.knownas == '') {
        return player.firstname.substring(0, 1) + '. ' + player.lastname
      } else {
        return player.knownas
      }
    },
    getStatValue (stats, statType) {
      const statArray = Array.from(stats)
      const statValue = statArray.find(element => element['@Type'] === statType)
      if (typeof (statValue) !== 'undefined') {
        return parseInt(statValue['$'])
      } else {
        return 0
      }
    },
    getGoalDetails (goal) {
      const scorerId = goal['@PlayerRef'].substring(1)
      const scorerName = this.getPlayerName(scorerId)
      const goalMinute = goal['@Min']
      const goalType = goal['@Type']

      if (goalType === 'Own') {
        return scorerName + " (O.G.) - '" + goalMinute
      }

      if (goal.Assist) {
        let assistId = goal.Assist['@PlayerRef'].substring(1)
        let assistName = this.getPlayerName(assistId)

        return scorerName + ' (' + assistName + ") - '" + goalMinute
      } else {
        return scorerName + " - '" + goalMinute
      }
    }
  },
  created () {
    axios
      .get('https://www.thesffl.co.uk/api/match/readOne.php?id=' + this.$route.params.id)
      .then(response => {
        this.matchData = response.data.SoccerFeed.SoccerDocument.MatchData
        this.teamData = response.data.SoccerFeed.SoccerDocument.Team
      })
  }
}
</script>
<style>
li {list-style: none;}
.match-lineup tr:nth-of-type(11) { border-bottom: 2px solid black; }
</style>
