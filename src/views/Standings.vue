<template>
    <b-container>
        <b-card bg-variant="light"
                header="Current Standings">
            <b-table striped small :items="teams" :fields="fields" sort-by="pts" sort-desc>
              <template slot="name" slot-scope="data">
                    <router-link :to="`/teams/${data.item.id}`">
                        {{ data.item.name }}
                    </router-link>
                </template>
            </b-table>
        </b-card>
    </b-container>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Team' },
        { key: 'pts' }
      ]
    }
  },
  computed: {
    teams () {
      return this.$store.getters.teams
    }
  }
}
</script>

<style>

</style>
