<template>
	<div class='container full-height'>
        <div class='paper content container-out'>
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

            self.loading = true;

        	container.get('services.oauth').confirmEmail({token: this.$route.params.token}).then(response => {
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

    body, main {
        background-color: #52525d;
    }
    .content {
        padding: 10px;
        background: #3d3d47;
        border: 1px solid #3d3d47;
        color: white;
    }
    
</style>

