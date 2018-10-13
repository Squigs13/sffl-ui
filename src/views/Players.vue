<template>
    <b-container>
        <b-row>
            <b-col md="6">
                <b-form-group horizontal label="Filter">
                <b-input-group>
                    <b-form-input v-model="filter" placeholder="Type to Search" />
                    <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                    </b-input-group-append>
                </b-input-group>
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
            </b-col>
        </b-row>
        <b-card>
            <b-table 
                responsive
                striped
                bordered
                :items="players"
                :fields="fields"
                sort-direction="desc"
                sort-by="team_id"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
                @filtered="onFiltered">
                <template slot="Name" slot-scope="data">
                    <router-link :to="`/players/${data.item.id}`">
                        {{ data.item.firstname }} {{ data.item.lastname }}
                    </router-link>
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
      players: [],
      fields: [
        { key: 'Name' },
        { key: 'team_id', label:"Club", sortable: true, sortDirection: 'asc' },
        { key: 'mins', sortable: true },
        { key: 'tackles', sortable: true },
        { key: 'passes', sortable: true },
        { key: 'goals', sortable: true },
        { key: 'assists', sortable: true },
        { key: 'cleansheets', label: "CS", sortable: true },
        { key: 'pts', sortable: true }
      ],
      currentPage: 1,
      perPage: 50,
      filter: null,
      totalRows: 50
    }
  },
  created() {
    axios
      .get('https://sffl-squigs.c9users.io/api/player/read.php')
      .then(response => {
          this.players = response.data.players
          this.totalRows = this.players.length
      })
  },
  methods: {
      onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
