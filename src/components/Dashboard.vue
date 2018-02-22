<template>
  <div>
    <div v-if="!user">

    </div>
    <div class='container'>
        <div class='paper page request'>
            <form v-on:submit.prevent="search" class='fluid'>
               
                <input class='form-control' placeholder='Type your search here' v-model='query'>
                
                <button class='btn btn-primary' type='submit'>Search</button>
                

            </form>
        </div>

        <div class='fluid content-dark'>
            <h2>Last Releases</h2>
        </div>
        <div v-if="releases.length != 0" class='fluid releases content-dark'>
            <div  v-for="manga in releases" class='release-manga'>
                <router-link class='url' :to="{ name: 'manga', params: { slug: manga.slug }}">
                    <div class='release-manga-container paper'>
                        <div class='cover-container'>
                            <img :src='manga.cover' class='img cover'>
                        </div>
                        <div class='info'>
                            {{ manga.title }}
                        </div>
                    </div>
                </router-link>
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
            releases: []
        };
    },
    props: ['user'],
    methods: {
        load () {


            this.api.getLatestReleases({show: 20, page: 1}).then(response => {
                this.releases = response.body.resources;
            }).catch(response => {


            });
        },

        search () {

            if (!this.query) {
                this.result = null;
                return;
            }

            this.$router.push({ name: "searcher", query: {q: this.query} });


        },
        request () {
        }
    },
    mounted () {
        this.api = new MangaApi();
        this.load();
    }
}
</script>

<style scoped>
    
    h1, h2, h3 {
        text-transform: uppercase;

    }
    .container {
        margin-top: 80px;
    }

    .page {
        padding: 20px;
        margin: 10px 0;
    }

    .cover {
        margin-right: 10px;

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
    
    input {
        height: 38px
    }   

    .content-dark {
        padding: 20px 10px;
        background: #3d3d47;
        border: 1px solid #3d3d47;
        color: white;
    }
    .release-manga-container {
        text-align: center;
        padding: 5px;
        margin: 0 5px;
        max-width: 150px;
        height: 260px;
    }

    .release-manga {
        padding: 5px;
    }
    .release-manga-container img{
        width: 140px;
        height: 200px;
    }

    .releases {
        overflow-x: scroll;
        overflow-y: hidden;
    }

</style>
