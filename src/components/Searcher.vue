<template>
    <div>

        <div class='container'>
            <div>
                <div class='paper page request'>
                    <form v-on:submit.prevent="search">
                        <div  class='fluid'>
                            <input class='form-control' placeholder='Search a manga' v-model='query'>
                            
                            <button class='btn btn-primary' type='submit'>Search</button>
                        </div>
                        <p>

                        </p>
                        <p>
                            Tags
                        </p>
                    </form>
                </div>

                <div v-if="loading && resources.length === 0">
                    <div class='container-loader'>
                        <div class='sk-rotating-plane'></div>
                    </div>
                </div>
                <div v-if="resources.length != 0" class='fluid fluid-wrap'>
                    <div  v-for="manga in resources" class="col-sm-4">

                        <div class='page paper paper-hover manga-container '>

                            <h5>
                                <router-link class='url' :to="{ name: 'manga', params: { slug: manga.slug }}">{{ manga.title }}</router-link>
                                <!--<span v-if='manga.follow' class='fa fa-cloud-download manga-followed-icon' title='All new scans will be automatically downloaded'></span>-->
                            </h5>

                            <div class='info-basic text-ellips' v-if='manga.genres'>
                                {{ manga.genres.join(", ") }}
                            </div>
                            <div class='fluid'>
                                <div class='cover-container'><router-link class='url' :to="{ name: 'manga', params: { slug: manga.slug }}"><img :src='manga.cover' class='img cover'></router-link></div>
                                <div class='info info-overview'>
                                    <div>{{ manga.overview }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div v-if="loading && resources.length > 0">
                    <div class='container-loader'>
                        <div class='sk-rotating-plane'></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { container } from '../services/container'
import { MangaApi } from '../api/MangaApi';

require('spinkit/css/spinners/1-rotating-plane.css');

export default {
    data () {
        return {
            manga: null,
            slug: null,
            query: '',
            show: 15,
            page: 0,
            result: {},
            loading: false,
            resources: [],
        };
    },
    props: ['user'],
    methods: {

        handleScroll () {
            var scrolled = window.scrollY > 0;

            var totalHeight = document.documentElement.scrollHeight;
            var clientHeight = document.documentElement.clientHeight;
            var scrollTop = (document.body && document.body.scrollTop)
            ? document.body.scrollTop : document.documentElement.scrollTop;

            if (totalHeight - 1000 <= scrollTop + clientHeight) {

                if (!this.loading && this.result && this.result.pagination.pages > this.page) {
                    this.page++;
                    this.list();
                }
            }
        },

        load () {
            this.query = this.$route.query.q;
            this.search();
        },

        search () {

            if (!this.query) {
                this.result = null;
                return;
            }

            this.result = null;
            this.page = 1;
            this.resources = [];
            this.$router.replace({ name: "searcher", query: {q: this.query} })

            this.list();

        },

        list () {

             var q = 'title ct "'+this.query+'"'
                // +" or ("+this.query.split(" ").map(function(v) { return "title ct "+v; }).join(" or ")+")"
                ;

            this.loading = true;

            this.service.index({query: q, show: this.show, page: this.page}).then(response => {
               
                this.result = response.body;
                this.resources = this.resources.concat(this.result.resources);
                this.page = response.body.pagination.page;
                this.show = response.body.pagination.show;
                this.loading = false;

            }).catch(response => {
                // Redirect 404
                this.loading = false;
            });
        }
    },
    beforeMount  () {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy  () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted () {
        this.service = new MangaApi();
        this.load();
    }
}
</script>

<style scoped>

    
    .col-sm-4 {
        padding:0 5px;
    }

    .page {
        padding: 20px;
        margin: 10px 0;
    }

    input {
        height: 38px
    }

    .cover-container {
        border: 1px solid #efefef;
        padding: 2px;
        width: 100%;
        margin-right: 10px;
    }

    .cover {
        width: 100%;
        width: 160px;
        height: 220px;
    }

    .info label {
        display: block;
        font-weight: bold;
        margin: 0px;
    }

    .info-basic {
        margin-bottom: 5px;
    }

    .request {
        text-align: center;
    }

    .manga-container {
        display: block;
    }

    .info-overview {
        font-size: 11px;
    }

    @media (max-width: 468px) {
        .manga-container > div{
            flex-wrap: wrap;
        }

        .cover-container {
            max-width: 100%;
            margin-bottom: 10px;
        }
    }
</style>
