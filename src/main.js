import VueRouter from "vue-router";
import Vuex from "vuex";
import Vue from 'vue'


import routes from "./routes.js";
import App from "./App.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

const store = new Vuex.Store({
    state: {
        user: {
            login: false,
            role: null,
            id: -1
        }
    },
    mutations: {
        set_user(state, user) {
            state.user = user;
        },
    }
});

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior: () => ({y: 0})
});

new Vue({
    el: "#app",
    router,
    store,
    render: f => f(App)
});
