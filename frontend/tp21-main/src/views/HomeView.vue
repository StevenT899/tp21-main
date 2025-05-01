<!--
  Root application component
  --------------------------
  Composes the main home page layout by including:
    • HeroSection: the primary banner with headline and search functionality
    • HelpSection: the informational help block with guidance and signature
-->
<template>
  <div class="app">
    <HeroSection />
    <HelpSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/home/HeroSection.vue';
import HelpSection from '@/components/home/HelpSection.vue';
</script>