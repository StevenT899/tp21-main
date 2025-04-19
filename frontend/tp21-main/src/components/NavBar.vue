<template>
    <!-- Navigation Bar -->
    <nav class="bg-blue-600 text-white py-3 px-6 flex items-center justify-between">
        <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" y1="8" x2="12" y2="8"></line>
                <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
            </svg>
            <span class="text-xl font-bold">SchoolMate</span>
        </div>
        <div class="flex-grow flex items-center justify-center space-x-6 hidden md:flex">
            <router-link to="/home" class="hover:underline">{{ $t('nav.home') }}</router-link>
            <router-link to="/compare" class="hover:underline">{{ $t('nav.compare') }}</router-link>
            <a href="#" class="hover:underline">{{ $t('nav.journey') }}</a>
            <a href="#" class="hover:underline">{{ $t('nav.support') }}</a>
        </div>
        <div class="flex items-center space-x-2 md:space-x-4">
            <button @click="changeLocale('en')" class="hover:underline">{{ $t('nav.english') }}</button>
            <span class="text-white">|</span>
            <button @click="changeLocale('zh')" class="hover:underline">{{ $t('nav.chinese') }}</button>
        </div>
    </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const changeLocale = (newLocale) => {
    locale.value = newLocale;
};
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
}
</style>