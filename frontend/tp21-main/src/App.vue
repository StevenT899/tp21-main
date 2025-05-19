<!-- /**
  App.vue

  Description:
    Main application layout that conditionally renders navigation and footer based on login status.
    Performs authentication check on initial load and watches for changes to `isLoggedIn` to enforce routing logic.

  Key Features:
    - Imports and renders global layout components: NavBar and FooterTeam
    - Redirects unauthenticated users to the login page
    - Uses Vue Router's `router-view` to render page content dynamically
    - Watches login state reactively to handle mid-session logouts
 / -->

<script setup>
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from './components/base/NavBar.vue';
import Footer from './components/base/FooterTeam.vue';
import { isLoggedIn } from './auth';

const router = useRouter();
const route = useRoute();

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
    <router-view v-slot="{ Component }">
      <keep-alive include="HomeView">
        <component :is="Component" />
      </keep-alive>
    </router-view>

  </main>
  <Footer v-if="isLoggedIn" />
</template>

<style scoped></style>
