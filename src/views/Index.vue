<template>
    <div id="main">
        <div class="container">
            <div v-for="(post, index) in posts" class="columns is-centered" v-bind:key="index">
                <div class="column is-centered is-6">
                    <div class="column">
                        <div class="columns column">
                            <h4 class="title is-4 is-centered  has-text-primary">{{post.title}}</h4>
                        </div>
                        <div class="columns column">
                            <p>{{post.description}}</p>
                        </div>
                        <div class="columns column is-vcentered is-7">
                            <div class="column is-6">
                                <h4 class="title is-6 is-centered subtitle has-text-primary">
                                    {{(new Date(post.createdAt)).toLocaleDateString('en-US')}}</h4>
                            </div>
                            <div class="column" v-if="user.role==='writer'">
                                <b-button icon-left="pencil-outline" type="is-primary"
                                          @click="edit(post.id)">
                                    Edit
                                </b-button>
                            </div>
                            <div class="column" v-if="user.role==='writer'">
                                <b-button icon-left="trash-can-outline"
                                          @click="deletePost(post.id, index)">
                                    Delete
                                </b-button>
                            </div>
                            <div class="column">
                                <b-button icon-left="thumb-up-outline" :type="claps.includes(index) ? 'is-primary' : ''"
                                          :disabled="user.role!=='reader'" @click="clap(index)">
                                    {{post.claps}}
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-centered" v-if="pagination.total>10">
                <div class="column is-centered">
                    <b-pagination
                            :total="pagination.total"
                            :current.sync="pagination.current-pagination.perPage+1"
                            :per-page="pagination.perPage"
                            order="is-centered" size="default" simple rounded>
                        <b-button slot="previous" class="pagination-previous"
                                  icon-left="chevron-left"
                                  @click="get_posts(pagination.current-pagination.perPage-1)">
                        </b-button>
                        <b-button slot="next" class="pagination-next"
                                  @click="get_posts(pagination.current)"
                                  icon-left="chevron-right">
                        </b-button>
                    </b-pagination>
                </div>
            </div>
            <b-loading :is-full-page="true" :active.sync="loading.sync" :can-cancel="false"></b-loading>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Index",
        props: ['user'],
        data: () => ({
            posts: [],
            claps: [],
            pagination: {
                total: 0,
                perPage: 10,
                rangeBefore: 3,
                rangeAfter: 1,
                current: 10,
                currentPage: 1,
            },
            loading: {
                sync: false
            }
        }),
        methods: {
            clap(id) {
                this.posts[id].claps++;
                this.claps.push(id)
                axios.patch('http://localhost:3000/posts/' + this.posts[id].id, {claps: this.posts[id].claps});
            },
            edit(id) {
                this.$router.push({path: '/post?id=' + id})
            },
            deletePost(dbId, arrId) {
                this.loading.sync = true;
                axios.delete('http://localhost:3000/posts/' + dbId).then(() => {
                    this.$delete(this.posts, arrId)
                    this.pagination.total--;
                    this.loading.sync = false;
                });
            },
            get_posts(start) {
                this.loading.sync = true;
                axios.get('http://localhost:3000/posts?_sort=id&_order=desc&_start=' + start + '&_limit=10').then((res) => {
                    this.posts = res.data;
                    this.pagination.total = res.headers['x-total-count'];
                    this.pagination.current = start + res.data.length;
                    this.loading.sync = false;
                });
            }
        },
        created() {
            this.get_posts(0)
        },
    }
</script>

<style scoped>

</style>
