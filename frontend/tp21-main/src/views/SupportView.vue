<template>
  <section class="bg-white py-16">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h1 class="text-3xl md:text-4xl font-bold uppercase mb-4">
        {{ $t('supportView.Header.title') }}
      </h1>
      <p class="text-gray-600 mb-8">
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
            class="border border-gray-300 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100">
            {{ $t(`supportView.${item.text}`) }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <FrequentAsk />


  <!-- Toast -->
  <transition name="fade">
    <div v-if="toast.show" :class="['toast', toast.type]">{{ toast.message }}</div>
  </transition>


</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FrequentAsk from '@/components/FrequentAsk.vue';
import '../assets/toast.css'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();
const searchQuery = ref('');

const suggestions = [
  { text: t('supportView.tryAsking1'), id: 25 },
  { text: t('supportView.tryAsking2'), id: 23 },
  { text: t('supportView.tryAsking3'), id: 17 },
  { text: t('supportView.tryAsking4'), id: 6 }
]


const toast = ref({ show: false, type: '', message: '' })
let toastTimeout = null

// const showToast = (type, messageKey, params = {}, duration = 3000) => {
// const message = t(`messages.toast.${type}.${messageKey}`, params)
// toast.value = { show: true, type, message }
// if (toastTimeout) clearTimeout(toastTimeout)
// toastTimeout = setTimeout(() => {
//     toast.value.show = false
// }, duration)
// }

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