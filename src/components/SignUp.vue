<template>
    <div class='container full-height '>
        <div>
            <div class='paper content container-signin'>
                <div >
                    <!--<img class='logo' src='../assets/logo.png'>-->
                    
                    <h4>{{ $t("auth.signup.title") }}</h4>
                    <p> </p>
                    {{ errors }}
                    <form class='form' method="POST" v-on:submit.prevent="register();">
                        <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'username'; })}">
                            <input type='text' class='form-control' v-model="form.username" placeholder=' ' required >
                            <span class="form-highlight"></span>
                            <label>{{ $t("auth.signup.username") }}</label>
                        </div>
                        <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'email'; })}">
                            <input type='text' class='form-control' v-model="form.email" placeholder=' ' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" >
                            <span class="form-highlight"></span>
                            <label>{{ $t("auth.signup.email") }}</label>
                        </div>
                        <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'password'; })}">
                            <input type='password' class='form-control' v-model="form.password"  placeholder=' ' required >
                            <span class="form-highlight"></span>
                            <label>{{ $t("auth.signup.password") }}</label>
                        </div>
                        <div class='fluid'>
                            <div class='fill'></div>
                        </div>
                        <button class='btn btn-block btn-primary'>{{ $t("auth.signup.button") }}</button>
                    </form>
                </div>

                <p>{{ $t('auth.signup.confirmation_email.label') }} <router-link :to="{ name: 'sign-up'}" class='url url-light'>{{ $t('auth.signup.confirmation_email.url') }}</router-link></p>
            </div>

            <div class='paper content container-signin'>
                <div class='box'>
                    <div class='container-login-provider fluid fluid-center'>
                        <div class='login-provider-title'> {{ $t("auth.signup.providers") }}</div>
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
                        <div class='fill'></div>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>

import { container } from '../services/container'

export default {
    name: 'SignUp',
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
                alert('registered');
            }).catch(response => {
                var self = this;
                this.errors = response.body.errors.map(function(error) {
                    return {label: error.label, message: self.$t(error.code.toLowerCase())};
                });
                console.log(this.errors);
            });
        }
    },
    mounted () {

    }
}
</script>

<style scoped>
    p {
        margin: 10px 0;
    }
    .page {
        max-width: 768px;
        margin: 0 auto;
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
    
    .form-control {
        color: #dfdeea;
    }

    .container-login-provider .btn {
        margin: 0 5px;
    }
    
    .login-provider-title {
        margin-right: 15px;
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
