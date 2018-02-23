<template>
    <div class='container full-height '>
        <div class='container-out'>
            <div class='paper content'>
                <logo :type="'bg'"></logo>
            </div>


            <div class='paper content'>
                <router-link :to="{ name: 'dashboard'}">
                        
                    <img src='../assets/404_saitama.png'>
                </router-link>
            </div>

            <div class='paper content'>
                <router-link :to="{ name: 'dashboard'}">
                        
                    <p>{{ $t("page.404.description") }}</p>
                </router-link>
            </div>

        </div>
                   
    </div>
    </div>
</template>

<script>

import { container } from '../services/container'

export default {
    name: 'PageNotFound',
    data () {
        return {
            nav: false,
            form: {},
            errors: []
        }
    },
    methods: {
        login (provider) {
            container.get('services.oauth').providerSignIn(provider);
        },
        register () {

            container.get('services.oauth').signUp(this.form).then(response => {
                container.get('router').push({ name: 'sign-up.email-sent'});
            }).catch(response => {
                var self = this;
                this.errors = response.body.errors.map(function(error) {
                    return {label: error.label, message: self.$t(error.code.toLowerCase())};
                });
            });
        }
    },
    mounted () {

    }
}
</script>

<style scoped>

    .container-loader > div {
        background-color: white;
    }

    .page {
        max-width: 768px;
        margin: 0 auto;
    }
    .content {
        padding: 20px;
        background: #3d3d47;
        margin: 10px;
        border: 1px solid #3d3d47;
        color: white;
    }
    
</style>
