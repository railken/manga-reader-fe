<template>
  <div>

    <div class='container'>
        <div class='paper page request'>
            <form v-on:submit.prevent="search" class='fluid'>
               
                <input class='form-control' placeholder='Type your search here' v-model='query'>
                
                <button class='btn btn-primary' type='submit'>Search</button>
                

            </form>
        </div>


        <div v-if="result" v-for="manga in result.resources" class="page paper paper-hover manga-container">
            <div class='fluid'>
                <div class='cover-container'><router-link class='url' :to="{ name: 'manga', params: { slug: manga.slug }}"><img :src='manga.cover' class='img cover'></router-link></div>
                <div class='info'>
                    <h3>
                        <router-link class='url' :to="{ name: 'manga', params: { slug: manga.slug }}">{{ manga.title }}</router-link>
                        <span v-if='manga.follow' class='fa fa-cloud-download manga-followed-icon' title='All new scans will be automatically downloaded'></span>
                    </h3>
                    
                    <div class='info-basic'>
                        {{ manga.genres.join(", ") }}
                    </div>

                    <div class='info-basic'>
                        <label>Aliases</label>
                        {{ manga.aliases.join(", ") }}
                    </div>
                    <div>{{ manga.overview }}</div>
                </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>

import { container } from '../services/container'
import { MangaApi } from '../api/MangaApi';

export default {
    data () {
        return {
            manga: null,
            slug: null,
            query: '',
            show: 5,
            page: 1,
            result: {},
        };
    },
    props: ['user'],
    methods: {
        load () {
            this.query = this.$route.query.q;
            this.search();
        },

        search () {

            if (!this.query) {
                this.result = null;
                return;
            }

            this.$router.replace({ name: "searcher", query: {q: this.query} })

            var q = 'title ct "'+this.query+'"'
                // +" or ("+this.query.split(" ").map(function(v) { return "title ct "+v; }).join(" or ")+")"
                ;


            this.service.index({query: q, show: this.show, page: this.page}).then(response => {
               
                
                this.result = response.body;
                this.page = response.body.pagination.page;
                this.show = response.body.pagination.show;

            }).catch(response => {
                // Redirect 404
            });

        }
    },
    mounted () {
        this.service = new MangaApi();
        this.load();
    }
}
</script>

<style scoped>
    
    h1, h2, h3 {
        text-transform: uppercase;
    }

    h3 {
        font-size: 18px;
    }
    .container {
        margin-top: 80px;
    }

    .page {
        padding: 20px;
        margin: 10px 0;
    }

    input {
        text-align: center;
        height: 38px
    }

    .cover-container {
        border: 1px solid #efefef;
        padding: 2px;
        max-width: 100px;
        width: 100%;
        margin-right: 10px;
    }

    .cover {
        width: 100%;
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

</style>
