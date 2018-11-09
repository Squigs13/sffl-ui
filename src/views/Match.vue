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
                            {{ getMinsPlayed(data.item['Stat']) }}
                        </template>
                        <template slot="T" slot-scope="data">
                            {{ getTackles(data.item['Stat']) }}
                        </template>
                        <template slot="P" slot-scope="data">
                            {{ getPasses(data.item['Stat']) }}
                        </template>
                        <template slot="G" slot-scope="data">
                            {{ getGoalsScored(data.item['Stat']) }}
                        </template>
                        <template slot="A" slot-scope="data">
                            {{ getGoalAssists(data.item['Stat']) }}
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
                            {{ getMinsPlayed(data.item['Stat']) }}
                        </template>
                        <template slot="T" slot-scope="data">
                            {{ getTackles(data.item['Stat']) }}
                        </template>
                        <template slot="P" slot-scope="data">
                            {{ getPasses(data.item['Stat']) }}
                        </template>
                        <template slot="G" slot-scope="data">
                            {{ getGoalsScored(data.item['Stat']) }}
                        </template>
                        <template slot="A" slot-scope="data">
                            {{ getGoalAssists(data.item['Stat']) }}
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
        getMinsPlayed(stats) {
            const statArray = Array.from(stats)
            const mins = statArray.find(element => element['@Type'] === 'mins_played')
            if (typeof(mins) != 'undefined') {
                return mins['$']
            } else {
                return 0
            }
        },
        getGoalsScored(stats) {
            const statArray = Array.from(stats)
            const goals = statArray.find(element => element['@Type'] === 'goals')
            if (typeof(goals) != 'undefined') {
                return goals['$']
            } else {
                return 0
            }
        },
        getGoalAssists(stats) {
            const statArray = Array.from(stats)
            const assists = statArray.find(element => element['@Type'] === 'goal_assist')
            if (typeof(assists) != 'undefined') {
                return assists['$']
            } else {
                return 0
            }
        },
        getPasses(stats) {
            const statArray = Array.from(stats)
            const passes = statArray.find(element => element['@Type'] === 'accurate_pass')
            if (typeof(passes) != 'undefined') {
                return passes['$']
            } else {
                return 0
            }
        },
        getTackles(stats) {
            const statArray = Array.from(stats)
            const saves = statArray.find(element => element['@Type'] === 'saves')
            const tackles = statArray.find(element => element['@Type'] === 'won_tackle')
            const interceptions = statArray.find(element => element['@Type'] === 'interception_won')
            const clearances = statArray.find(element => element['@Type'] === 'effective_clearance')
            var total = 0
            total += (typeof(saves) != 'undefined') ? parseInt(saves['$']) : 0 
            total += (typeof(tackles) != 'undefined') ? parseInt(tackles['$']) : 0
            total += (typeof(interceptions) != 'undefined') ? parseInt(interceptions['$']) : 0 
            total += (typeof(clearances) != 'undefined') ? parseInt(clearances['$']) : 0
            
            return total
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

