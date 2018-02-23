<template>
  <div>

    <div class='container'>
        <div class='paper page request'>
            <form v-on:submit.prevent="search" class='fluid'>
               
                <input class='form-control' placeholder='Type your search here' v-model='query'>
                
                <button class='btn btn-primary' type='submit'>Search</button>
                

        </form>
        </div>

        <div class='page paper fluid fluid-wrap'>
            <div v-if="result" v-for="manga in result.resources" class="ly-xs-100 ly-sm-50 ly-md-25 ly-xl-16.66">

                <router-link class='manga-container cover-container' :to="{ name: 'manga', params: { slug: manga.slug }}">
                    <h3>
                        {{ manga.title }}
                    </h3>
                    
                    <img :src='manga.cover' class='img cover'>
                        
                </router-link>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>

import { container } from '../services/container'
import { LibraryApi } from '../api/LibraryApi';

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

            this.$router.replace({ name: "library", query: {q: this.query} })

            this.result = null;
            var q = this.query ? 'title ct "'+this.query+'"'
                // +" or ("+this.query.split(" ").map(function(v) { return "title ct "+v; }).join(" or ")+")"
                : '';


            this.api.library.index({query: q, show: this.show, page: this.page}).then(response => {
               
                
                this.result = response.body;
                this.page = response.body.pagination.page;
                this.show = response.body.pagination.show;

            }).catch(response => {
                // Redirect 404
            });

        }
    },
    mounted () {
        this.api = [];
        this.api.library = new LibraryApi();
        this.load();
    }
}
</script>

<style scoped>
    

    h3 {
        font-size: 18px;
        background: rgb(238, 238, 238);
        color: #333;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    input {
        text-align: center;
        height: 38px;
    }

    .cover-container {
        border: 1px solid #efefef;
        padding: 5px;
        margin: 0 10px;
        cursor: pointer;
    }

    .cover-container:hover {
        background: #54545b;
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
