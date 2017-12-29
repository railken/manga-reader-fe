<template>
  <div>
  	<div v-if='user'>
    	{{ user.username }}
	</div>
  </div>
</template>

<script>
export default {
	name: 'Main',
	props: ['user'],
	data () {
		return {
		 	msg: ' ',
		}
	}
}
</script>

<style>

</style>
