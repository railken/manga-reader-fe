<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <router-view :user='user'/>
  </div>
</template>

<script>
import { container } from './services/container'
window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('bootstrap-vue/dist/bootstrap-vue.css');
require('bootstrap-social/bootstrap-social.css');
require('font-awesome/css/font-awesome.min.css');
require('./assets/main.css');

export default {
    name: 'app',
    data() {
        return {
            user: null
        };
    },
    mounted() {

        container.get('services.oauth').getUser().then(response => {
            this.user = response.body.data.resource;
        }).catch(error => {

        });
    }
}
</script>
