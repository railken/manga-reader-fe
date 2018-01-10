<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
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
        this.user = this.$root.$data.user;
    }
}
</script>
