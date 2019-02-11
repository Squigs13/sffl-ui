<template>
  <b-container class="home">
    <b-jumbotron header="SFFL UI" lead="An updated UI using Bootstrap 4 and VueJS" >
      <p>This is a work in progress</p>
      <b-btn variant="primary" to="/login" v-if="!isLoggedIn">Log In</b-btn>
      <b-btn variant="primary" to="/standings" v-else>League Standings</b-btn>
    </b-jumbotron>
  </b-container>
</template>
<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
<style>
.home {text-align: center;}
</style>
