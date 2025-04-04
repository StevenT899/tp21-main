<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/FooterTeam.vue';
</script>


<template>
  <NavBar/>
  <main>
    <router-view></router-view>
  </main>
  <Footer/>
</template>

<style scoped>

</style>