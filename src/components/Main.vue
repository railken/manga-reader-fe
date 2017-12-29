<template>
  <div>
  	<div class='paper'>
  		<div v-if='user'>
    		{{ user.username }}
    		<button class='btn btn-primary' v-on:click="logout()">Logout</button>
		</div>
		<div v-if="!user">

    		<router-link class='btn btn-primary' :to="{ name: 'sign-in' }">Login</router-link>
		</div>
	</div>
  </div>
</template>

<script>

	import { container } from "../services/container";

	export default {
		name: 'Main',
		props: ['user'],
		data () {
			return {

			}
		},
		methods: {
			logout() {
	        	container.get('services.oauth').logout();
	        	window.location.href = "/";
			}
		}
	}
</script>

<style>

</style>
