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
            <b-col>
                <b-card header="Player Details">
                    <b-list-group>
                        <b-list-group-item>Club: {{ player.team_id }}</b-list-group-item>
                        <b-list-group-item>Position: {{ player.position }}</b-list-group-item>
                        <b-list-group-item>Squad Number: {{ player.shirt_no}}</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col>

            </b-col>
            <b-col>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        computed: {
            player() {
                return this.$store.getters.players.find(element => element.id == this.$route.params.id)
            }
        }
    }
</script>

<style>

</style>
