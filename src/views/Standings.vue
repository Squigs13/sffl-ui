<template>
    <b-container>
        <b-card bg-variant="light"
                header="Current Standings">
            <b-table striped small :items="items" :fields="fields" sort-by="Pts" sort-desc></b-table>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      items: [],
      fields: ['Team', 'Pts', { key: 'Diff', label: '+/-' }]
    }
  },
  created() {
    axios
      .get('https://sffl-data.firebaseio.com/standings.json')
      .then(response => (this.items = response.data))
  }
}
</script>

<style>

</style>
