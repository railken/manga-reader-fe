<template>
  <div>

    <div class='container'>
        <div class='paper page request'>
            <h3>Welcome to Manga Reader</h3>
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

</style>
