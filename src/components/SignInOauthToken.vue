<template>
	<div class='container full-height'>
        <div class='paper content container-signin'>
    		<div v-if='loading'>
                <div class='container-loader'>
                    <div class='sk-rotating-plane'></div>
                </div>
            </div>
            <div v-if='!loading' class=''>
                <div class='content'>
                    <div class='error text-error'>
                        {{ $t('auth.provider.email_not_found') }}.

                    </div>
                    <br><br>
                    <router-link class='btn btn-primary' :to="{ name: 'sign-in'}">Back to sign in</router-link>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

	import { container } from '../services/container';

    export default {
        data() {
            return {
                loading: true,
                error: ''
            };
        },
        mounted () 
        {

            var self = this;
        	var params = container.get('request').query;
        	var provider = this.$route.params.provider;
            console.log('a');
            self.loading = true;
        	container.get('services.oauth').providerSignInCode(provider, {
        		params: params,
        		success: function(response) {
        			window.location.href = "/";
                    self.loading = false;
        		},
        		error: function(response) {
                    console.log(response);
                    self.error = response.message;

                    // container.get('router').push({ name: 'sign-in'});
                    self.loading = false;
        		}
        	});

        }
    }

    require('spinkit/css/spinners/1-rotating-plane.css');
</script>

<style>

    .container-loader {
        margin: 100px auto;
    }
    .container-loader > div {
        background-color: white;
    }

    body, main {
        background-color: #52525d;
    }

    .container-signin {
        width: 298px;
        margin: 50px auto;
        display: block;
    }
    .content {
        padding: 10px;
        background: #3d3d47;
        border: 1px solid #3d3d47;
        color: white;
    }
    
</style>

