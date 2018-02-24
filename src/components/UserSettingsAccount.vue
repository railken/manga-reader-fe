<template>
  <div>
    <div v-if='user'>
        <div>
            <h3>Change password</h3>
            <hr>

            <form v-on:submit.prevent="password" >
               
            
                <div class='alert alert-success' v-if='success'>
                    The information was updated successfully.
                </div>

                <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'password_old'; })}">
                    <input type='password' class='form-control' v-model="form.password_old"  placeholder=' ' required >
                    <span class="form-highlight"></span>
                    <label>{{ $t("user.settings.account.password_old") }}</label>
                </div>

                <span class='message-error' v-if="errors.find(function(v) { return v.label === 'password_old'; })">{{ errors.find(function(v) { return v.label === "password_old"; }).message}}</span>
                    
                    <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'password'; })}">
                    <input type='password' class='form-control' v-model="form.password"  placeholder=' ' required >
                    <span class="form-highlight"></span>
                    <label>{{ $t("user.settings.account.password") }}</label>
                </div>

                <span class='message-error' v-if="errors.find(function(v) { return v.label === 'password'; })">{{ errors.find(function(v) { return v.label === "password"; }).message}}</span>
                    
                <br>
                <button class='btn btn-primary' type='submit'>Update password</button>
                <br><br><br>
            </form>

            <h3>Delete account</h3>
            <hr>
            <form v-on:submit.prevent="remove" class='fluid'>
               
                
                <button class='btn btn-danger' type='submit'>Delete account</button>
                

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
            success: true,
            slug: null,
            errors: [],
            form: {}
        };
    },
    props: ['user'],
    methods: {
        load () {

        },
        remove () {

        },
        password () {
            this.success = false;
            this.api.changePassword(this.form).then(response => {
                
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
    

</style>
