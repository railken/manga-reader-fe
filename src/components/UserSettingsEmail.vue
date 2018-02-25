<template>
  <div>
    <div v-if='user'>
        <div>
            <h3>Change email</h3>
            <hr>

            <p>
                Your current email is {{ user.email }}
            </p> 
            <form v-on:submit.prevent="email" >
               
            
                <div class='alert alert-success' v-if='success'>
                    An email has been sent. 
                </div>
                

                <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'password_old'; })}">
                    <input type='password' class='form-control' v-model="form.email.password_old"  placeholder=' ' required >
                    <span class="form-highlight"></span>
                    <label>{{ $t("user.settings.account.password_old") }}</label>
                </div>

                <span class='message-error' v-if="errors.find(function(v) { return v.label === 'password_old'; })">{{ errors.find(function(v) { return v.label === "password_old"; }).message}}</span>
                    
                <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'email'; })}">
                    <input type='email' class='form-control' v-model="form.email.email"  placeholder=' ' required >
                    <span class="form-highlight"></span>
                    <label>{{ $t("user.settings.account.email") }}</label>
                </div>

                <span class='message-error' v-if="errors.find(function(v) { return v.label === 'email'; })">{{ errors.find(function(v) { return v.label === "email"; }).message}}</span>
                    
                <br>

                <button class='btn btn-primary' type='submit'>Update email</button>
                <br><br><br>
            </form>

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
            success: false,
            slug: null,
            errors: [],
            form: { 
                email: {},
            }
        };
    },
    props: ['user'],
    methods: {
        load () {

        },
        email () {
            this.success = false;
            this.api.changeEmail(this.form.email).then(response => {
                
                this.success = true;
                this.errors = [];
            }).catch(response => {
                var self = this;
                this.errors = response.body.errors.map(function(error) {
                    return {label: error.label, message: self.$t("errors."+error.code.toLowerCase())};
                });
            });
        },
    },
    mounted () {
        this.api = new UserApi();
        this.load();

    }
}
</script>

<style scoped>
    
    .footer {
        width: 100%;
        text-align: right;
    }

</style>
