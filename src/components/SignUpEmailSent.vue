<template>
    <div class='container full-height '>
        <div>
            <div class='paper content container-signin'>
                <logo :type="'bg'"></logo>
            </div>
            <div class='paper content container-signin'>
                <div class='text-center'>
                    <i class='fa fa-send icon'></i>
                    <br><br>
                    <p>
                        {{ $t("auth.signup-confirmed.message") }}
                    </p>

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
