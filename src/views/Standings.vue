<template>
    <b-container>
        <b-card bg-variant="light"
                header="Current Standings">
            <b-table striped small :items="items" :fields="fields" sort-by="pts" sort-desc>
              <template slot="teamname" slot-scope="data">
                    <router-link :to="`/teams/${data.item.id}`">
                        {{ data.item.teamname }}
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
      items: [],
      fields: [
        { key: 'teamname', label: 'Team' },
        { key: 'pts' }
      ]
    }
  },
  created() {
    axios
      .get('https://sffl-squigs.c9users.io/api/team/read.php')
      .then(response => (this.items = response.data.teams))
  }
}
</script>

<style>

</style>
