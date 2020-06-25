<template>
    <div id="main">
        <b-navbar :fixed-top="true" :transparent="true" shadow>
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img
                            src="https://pbs.twimg.com/profile_images/900395592312029185/rb4SW1qp_400x400.jpg"
                            alt="Lightweight UI components for Vue.js based on Bulma"
                    >
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    Home
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div" v-if="user.login && user.role==='writer'">
                    <div class="buttons">
                        <button class="button is-primary" @click="$router.push({path:'/post'})">
                            New post
                        </button>
                    </div>
                </b-navbar-item>
                <b-navbar-item tag="div" v-if="!user.login">
                    <div class="buttons">
                        <button class="button is-primary" @click="$router.push({path:'/login'})">
                            Log in
                        </button>
                    </div>
                </b-navbar-item>
                <b-navbar-item tag="div" v-else>
                    <div class="buttons">
                        <button class="button" @click="unlogin">
                            Sign out
                        </button>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>

    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props: ['user'],
        methods: {
            unlogin() {
                this.$emit('do_unlogin')
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style scoped>

</style>
