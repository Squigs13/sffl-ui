<template>
    <b-container>
        <b-card bg-variant="light"
                header="Current Standings">
            <b-table striped small :items="items" :fields="fields" sort-by="Pts" sort-desc="true"></b-table>
        </b-card>
    </b-container>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { Team: 'Rovers', Pts: 20, Diff: '+3' },
        { Team: 'United', Pts: 18, Diff: '-0.5' },
        { Team: 'City', Pts: 14, Diff: '0' },
        { Team: 'Town', Pts: 10, Diff: '+0.5' },
        { Team: 'Athletic', Pts: 8, Diff: '+1.5' },
        { Team: 'County', Pts: 27, Diff: '-2.5' },
        { Team: 'Wanderers', Pts: 7, Diff: '-2' },
        { Team: 'Forest', Pts: 5, Diff: '+1' }
      ],
      fields: ['Team', 'Pts', { key: 'Diff', label: '+/-' }]
    }
  }
}
</script>

<style>

</style>
