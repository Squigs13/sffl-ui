<template>
    <b-navbar fixed="top" toggleable="md" type="light" variant="light">
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand to="/">thesffl.co.uk</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                <b-nav-item-dropdown text="My Team">
                    <b-dropdown-item to="/login">Squad</b-dropdown-item>
                    <b-dropdown-item href="#">Starting Lineup</b-dropdown-item>
                    <b-dropdown-item href="#">Squad Statistics</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="League">
                    <b-dropdown-item href="#">Standings</b-dropdown-item>
                    <b-dropdown-item href="#">Players</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item href="#">Live</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item href="#">Free Agency</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Info">
                    <b-dropdown-item href="#">Fixtures</b-dropdown-item>
                    <b-dropdown-item href="#">Results</b-dropdown-item>
                    <b-dropdown-item href="#">Player History</b-dropdown-item>
                    <b-dropdown-item href="#">League Leaders</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Admin" v-if="isAdmin">
                    <b-dropdown-item href="#">Users</b-dropdown-item>
                    <b-dropdown-item href="#">Teams</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/logout">Logout</b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
export default {
    data() {
        return {
            isAdmin: true
        }
    }
}
</script>

<style>
</style>
