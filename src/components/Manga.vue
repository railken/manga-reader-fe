<template>
    <div>
        <div class='container' v-if='manga'>
            <div class='fluid'>
                <div class='paper page'>
                    
                    <div class='manga-container'>
                        <div><div class='cover-container'><img :src='manga.cover' class='img cover'></div></div>
                        <div class='info'>
                            <hr>
                            <div class='info-basic'>
                                <label>Aliases</label>
                                {{ manga.aliases.join(", ") }}
                            </div>
                            <hr>
                            <div class='info-basic'>
                                <label>Genres</label>
                                {{ manga.genres.join(", ") }}
                            </div>
                            <hr>
                            <div class='info-basic'>
                                <label>Artist</label>
                                {{ manga.artist }}
                            </div>
                            <hr>
                            <div class='info-basic'>
                                <label>Author</label>
                                {{ manga.author }}
                            </div>

                        </div>
                    </div>
                </div>

                <div class='paper page request manga-chapters-container'>

                    <h1>
                        {{ manga.title }}

                        <span v-if='!manga.follow'>
                            <span class='fa fa-cloud-download manga-icons manga-followed-icon' title='All new scans will be automatically downloaded'></span>
                        </span>

                        <span v-if='manga.follow'>
                            <span class='fa fa-cloud-download manga-icons active manga-followed-icon' title='All new scans will be automatically downloaded'></span>
                        </span>



                        <span v-if='user && library === false'>
                            <span class='fa fa-book manga-icons manga-icons-hover manga-library-icon' title='Currently added to your library' v-on:click="addMangaToLibrary();"></span>
                        </span>
                        <span v-if="user && library === true">
                            <span class='fa fa-book manga-icons manga-icons-hover active manga-library-icon' title='Currently added to your library'  v-on:click="removeMangaFromLibrary();"></span>
                        </span>

                    </h1>

                    <span v-if='!user'>
                        You must be logged in order to add the manga to library
                    </span>
                    <hr>

                    <div class='info info-basic'>
                        <label>Synopsis</label>
                        <div>{{ manga.overview }}</div>
                    </div>


                    <div v-if='user && library === false'>
                        <i>Manga not in library</i>. <span class='url' v-on:click="addMangaToLibrary();">Click here to add to your library</span>
                    </div>
                    <div v-if="user && library === true">
                        <i>Currently in your library</i>. <span class='url' v-on:click="removeMangaFromLibrary();">Click here to remove from the library</span>
                    </div>
                    
                    <br>

                    <div v-if='!manga.follow'>
                        <h3>Manga Reader</h3>
                        <p>
                            The following manga isn't listed as a readable manga. If you're interested on reading this you can simple click the button and wait untill the end of download.
                        </p>
                        <button class='btn btn-primary' v-on:click='request()'>Let me read this!</button>
                    </div>
                    <div v-if='manga.follow'>
                        <div v-if='manga.chapters.length === 0'>
                            <p>There's no chapter available yet</p>
                        </div>

                        <div v-if='manga.volumes' v-for='volume in manga.volumes.toArray()'>
                            <h5>Volume {{ volume.volume }}</h5>
                            <div v-for="chapter in volume.chapters">
                                <router-link :to="{ name: 'manga.chapter', 'params': {slug: slug, chapter: chapter.number} }" class='url'>
                                    <span class='chapter-head-title'>{{ chapter.number }}</span>
                                </router-link>

                                &nbsp;<span class='chapter-title'> {{ chapter.title }}</span>
                           </div>
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
import { LibraryApi } from '../api/LibraryApi';

import Collection from 'collect.js';

export default {
    data () {
        return {
            manga: null,
            slug: null,
            library: null
        };
    },
    props: ['user'],
    methods: {
        addMangaToLibrary () {
            this.api.library.add(this.manga.id);
            this.library = true;
        },

        removeMangaFromLibrary () {
            this.api.library.remove(this.manga.id);
            this.library = false;
        },

        load () {


            this.api.manga.get(this.slug).then(response => {
                var manga = response.body.resource;
                manga.volumes = [];


                if (this.user) {
                    this.api.library.get(manga.id).then(response => {
                        this.library = true;
                    }).catch(response => {
                        this.library = false;
                    });
                }

                this.api.manga.getChapters(this.slug).then(response => {
                    
                    manga.chapters = response.body.resources;
                    manga.volumes = [];

                    var volumes = [];
                    var gTv = function(volume) {

                        if (volumes.indexOf(volume) === -1) {
                            volumes.push(volume);
                        }
                        return volumes.indexOf(volume);
                    }

                    manga.volumes = [];



                    for (var i in response.body.resources) {
                        var chapter = response.body.resources[i];
                        
                        if (typeof manga.volumes[gTv(chapter.volume)] === "undefined") {
                            manga.volumes[gTv(chapter.volume)] = {volume: chapter.volume, chapters: [], first_chapter: parseInt(chapter.number)};
                        }

                        manga.volumes[gTv(chapter.volume)].chapters.push(chapter);

                    }


                    manga.volumes = new Collection(manga.volumes).sortByDesc(function(value, key) { return value.first_chapter });

                    manga.volumes.each(function(volume) {
                        volume.chapters = new Collection(volume.chapters).sortByDesc(function(value, key) { return parseFloat(value.number); }).toArray();
                    });

                    this.manga = manga;
                });
            }).catch(response => {
                // Redirect 404
                this.$router.push({name: '404'});
            });
        },

        request () {
            this.api.manga.requestChapters(this.slug).then(response => {
                this.$router.push({ name: 'manga.request', params: {slug: this.slug}});
            }).catch(response => {
                // Uhm...
            });
        }
    },
    mounted () {
        this.api = [];
        this.api.library = new LibraryApi();
        this.api.manga = new MangaApi();

        this.slug = this.$route.params.slug;
        this.load();
    }
}
</script>

<style scoped>
    
    h1, h2, h3, h5 {
        text-transform: uppercase;

    }

    h1 {
        margin-top: 10px;
        font-size: 1.7rem;
    }

    h5 {
        margin: 15px 0 5px 0;
        font-size: 14px;
        font-weight: bold;
    }

    .page {
        padding: 20px;
        margin: 10px 0;
    }

    .cover {
        width: 100%;
    }

    .cover-container {
        border: 1px solid #efefef;
        padding: 2px;
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

    .chapter-head-title {
        font-size: 14px;
    }
    .chapter-title {
        opacity: 0.9;
    }

    .manga-container {
        width: 220px;
    }

    .manga-chapters-container {
        flex-grow: 1;
        text-align: left;
    }

    @media (max-width: 468px) {
    }

</style>
