<template>
    <div>
        <router-link :to="{name: 'dashboard'}"  v-if="type === 'sm'">

            <div class='logo fluid fluid-center logo-sm'>
                <span>Manga</span>
                <img class='logo-img' src='../assets/shiro.png'>
                <span>Reader</span>
            </div>
        </router-link>

        <router-link :to="{name: 'dashboard'}" v-if="type === 'bg'">

            <div class='logo fluid fluid-center logo-bg'>
                <span>Manga</span>
                <img class='logo-img' src='../assets/shiro.png'>
                <span>Reader</span>
            </div>
        </router-link>
    </div>
</template>
<script>


export default {

    props: ['type'],
}

</script>
<style>
        
    .logo {
      font-family: "Indie Flower";
      text-transform: uppercase;
      font-size: 28px;
    }

    .logo img {
        width: 40px;
    }
        

        
    @media (min-width: 468px) {
        .logo-bg {
          font-size: 48px;
        }
        .logo-bg img {
          width: 70px;
        }
    }

    .logo img {
      margin: 0 5px;
    }
</style>