<!--
  SupportView.vue

  This component provides the support search interface, including:
  - A title and description section
  - A search input and button to navigate to search results
  - Suggested quick question buttons
  - A "Back to top" floating button
  - Includes the FrequentAsk component
  - Displays toast messages for empty input validation
-->

<template>
  <section class="bg-white py-16">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h1 class="text-3xl  text-blue-600 font-semibold uppercase mb-4 text-left">
        {{ $t('supportView.Header.title') }}
      </h1>
      <p class="text-lg text-gray-600 mb-8 text-left">
        {{ $t('supportView.Header.description') }}
      </p>
      <div class="flex items-center max-w-xl mx-auto mb-6">
        <input v-model="searchQuery" @keyup.enter="onSearch" type="text" :placeholder="$t('supportView.Placeholder')"
          class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button @click="onSearch" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-r-lg">
          {{ $t('supportView.searchButton') }}
        </button>
      </div>
      <div>
        <p class="text-gray-700 mb-4 font-medium">{{ $t('supportView.tryAskingTitle') }}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button v-for="(item, index) in suggestions" :key="index" @click="onSuggestionClick(item)"
            class="rounded-full px-4 py-2 text-gray-800 bg-[#E2EDFE] hover:bg-[#cde0fc] border border-gray-300 transition">
            {{ item.text }}
          </button>
        </div>
      </div>
    </div>
  </section>
  <FrequentAsk />


  <div
    class="fixed bottom-6 right-6 w-16 h-16 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition flex flex-col items-center justify-center"
    aria-label="Back to top" v-if="showBackToTop" @click="scrollToTop">
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="45" fill="#0B5CD5" fill-opacity="0.5" />
      <path
        d="M46.7678 18.2322C45.7915 17.2559 44.2085 17.2559 43.2322 18.2322L27.3223 34.1421C26.346 35.1184 26.346 36.7014 27.3223 37.6777C28.2986 38.654 29.8816 38.654 30.8579 37.6777L45 23.5355L59.1421 37.6777C60.1184 38.654 61.7014 38.654 62.6777 37.6777C63.654 36.7014 63.654 35.1184 62.6777 34.1421L46.7678 18.2322ZM45 53L47.5 53L47.5 36.5L45 36.5L42.5 36.5L42.5 53L45 53ZM45 36.5L47.5 36.5L47.5 20L45 20L42.5 20L42.5 36.5L45 36.5Z"
        fill="white" />
      <path
        d="M29.56 75V63.64H25.08V61H37.28V63.64H32.8V75H29.56ZM42.8295 75.16C41.6829 75.16 40.6629 74.92 39.7695 74.44C38.8895 73.96 38.1895 73.3067 37.6695 72.48C37.1629 71.64 36.9095 70.6867 36.9095 69.62C36.9095 68.54 37.1629 67.5867 37.6695 66.76C38.1895 65.92 38.8895 65.2667 39.7695 64.8C40.6629 64.32 41.6829 64.08 42.8295 64.08C43.9629 64.08 44.9762 64.32 45.8695 64.8C46.7629 65.2667 47.4629 65.9133 47.9695 66.74C48.4762 67.5667 48.7295 68.5267 48.7295 69.62C48.7295 70.6867 48.4762 71.64 47.9695 72.48C47.4629 73.3067 46.7629 73.96 45.8695 74.44C44.9762 74.92 43.9629 75.16 42.8295 75.16ZM42.8295 72.6C43.3495 72.6 43.8162 72.48 44.2295 72.24C44.6429 72 44.9695 71.66 45.2095 71.22C45.4495 70.7667 45.5695 70.2333 45.5695 69.62C45.5695 68.9933 45.4495 68.46 45.2095 68.02C44.9695 67.58 44.6429 67.24 44.2295 67C43.8162 66.76 43.3495 66.64 42.8295 66.64C42.3095 66.64 41.8429 66.76 41.4295 67C41.0162 67.24 40.6829 67.58 40.4295 68.02C40.1895 68.46 40.0695 68.9933 40.0695 69.62C40.0695 70.2333 40.1895 70.7667 40.4295 71.22C40.6829 71.66 41.0162 72 41.4295 72.24C41.8429 72.48 42.3095 72.6 42.8295 72.6ZM57.175 75.16C56.2683 75.16 55.475 74.96 54.795 74.56C54.115 74.16 53.5817 73.5533 53.195 72.74C52.8217 71.9133 52.635 70.8733 52.635 69.62C52.635 68.3533 52.815 67.3133 53.175 66.5C53.535 65.6867 54.055 65.08 54.735 64.68C55.415 64.28 56.2283 64.08 57.175 64.08C58.1883 64.08 59.095 64.3133 59.895 64.78C60.7083 65.2333 61.3483 65.8733 61.815 66.7C62.295 67.5267 62.535 68.5 62.535 69.62C62.535 70.7533 62.295 71.7333 61.815 72.56C61.3483 73.3867 60.7083 74.0267 59.895 74.48C59.095 74.9333 58.1883 75.16 57.175 75.16ZM50.815 78.88V64.24H53.795V66.44L53.735 69.64L53.935 72.82V78.88H50.815ZM56.635 72.6C57.155 72.6 57.615 72.48 58.015 72.24C58.4283 72 58.755 71.66 58.995 71.22C59.2483 70.7667 59.375 70.2333 59.375 69.62C59.375 68.9933 59.2483 68.46 58.995 68.02C58.755 67.58 58.4283 67.24 58.015 67C57.615 66.76 57.155 66.64 56.635 66.64C56.115 66.64 55.6483 66.76 55.235 67C54.8217 67.24 54.495 67.58 54.255 68.02C54.015 68.46 53.895 68.9933 53.895 69.62C53.895 70.2333 54.015 70.7667 54.255 71.22C54.495 71.66 54.8217 72 55.235 72.24C55.6483 72.48 56.115 72.6 56.635 72.6Z"
        fill="white" />
    </svg>
  </div>

  <!-- Toast -->
  <transition name="fade">
    <div v-if="toast.show" :class="['toast', toast.type]">{{ toast.message }}</div>
  </transition>


</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import FrequentAsk from '@/components/support/FrequentAsk.vue';
import '@/assets/toast.css'
import { useI18n } from 'vue-i18n'

import { onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const { t } = useI18n()
const router = useRouter();
const searchQuery = ref('');

const suggestions = computed(() => [
  { text: t('supportView.supportView.tryAsking1'), id: 25 },
  { text: t('supportView.supportView.tryAsking2'), id: 23 },
  { text: t('supportView.supportView.tryAsking3'), id: 17 },
  { text: t('supportView.supportView.tryAsking4'), id: 6 }
])


const toast = ref({ show: false, type: '', message: '' })
let toastTimeout = null

function showToast(type, message, duration = 3000) {
  toast.value = { show: true, type, message }
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, duration)
}

function onSearch() {
  if (searchQuery.value.trim() === '') {
    showToast('warning', t('supportView.toast.warning'))
    return
  }
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchingSupport', query: { q: searchQuery.value } });
  }
}

function onSuggestionClick(item) {
  router.push({ name: 'ArticleDetail', params: { id: item.id } });
}
</script>