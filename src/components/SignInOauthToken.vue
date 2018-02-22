<template>
    <div class='container full-height '>
        <div>
            <div class='paper content container-signin'>
                <logo :type="'bg'"></logo>
            </div>
            <div class='paper content container-signin'>
        		<div v-if='loading'>
                    <div class='container-loader'>
                        <div class='sk-rotating-plane'></div>
                    </div>
                </div>
                <div v-if='!loading' class=''>
                    <div class='content'>
                        <div class='error text-error'>
                            {{ error }}
                        </div>
                        <br><br>
                        <router-link class='btn btn-primary' :to="{ name: 'sign-in'}">Back to sign in</router-link>
                    </div>
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

            return;

        	var params = container.get('request').query;
        	var provider = this.$route.params.provider;
            self.loading = true;
        	container.get('services.oauth').providerSignInCode(provider, params).then(response => {
    			window.location.href = "/";
    		}).catch(error => {
                this.error = this.$t(error.body.code.toLowerCase());
                // container.get('router').push({ name: 'sign-in'});
                this.loading = false;
    		
        	});

        }
    }

    require('spinkit/css/spinners/1-rotating-plane.css');
</script>

<style scoped>

    .container-loader {
        margin: 100px auto;
    }
    .container-loader > div {
        background-color: white;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }


    body, main {
        background-color: #52525d;
    }
    .container-signin {
        min-width: 298px;
    }
    .content {
        padding: 20px;
        background: #3d3d47;
        margin: 10px;
        border: 1px solid #3d3d47;
        color: white;
    }
    
</style>

