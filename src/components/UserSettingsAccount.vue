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
                    <input type='password' class='form-control' v-model="form.password.password_old"  placeholder=' ' required >
                    <span class="form-highlight"></span>
                    <label>{{ $t("user.settings.account.password_old") }}</label>
                </div>

                <span class='message-error' v-if="errors.find(function(v) { return v.label === 'password_old'; })">{{ errors.find(function(v) { return v.label === "password_old"; }).message}}</span>
                    
                <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'password'; })}">
                    <input type='password' class='form-control' v-model="form.password.password"  placeholder=' ' required >
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
            <p>Once you delete your account, there is no going back. Please be certain.</p>

            <button class='btn btn-danger' type='submit' v-b-modal.modal1 >Delete account</button>


            <div>
              <b-modal id="modal1" title="Are you sure you want to do this?"  hide-footer>
                <form v-on:submit.prevent="remove" class=''>
                    

                    <div class='alert alert-danger'>
                        This is important
                    </div>

                    <p>We will <b>immediatly delete all your data</b>.</p>

                    <p> Your username and email will be available to anyone</p>

                    <p> Once you delete your account, there is no going back. Please be certain. </p>
                       
                    <div class='form-group' v-bind:class="{error: errors.find(function(v) { return v.label === 'password_current'; })}">
                        <input type='password' class='form-control' v-model="form.delete.password"  placeholder=' ' required >
                        <span class="form-highlight"></span>
                        <label>{{ $t("user.settings.account.delete.password") }}</label>
                    </div>

                    <span class='message-error' v-if="errors.find(function(v) { return v.label === 'password_current'; })">{{ errors.find(function(v) { return v.label === "password_current"; }).message}}</span>
                        

                    <div class='form-group' >
                        <input type='text' class='form-control' v-model="form.delete.verify"  placeholder=' ' required >
                        <span class="form-highlight"></span>
                        <label>{{ $t("user.settings.account.delete.verify") }}</label>
                    </div>

                    <div class='footer'>
                        
                        <div v-if="form.delete.verify === 'delete my account'">


                            <button class='btn btn-danger' type='submit' block>Yes, Delete account</button>
                        </div>
                        
                        <div v-else>
                            <button class='btn btn-danger' type='button' disabled>Yes, Delete account</button>
                        </div>
                    </div>

                </form>
              </b-modal>
            </div>

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
                password: {},
                delete: {},
            }
        };
    },
    props: ['user'],
    methods: {
        load () {

        },
        remove () {

            this.api.deleteAccount(this.form.delete).then(response => {
                
                window.location.href = "/";
            }).catch(response => {
                var self = this;
                this.errors = response.body.errors.map(function(error) {
                    return {label: error.label, message: self.$t("errors."+error.code.toLowerCase())};
                });
            });
        },
        password () {
            this.success = false;
            this.api.changePassword(this.form.password).then(response => {
                
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
