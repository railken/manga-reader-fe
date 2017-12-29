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

        var self = this;
        container.get('services.oauth').loadUser({
            success: function(response) {
                container.set('user', response.data.resource);
                self.user = response.data.resource;
                console.log(container.get('user'));
            },
            error: function() {

            }
        });
    }
}
</script>
