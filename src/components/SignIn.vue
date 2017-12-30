<template>
    <div class='container full-height '>
        <div class='paper content container-signin'>
            <div >
                <!--<img class='logo' src='../assets/logo.png'>-->
                
                <h4>{{ $t("auth.title") }}</h4>
                <p> </p>
                <form class='form' method="POST" v-on:submit.prevent="login();">
                    <div class='form-group' v-bind:class="{error: error}">
                        <input type='text' class='form-control' v-model="form.username" placeholder=' ' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" >
                        <span class="form-highlight"></span>
                        <label>{{ $t("auth.username") }}</label>
                    </div>
                    <div class='form-group' v-bind:class="{error: error}">
                        <input type='password' class='form-control' v-model="form.password"  placeholder=' ' required >
                        <span class="form-highlight"></span>
                        <label>{{ $t("auth.password") }}</label>
                    </div>
                    <div class="error">{{ error }}&nbsp;</div> 
                    <br>
        
                    <button class='btn btn-block btn-primary'>{{ $t("auth.button-signin") }}</button>
                </form>
            </div>
            <div class='box'>
                <div class='login-provider-title text-center'> {{ $t("auth.signin-providers") }}</div>
                <div class='container-login-provider fluid fluid-center'>
                    <button class="btn btn-social-icon btn-social btn-gitlab" v-on:click="login('gitlab');">
                        <span class="fa fa-gitlab"></span>
                    </button>

                    <button class="btn btn-social-icon btn-social btn-github" v-on:click="login('github');">
                        <span class="fa fa-github"></span>
                    </button>

                    <button class="btn btn-social-icon btn-social btn-facebook" v-on:click="login('facebook');">
                        <span class="fa fa-facebook"></span>
                    </button>

                    <button class="btn btn-social-icon btn-social btn-google" v-on:click="login('google');">
                        <span class="fa fa-google"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { container } from '../services/container'

export default {
    name: 'SignIn',
    data () {
        return {
            nav: false,
            form: {},
            error: null
        }
    },
    methods: {
        login (provider) {

            var self = this;

            if (provider) {

                container.get('services.oauth').providerSignIn(provider);

            } else {

                container.get('services.oauth').signIn({
                    params: this.form,
                    success: function(response) {
                        window.location.href = "/";
                    },
                    error: function(response) {
                        /*self.$notify({
                          group: 'system',
                          type: 'error',
                          title: 'Login fallito',
                          text: response.message
                        });*/

                        self.error = self.$t(response.code.toLowerCase());

                    }
                });
            }
        }
    },
    mounted () {

    }
}
</script>

<style scoped>
    .page {
        max-width: 768px;
        margin: 0 auto;
    }
    .container-signin {
        min-width: 298px;
    }
    .content {
        margin-top: -50px;
        padding: 20px;
        background: #3d3d47;
        margin: 10px;
        border: 1px solid #3d3d47;
        color: white;
    }
    
    .form-control {
        color: #dfdeea;
    }

    .container-login-provider .btn {
        margin: 0 5px;
    }
    
    .login-provider-title {
        margin: 15px 0;
    }

    .title {
        font-size: 23px;
        text-align: center;
        padding: 10px;
        font-weight: bold;
    }

    .alert {
        font-size: 15px;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-icon {
        width: 38px;
        height: 38px;
    }

    .btn-gitlab {
        background: #554488;
        color: white;
    }

    .btn-gitlab:hover {
        background: #2b2343 !important;
        color: white;
    }

    .btn-social > :first-child {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 32px;
        line-height: 34px;
        font-size: 1.6em;
        text-align: center;
        border-right: 1px solid rgba(0,0,0,0.2);
    }
</style>
