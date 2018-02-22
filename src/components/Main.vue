<template>
  <div>
  	<div class='paper  header'>
  		<div class='fluid fluid-vcenter header-content'>
  			<div class='header-logo'>
  				<logo :type="'sm'"></logo>
  			</div>
	  		<div class='fill'></div>
	  		<!--<div>
                <router-link :to="{ name: 'searcher' }" class='url header-url'>Search </router-link>
            </div>
	  		<div>
	  			<router-link  :to="{ name: 'latest-releases' }" class='url header-url'> Latest releases</router-link>
	  		</div>-->
	  		<div v-if='user'>
                <span class='jobs' title='Current jobs'><i class='fa fa-database'></i><span>{{ user.jobs }}</span></span>
            </div>
	  		<div v-if='user' >
				<div class='dropdown'>

					<div class='dropdown-main' v-on:click='dropdown = true'>
						<img width='32' height='32' class='logo' :src='user.avatar'>
					</div>
					<div class='dropdown-content paper' v-on-clickaway="fade" v-if='dropdown == true'>
		    			<router-link  :to="{ name: 'dashboard' }" class='url header-url'>Dashboard</router-link>
		    		</div>
					<div class='dropdown-content paper' v-on-clickaway="fade" v-if='dropdown == true'>
		    			<router-link  :to="{ name: 'dashboard' }" class='url header-url'>Library</router-link>
		    		</div>
					<div class='dropdown-content paper' v-on-clickaway="fade" v-if='dropdown == true'>
		    			<span class='url' v-on:click="logout()">Logout</span>
		    		</div>
		    	</div>
			</div>
			<div v-if="!user">

	    		<router-link class='' :to="{ name: 'sign-in' }">Login</router-link>
			</div>
		</div>
	</div>

    <router-view/>

    <!--<div class='character character-right'><img src='../assets/characters/rokka_no_yuusha.png'></div>-->
  </div>
</template>

<script>
	import { mixin as clickaway } from 'vue-clickaway';
	import { container } from "../services/container";

	export default {

 		mixins: [ clickaway ],
		name: 'Main',
		props: ['user'],
		data () {
			return {
				dropdown: false
			}
		},
		methods: {
			fade() {
				this.dropdown = false;
			},
			logout() {
	        	container.get('services.oauth').logout();
	        	window.location.href = "/";
			}
		}
	}
</script>

<style>
	.header-content {
		height: 48px;
		margin: 0 auto;
		max-width: 1100px;
		position:relative;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-main {
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		right: 0;
		padding: 10px;
		/* top: 0; */
	}

	.jobs {
		font-size: 14px;
		position: relative;
		width: 80px;
		margin: 0 20px;
		font-size: 24px;
	}

	.jobs > span {
		font-size: 9px;
		color: white;
		background: #fa3e3e;
		padding: 1px 4px;
		border-radius: 10px;
		position: absolute;
		top: -2px;
		right: -9px;
		z-index: 3;
	}

	.dropdown-content::before {
		position: absolute;
	    display: inline-block;
	    content: "";
		top: -16px;
	    right: 9px;
	    left: auto;
	    border: 8px solid transparent;
	    border-bottom-color: rgba(27,31,35,0.15);
	}

	.dropdown-content::after {
	    top: -14px;
	    right: 10px;
	    left: auto;
	    border: 7px solid transparent;
	    border-bottom-color: #fff;
	    position: absolute;
	    display: inline-block;
	    content: "";
	}

	.header-url {
		font-size: 16px;
		margin: 0 10px;
	}

	@media (max-width:1600px){
		.character {
			display: none;
		}
	}
	.character {
		position: fixed;
		bottom: 0;
		width: 200px;
		margin: 50px;
		max-height: 500px;
	}

	.character > img {
		width: 100%;
	}

	.character-left {
		left: 0;
	}

	.character-right {
		right: 0;
	}
</style>
