<template>
  <div>

    <div class='container'>
        <div v-if="result" v-for="chapter in result.resources" class="page paper paper-hover manga-container">
            <div class='fluid'>
                <div class='cover-container'><router-link class='url' :to="{ name: 'chapter.manga', params: { slug: chapter.manga.slug }}"><img :src='chapter.manga.cover' class='img cover'></router-link></div>
                <div class='info w100'>

                    <div class='fluid container-title'>
                        <h3>
                            <router-link class='url' :to="{ name: 'chapter.manga', params: { slug: chapter.manga.slug }}">{{ chapter.manga.title }}</router-link>
                            <span v-if='chapter.manga.follow' class='fa fa-cloud-download chapter.manga-followed-icon' title='All new scans will be automatically downloaded'></span>
                        </h3>
                        <div class='fill'></div>
                        <div>
                            {{ moment(chapter.released_at).format('D-MM-Y') }}
                        </div>
                    </div>
                    
                    <div class='info-basic'>
                        {{ chapter.manga.genres.join(", ") }}
                    </div>

                    <div class='info-basic'>
                    <router-link :to="{ name: 'manga.chapter', 'params': {slug: chapter.manga.slug, chapter: chapter.number} }" class='url'>
                        <span class='chapter-head-title'>Chapter {{ chapter.number }}</span>
                    </router-link>
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
            show: 25,
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

        moment(date) {
            return container.get('date')(date);
        },
        search () {


            this.api.manga.getLatestChapters({show: this.show, page: this.page}).then(response => {
               
                
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
        this.api.manga = new MangaApi();
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

    .container-title {
        width: 100%;
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
        max-width: 60px;
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
