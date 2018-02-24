<template>
  <div>
    <div class='container' v-if='user'>
        <div>
            <div class='paper page request'>
                <div class='fluid'>

                    <div class='sidebar'>
                        <div><router-link :to="{ name:'user.settings.profile'}" class='url'>Profile</router-link></div>
                        <div><router-link :to="{ name:'user.settings.account'}" class='url'>Account</router-link></div>
                        <div><router-link :to="{ name:'user.settings.email'}" class='url'>Email</router-link></div>
                    </div>

                    <div class='fill'>
                        <router-view :user='user'/>
                    </div>
                </div>
            </div>


            
            
        </div>
    </div>
  </div>
</template>

<script>

import { container } from '../services/container'
import { UserApi } from '../api/UserApi';

export default {

    data () {
        return {
            slug: null,
        };
    },
    props: ['user'],
    methods: {
        load () {

        },
        request () {
        },
    },
    mounted () {
        this.api = new UserApi();
        this.load();


    }
}
</script>

<style scoped>
    .sidebar {
        width: 140px;
        font-size: 16px;
    }
    
</style>
