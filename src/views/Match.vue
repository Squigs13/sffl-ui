<template>
    <b-container>
        <b-row>
            <b-col sm="12" md="6">
                <b-card>
                    <h3 class="d-flex justify-content-between align-items-center">{{ teamData[0].Name }} <span>{{ matchData.TeamData[0]['@Score'] }}</span></h3>
                    <div class="text-right" v-if="matchData.TeamData[0].Goal">
                        <ul v-if="matchData.TeamData[0].Goal.length">
                            <li v-for="goal in matchData.TeamData[0].Goal">
                                {{ getPlayerName(goal['@PlayerRef'].substring(1)) }} '{{ goal['@Min'] }}
                            </li>
                        </ul>
                        <ul v-else>
                            <li>
                                {{ getPlayerName(matchData.TeamData[0].Goal['@PlayerRef'].substring(1)) }} '{{ matchData.TeamData[0].Goal['@Min'] }} 
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
                            <li v-for="goal in matchData.TeamData[1].Goal">
                                {{ getPlayerName(goal['@PlayerRef'].substring(1)) }} '{{ goal['@Min'] }}
                            </li>
                        </ul>
                        <ul v-else>
                            <li>
                                {{ getPlayerName(matchData.TeamData[1].Goal['@PlayerRef'].substring(1)) }} '{{ matchData.TeamData[1].Goal['@Min'] }} 
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
    data() {
        return {
            matchData: {
                MatchInfo: {
                    Attendance: ""
                }
            },
            teamData: [],
            lineupFields: [
                { key: '@PlayerRef', label: '' },
                { key: 'M'},
                { key: 'T'},
                { key: 'P'},
                { key: 'G'},
                { key: 'A'}
            ]
        }
    },
    methods: {
        getPlayerName(playerId) {
            const player = this.$store.getters.players.find(element => element.id == playerId)
            if (player.knownas == '') {
                return player.firstname.substring(0, 1) + '. ' + player.lastname
            } else {
                return player.knownas
            }
        },
        getStatValue(stats, statType) {
            const statArray = Array.from(stats)
            const statValue = statArray.find(element => element['@Type'] === statType)
            if (typeof(statValue) != 'undefined') {
                return parseInt(statValue['$'])
            } else {
                return 0
            }
        }
    },
    created() {
        axios
      .get('http://api.thesffl.co.uk/match/readOne.php?id=' + this.$route.params.id)
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

