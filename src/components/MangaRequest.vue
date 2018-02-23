<template>
  <div>

    <div class='container'>
        <div class='paper page request'>
            <h3>Request sent</h3>
            <p>
                The request has been sent.
            </p>
            <router-link class='btn btn-primary' :to="{name: 'manga', params: {slug: slug}}">Go back to the manga</router-link>
        </div>
    </div>
  </div>
</template>

<script>

import { container } from '../services/container'

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

            this.slug = this.$route.params.slug;
        },

        request () {
        }
    },
    mounted () {
        this.load();
    }
}
</script>

<style scoped>
    

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
