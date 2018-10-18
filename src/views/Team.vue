<template>
    <b-container>
        <b-card bg-variant="light"
                :header="team.teamname">
            <b-table striped small :items="team.squad" :fields="fields">
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
export default {
  data () {
    return {
      fields: [
        { key: 'Name' },
        { key: 'club', label: 'Club', sortable: true, sortDirection: 'asc' },
        { key: 'position', sortable: true }
      ]
    }
  },
  computed: {
    team () {
      return this.$store.getters.teams.find(element => element.id == this.$route.params.id)
    }
  }
}
</script>

<style>

</style>
