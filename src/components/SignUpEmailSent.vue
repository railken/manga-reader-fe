<template>
    <div class='container full-height '>
        <div class='container-out'>
            <div class='paper content'>
                <logo :type="'bg'"></logo>
            </div>
            <div class='paper content'>
                <div class='text-center'>
                    <p>
                        {{ $t("auth.signup-confirmed.message") }}
                    </p>
                </div>

                <div>

                    <form class='form' method="POST" v-on:submit.prevent="confirm();">
                    <p>

                        <div class='error text-error'>
                            {{ error }}
                        </div>

                        <div class='form-group'>
                            <input type='text' class='form-control' v-model="form.token" placeholder=' ' required>
                            <span class="form-highlight"></span>
                            <label>{{ $t("auth.signup.token") }}</label>
                        </div>
                        <button class='btn btn-block btn-primary'>{{ $t("auth.signup.confirm") }}</button>
                    </p>
                    </form>
                </div>
                <div>
                    <p>
                        {{ $t('auth.signin.confirmation_email.label') }}
                        <router-link :to="{ name: 'sign-up.email-request'}" class='url url-light'>{{ $t('auth.signin.confirmation_email.url') }}</router-link>
                    </p>

                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import { container } from '../services/container'

export default {
    data () {
        return {
            form: { token : null},
            errors: []
        }
    },
    methods: {
        confirm () {


            container.get('services.oauth').confirmEmail({token: this.form.token}).then(response => {
                window.location.href = "/";
            }).catch(error => {
                this.error = this.$t(error.body.code.toLowerCase());
                // container.get('router').push({ name: 'sign-in'});
            
            });
        }
    },
    mounted () {

    }
}
</script>

<style scoped>
    .icon {
        font-size: 72px;
        margin: 20px 0;
    }
    p {
        margin: 10px 0;
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

</style>
