<template>
    <b-container>
        <b-card bg-variant="light"
                :header="teamname">
            <b-table striped small :items="items" :fields="fields">
              <template slot="Name" slot-scope="data">
                    <router-link :to="`/players/${data.item.id}`">
                        <span v-if="data.item.known == ''">{{ data.item.first }} {{ data.item.last }}</span>
                        <span v-else>{{ data.item.known }}</span>
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
        { key: 'Name' },
        { key: 'club', label:"Club", sortable: true, sortDirection: 'asc' },
        { key: 'position', sortable: true }
      ],
      teamname: ""
    }
  },
  created() {
    axios
      .get('https://sffl-squigs.c9users.io/api/team/readOne.php?id=' + this.$route.params.id)
      .then(response => {
          this.items = response.data.squad
          this.teamname = response.data.name
      })
  }
}
</script>

<style>

</style>
