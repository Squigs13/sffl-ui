<template>
    <b-container>
        <b-row>
            <b-col>
                <b-card>
                    <h2 class="text-center">Fixtures & Results</h2>
                    <b-pagination align="center" v-model="week" :total-rows="totalRows" :per-page="perPage">

                    </b-pagination>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card no-body :header="currentWeek">
                    <b-list-group flush>
                        <b-list-group-item v-for="fixture in filteredFixtures" :key="fixture.id" :to="`/match/${fixture.match_id}`">
                            <template>
                                <div class="d-flex">
                                    <b-col cols="5" class="text-right p-0">
                                        {{ getClubFromAbbr(fixture.home_team) }}
                                    </b-col>
                                    <b-col cols="2" class="text-center p-0" v-if="fixture.status === 'Scheduled'">
                                        v
                                    </b-col>
                                    <b-col cols="2" class="text-center p-0" v-else>
                                        {{ fixture.home_score + ' - ' + fixture.away_score }}
                                    </b-col>
                                    <b-col cols="5" class="p-0">
                                        {{ getClubFromAbbr(fixture.away_team) }}
                                    </b-col>
                                </div>
                            </template>
                        </b-list-group-item>
                    </b-list-group>
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
      fixtures: [],
      week: 1,
      perPage: 1,
      totalRows: 38
    }
  },
  computed: {
    filteredFixtures () {
      let filtered = this.fixtures
      if (this.week) {
        filtered = this.fixtures.filter(
          f => f.week === this.week
        )
      }
      return filtered
    },
    currentWeek () {
      return 'Week ' + this.week
    }
  },
  methods: {
    getClubFromAbbr (clubAbbr) {
      const club = this.$store.getters.clubs.find(element => element.abbr === clubAbbr)
      return club.short_name
    }
  },
  created () {
    axios
      .get('https://www.thesffl.co.uk/api/fixture/read.php?season=2018')
      .then(response => {
        this.fixtures = response.data.fixtures
        this.week = response.data.current_week
      })
  }
}
</script>

<style>

</style>
