<template>
  <div>
    <div class='paper'>
        <div v-if='user'>
            {{ user.username }}
            <button class='btn btn-primary' v-on:click="logout()">Logout</button>
        </div>
        <div v-if="!user">

            <router-link class='btn btn-primary' :to="{ name: 'sign-in' }">Login</router-link>
        </div>
    </div>



    <div class='container' v-if='manga'>
        <div class='paper page'>
            
            <div class='fluid'>
                <img :src='manga.cover' class='img cover'>
                <div class='info'>
                    <h1>{{ manga.title }}</h1>

                    <div class='info-basic'>
                        <label>Aliases</label>
                        {{ manga.aliases.join(", ") }}
                    </div>
                    
                    <div class='info-basic'>
                        <label>Genres</label>
                        {{ manga.genres.join(", ") }}
                    </div>

                    <div class='info-basic'>
                        <label>Artist</label>
                        {{ manga.artist }}
                    </div>

                    <div class='info-basic'>
                        <label>Author</label>
                        {{ manga.author }}
                    </div>

                    <div>{{ manga.overview }}</div>
                </div>
            </div>
        </div>
        <div class='paper page request' v-if='!manga.follow'>
            <h3>Manga Reader</h3>
            <p>
                The following manga isn't listed as a manga readable. If you're interested on reading this you can simple click the button and wait untill the end of download.
            </p>
            <button class='btn btn-primary' v-on='request()'>Let me read this!</button>
        </div>
        <div class='paper page' v-if='manga.follow'>
            <h2>Chapters</h2>
            <div v-for='chapter in manga.chapters'>
                <router-link :to="{ name: 'manga.chapter', 'params': {slug: slug, chapter: chapter.number} }">{{ manga.title }} {{ chapter.title ? chapter.title : chapter.number }}</router-link>
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
        },

        request () {
            this.service.requestChapters(this.slug).then(response => {
                this.$router.push({ name: 'manga-request', params: {slug: this.slug}});
            }).catch(response => {
                // Uhm...
            });
        }
    },
    mounted () {
        this.service = new MangaApi();
        this.slug = this.$route.params.slug;
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

</style>
