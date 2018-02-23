<template>
  <div>
    <div v-if="!user">

    </div>
    <div class='container'>
        <div>
            <div class='paper page request'>
                <form v-on:submit.prevent="search" class='fluid'>
                   
                    <input class='form-control' placeholder='Type your search here' v-model='query'>
                    
                    <button class='btn btn-primary' type='submit'>Search</button>
                    

                </form>
            </div>

            <div class='content-dark'>
                <h2>Lastest Releases</h2>
                <latest-releases-slider></latest-releases-slider>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>

import { container } from '../services/container'
import { MangaApi } from '../api/MangaApi';
import Flickity from 'vue-flickity';

export default {
    components: {
        Flickity
    },

    data () {
        return {
            manga: null,
            slug: null,
            query: '',
            releases: [],
        };
    },
    props: ['user'],
    methods: {
        load () {

        },

        search () {

            if (!this.query) {
                this.result = null;
                return;
            }

            this.$router.push({ name: "searcher", query: {q: this.query} });


        },
        request () {
        },

        next() {
            this.$refs.flickity.next();
        },

        previous() {
            this.$refs.flickity.previous();
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

    h2 {
        margin: 10px 0;
    }

    .page {
        padding: 20px;
        margin: 20px 0;
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
        padding: 0px 10px;
        background: #3d3d47;
        border: 1px solid #3d3d47;
        color: white;
    }


</style>
