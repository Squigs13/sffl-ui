<template>
    <b-container>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="GK" active>
                    <b-table responsive striped :items="players.gk" :fields="fields" sort-direction="desc" sort-by="Club">
                        <template slot="Name" slot-scope="data">
                            <router-link :to="`/players/${data.item.id}`">
                                {{data.value}}
                            </router-link>
                        </template>
                    </b-table>
                </b-tab>
                <b-tab title="DF">
                    <b-table responsive striped :items="players.df" :fields="fields" sort-direction="desc" sort-by="Club">
                        <template slot="Name" slot-scope="data">
                            <router-link :to="`/players/${data.item.id}`">
                                {{data.value}}
                            </router-link>
                        </template>
                    </b-table>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
</template>
<script>
export default {
  data () {
    return {
      players: {
        gk: [
          { id: 254839, Name: 'Petr Cech', Club: 'ARS', Mins: 90, Tackles: 6, Passes: 24, Goals: 0, Assists: 0, Pts: 0 },
          { id: 34785, Name: 'David de Gea', Club: 'MNU', Mins: 90, Tackles: 4, Passes: 43, Goals: 0, Assists: 0, Pts: 3 }
        ],
        df: [
          { id: 76284, Name: 'Harry Maguire', Club: 'LEI', Mins: 90, Tackles: 6, Passes: 43, Goals: 0, Assists: 0, Pts: 1 },
          { id: 7384, Name: 'Chris Smalling', Club: 'MNU', Mins: 90, Tackles: 4, Passes: 34, Goals: 0, Assists: 1, Pts: 3 }
        ]
      },
      fields: [
        { key: 'Name', sortable: true, sortDirection: 'asc' },
        { key: 'Club', sortable: true, sortDirection: 'asc' },
        { key: 'Mins', sortable: true },
        { key: 'Tackles', sortable: true },
        { key: 'Passes', sortable: true },
        { key: 'Goals', sortable: true },
        { key: 'Assists', sortable: true },
        { key: 'Pts', sortable: true }
      ]
    }
  }
}
</script>
