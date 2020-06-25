<template>
    <div id="main">
        <link rel="stylesheet" href="//cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css">
        <NavBar :user="user" @do_unlogin="unlogin_user"></NavBar>
        <router-view @do_login="login_user" @do_unlogin="unlogin_user" :user="user"></router-view>
    </div>
</template>

<script>
    import NavBar from "./components/NavBar";

    export default {
        components: {NavBar},
        data: () => ({
            user: {
                role: null,
                login: false,
                id: -1
            },
        }),
        methods: {
            login_user(user) {
                this.user = {
                    role: user.role,
                    id: user.id,
                    login: true
                };
                this.$store.commit("set_user", this.user);
            },
            unlogin_user() {
                this.user = {
                    role: null,
                    login: false,
                    id: -1
                };
                this.$store.commit("set_user", this.user);
            }
        },
    }
</script>

<style lang="scss">

</style>
