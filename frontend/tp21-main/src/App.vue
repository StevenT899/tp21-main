<script setup>
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from './components/base/NavBar.vue';
import Footer from './components/base/FooterTeam.vue';
import { isLoggedIn } from './auth';

const router = useRouter();
const route  = useRoute();

if (!isLoggedIn.value && route.path !== '/login') {
  router.push('/login');
}

watch(isLoggedIn, (val) => {
  if (!val && router.currentRoute.value.path !== '/login') {
    router.push('/login');
  }
});
</script>

<template>
  <NavBar v-if="isLoggedIn" />
  <main>
    <router-view />
  </main>
  <Footer v-if="isLoggedIn" />
</template>

<style scoped>

</style>
