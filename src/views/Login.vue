<template>
    <div id="main">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-8 is-centered">
                    <div class="modal-card">
                        <header class="modal-card-head has-background-white">
                            <p class="modal-card-title">Login</p>
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Email">
                                <b-input
                                        type="email"
                                        v-model="form.email"
                                        placeholder="Your email"
                                        required>
                                </b-input>
                            </b-field>
                            <b-field label="Password">
                                <b-input
                                        type="password"
                                        v-model="form.password"
                                        password-reveal
                                        placeholder="Your password"
                                        required>
                                </b-input>
                            </b-field>
                        </section>
                        <footer class="modal-card-foot has-background-white">
                            <button class="button is-primary" @click="login" size="is-large">Login</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        props: ['user'],
        data: () => ({
            isComponentModalActive: false,
            form: {
                email: null,
                password: null
            }
        }),
        methods: {
            login() {
                axios.get('http://localhost:3000/users?login='+this.form.email).then((res) => {
                    let users = res.data;
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].password.toString() === this.form.password) {
                            this.$emit('do_login', users[i])
                            this.$router.push({path: '/'})
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
