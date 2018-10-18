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
                        <b-list-group-item>Club: {{ player.team_id }}</b-list-group-item>
                        <b-list-group-item>Position: {{ player.position }}</b-list-group-item>
                        <b-list-group-item>Squad Number: {{ player.shirt_no}}</b-list-group-item>
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
                    <b-table hover small :items="player.stats" :fields="fields">
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
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                fields: [
                    {key: 'date'},
                    {key: 'opponent_id', label: 'Opponent'},
                    {key: 'score'},
                    {key: 'mins'},
                    {key: 'tackles'},
                    {key: 'passes'},
                    {key: 'goals'},
                    {key: 'assists'},
                    {key: 'cleansheets', label: 'CS'},
                    {key: 'pts'}
                ]
            }
        },
        computed: {
            player() {
                return this.$store.getters.players.find(element => element.id == this.$route.params.id)
            }
        },
        methods: {
            getClubName(club_id) {
                const club = this.$store.getters.clubs.find(element => element.id == club_id)
                return club.name
            }
        }
    }
</script>

<style>
 .row {
     padding-bottom: 1rem;
 }
</style>
