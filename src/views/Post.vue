<template>
    <div id="main">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-6 is-centered">
                    <section class="modal-card-body is-centered">
                        <b-field label="Title">
                            <b-input v-model="data.title"></b-input>
                        </b-field>
                        <b-field label="Body">
                            <b-input type="textarea" rows="15" v-model="data.description"></b-input>
                        </b-field>
                        <div class="columns">
                            <div class="column has-text-primary is-centered">
                                Created: {{(new Date(data.createdAt)).toLocaleDateString('en-US')}}
                            </div>
                            <div class="column has-text-primary is-centered ">Updated: {{(new
                                Date(data.createdAt)).toLocaleDateString('en-US')}}
                            </div>
                            <div class="column has-text-primary is-centered ">
                                <b-button icon-left="thumb-up-outline" disabled type="is-primary">
                                    {{data.claps}}
                                </b-button>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column has-text-primary">
                                <b-button icon-left="pencil-outline" type="is-primary" @click="save">
                                    Save
                                </b-button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <b-loading :is-full-page="true" :active.sync="loading.sync" :can-cancel="false"></b-loading>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Post",
        props: ['user'],
        data: () => ({
            data: {
                id: 0,
                title: "",
                description: "",
                createdAt: new Date(),
                updateAt: new Date(),
                claps: 0
            },
            mode: 'create',
            loading: {
                sync: false
            }
        }),
        methods: {
            save() {
                this.loading.sync = true;
                this.data.updateAt = new Date();
                if (this.mode === 'patch') {
                    axios.patch('http://localhost:3000/posts/' + this.data.id, {
                        title: this.data.title,
                        description: this.data.description,
                        updateAt: this.data.updateAt
                    }).then(() => {
                        this.loading.sync = false;
                        this.$router.push({path: '/'})

                    });
                } else {
                    axios.get('http://localhost:3000/posts').then((res) => {
                        this.data.id = res.data.length + 1;
                    });
                    this.data.createdAt = new Date();
                    axios.post('http://localhost:3000/posts/', this.data).then(() => {
                        this.loading.sync = false;
                        this.$router.push({path: '/'})
                    });
                }
            }
        },
        created() {
            if (!this.user.login || this.user.role !== 'writer') {
                this.$router.push({path: '/'})
                return;
            }

            if (this.$route.query.id) {
                this.mode = 'patch';
                this.loading.sync = true;
                axios.get('http://localhost:3000/posts?id=' + this.$route.query.id).then((res) => {
                    if (res.data.length > 0) {
                        this.data = res.data[0];
                    }
                    this.loading.sync = false;
                });
                this.$router.replace({'query': null});
            }
        }
    }
</script>

<style scoped>

</style>
