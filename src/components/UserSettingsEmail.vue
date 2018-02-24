<template>
  <div>
    <div v-if='user'>
        <div>
            Change password
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
            slug: null,
        };
    },
    props: ['user'],
    methods: {
        load () {

        },
        request () {
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
