<template>
  <div>
    <!--<div class='paper'>
        <div v-if='user'>
            {{ user.username }}
            <button class='btn btn-primary' v-on:click="logout()">Logout</button>
        </div>
        <div v-if="!user">

            <router-link class='btn btn-primary' :to="{ name: 'sign-in' }">Login</router-link>
        </div>
    </div>-->



    <div class='container' v-if='manga && chapter'>
        <div class='page paper'>
            <div class='fluid fluid-center nav'>
                <router-link :to="{ name: 'manga', params: { slug: slug }}" class='title url'>{{ manga.title }}</router-link>
                &nbsp;
                <i class="fa fa-angle-double-right"></i>
                &nbsp;
                <select class='form-control select-chapter fill' v-model='number' v-on:change='moveTo(number)'>
                
                    <option :value='chapter.number' v-for='chapter in manga.chapters' >
                        <span v-if="chapter.volume !== '-1'">Vol {{ chapter.volume }}</span>
                        Ch {{ chapter.number }}
                        <span v-if="chapter.title !== ''">
                            : {{ chapter.title }}
                        </span>
                    </option>
                </select>
            </div>
        </div>
        <div class='page paper'>
            <div v-if='chapter.resources.length === 0'>
                It seems that there isn't any scans here.<br>
                If you have just added this manga as readable remember that you have to wait the end of download. <br>
                Also remember that the download of scans will start from the last chapter.
            </div>
            <img v-for='resource in chapter.resources' :src='resource'>
        </div>
        <div class='page paper'>
            <button class='btn btn-primary' v-on:click='moveTo(parseInt(number)+1)'>Next Page</button>
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
            chapter: null,
            slug: null,
            manga: null,
            number: null
        };
    },
    props: ['user'],
    methods: {
        load () {

            this.service.get(this.slug).then(response => {
                var manga = response.body.resource;
                this.service.getChapters(this.slug).then(response => {
                    
                    manga.chapters = response.body.resources;
                    this.manga = manga;
                });
            }).catch(response => {
                // Redirect 404
            });

            this.service.getChapter(this.slug, this.number).then(response => {
                this.chapter = response.body.resource;

            }).catch(response => {
                this.$router.push({name: 'manga', params: { slug: this.slug}});
            });
        },
        moveTo(number) {
            this.number = number;
            this.$router.push({name: 'manga.chapter', params: { slug: this.manga.slug, chapter: number}});
            this.load();
            window.scrollTo(0, 0);

        }
    },
    mounted () {
        this.service = new MangaApi();
        this.slug = this.$route.params.slug;
        this.number = this.$route.params.chapter;
        this.load();
    }
}
</script>

<style scoped>
    
    h1, h2, h3, h4 {
        text-transform: uppercase;
        margin: 0;
    }

    .nav {
        font-size: 18px;
    }

    .title
    .container {
        margin-top: 30px;
    }

    .select-chapter {
        width: auto;
    }

    .page {
        padding: 20px;
        margin: 20px auto;
        text-align: center;
        max-width: 728px;
    }

    .page img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
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

</style>
