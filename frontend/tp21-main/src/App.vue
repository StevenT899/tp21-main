<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/FooterTeam.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/login');
  }
});
</script>

<template>
  <div v-if="isLoggedIn">
    <NavBar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<style scoped>

</style>    