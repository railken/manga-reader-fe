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
        text-align: center;
        height: 38px
    }

</style>
