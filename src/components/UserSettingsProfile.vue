<template>
  <div>
    <div v-if='user'>
        <div>
            <h3>Change username</h3>
            <hr>
            <form v-on:submit.prevent="username" >
               
            
                <div class='alert alert-success' v-if='success'>
                    The information was updated successfully.
                </div>

                <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'username'; })}">
                    <input type='text' class='form-control' v-model="form.username.username"  placeholder=' ' required >
                    <span class="form-highlight"></span>
                    <label>{{ $t("user.settings.account.username") }}</label>
                </div>

                <span class='message-error' v-if="errors.find(function(v) { return v.label === 'username'; })">{{ errors.find(function(v) { return v.label === "username"; }).message}}</span>
                    
                <br>

                <button class='btn btn-primary' type='submit'>Update username</button>
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
                username: {},
            }
        };
    },
    props: ['user'],
    methods: {
        load () {

            this.form.username = this.user;
        },
        username () {
            this.success = false;
            this.api.changeUsername(this.form.username).then(response => {
                
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
