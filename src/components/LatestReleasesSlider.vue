<template>
    <div class='latest-releases-slider'>
        <flickity ref="flickity" :options="flickityOptions" v-if='releases.length > 0'>
            <div v-for="manga in releases" class='release-manga'>
                    <div class='release-manga-container paper'>
                        <div class='cover-container'>
                            <img :src='manga.cover' class='img cover'>
                        </div>

                        <div>
                            <router-link class='url info-title' :to="{ name: 'manga', params: { slug: manga.slug }}">
                                <span class='info'>{{ manga.title }}</span>
                            </router-link>
                        </div>

                        <div v-if='manga.last_chapter'>
                            <router-link class='url' :to="{ name: 'manga.chapter', params: { slug: manga.slug, chapter: manga.last_chapter.number }}">
                                <span class='info'>Chapter {{ manga.last_chapter.number }}</span>
                            </router-link>


                            <span class='info' v-if='manga.last_chapter.released_at'>
                                 {{ moment(manga.last_chapter.released_at).format('D-MM-Y') }}
                            </span>
                        </div>
                    </div>
            </div>
        </flickity>

        <div class='buttons'>
            <button @click="previous()" class='btn btn-primary btn-left paper'><i class='fa fa-angle-left'></i></button>
            <button @click="next()" class='btn btn-primary btn-right paper'><i class='fa fa-angle-right'></i></button>
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
            releases: [],
            flickityOptions: {
                initialIndex: 0,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true,
                cellAlign: 'left',
                contain: false

                // any options from Flickity can be used
            }
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


        next() {
            console.log( this.$refs.flickity);
            this.$refs.flickity.next();
        },

        moment(date) {
            return container.get('date')(date);
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

    .latest-releases-slider {
        position: relative;
    }

    .carousel {
      background: #EEE;
    }


    .release-manga-container {
        text-align: center;
        padding: 5px;
        margin: 0 5px;
        height: 370px;
        width: 210px;
    }
    .release-manga-container img{
        width: 200px;
        height: 280px;
        margin-bottom: 10px;
    }


    .info {
        display: block;
        text-transform: uppercase;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #212529;
    }

    .info-title {
        font-weight: bold;
    }

    .buttons {
        margin: 10px 0;
    }

    .btn {
        position: absolute;
        top: 50%;
        margin-top: -60px;
        font-size: 30px;
        padding: 7px 20px;
    }


    .btn-left {
        left: -40px;
    }

    .btn-right {
        right: -40px
    }
    @media (max-width: 468px) {
    
        .btn-left {
            left: -20px;

        }

        .btn-right {
            right: -20px

        }
    }


</style>
