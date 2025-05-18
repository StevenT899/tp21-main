<!--
  ArticleDetailView.vue

  This component displays the detailed content of a selected article.

  Features:
  - Shows the article title, full content, and reference information.
  - Supports internationalization (i18n); uses translated content if available for the current locale.
  - Applies line break formatting to content using <br> tags.
  - Provides a "Go Back" button for navigation.
  - Displays a loading message while the article is being fetched.
-->

<template>
  <section class="max-w-3xl mx-auto py-8 px-4">
    <button @click="goBack"
      class="mb-6 inline-flex items-center px-3 py-1 bg-[#E2EDFE] text-gray-800 rounded hover:bg-gray-200 focus:outline-none">
      <span class="text-lg font-medium">{{ $t('articleDetailView.button.goBack') }}</span>
    </button>
    <div v-if="article">
      <h1 class="text-3xl font-bold mb-4">{{ currentArticle.topic }}</h1>
      <hr class="border-t-2 mb-6">
      <div class="text-gray-800 leading-relaxed mb-6" v-html="currentArticle.content"></div>
      <div class="bg-[#F4F7FC] p-4 rounded text-sm text-gray-700 space-y-1">
        <p><strong>{{ $t('articleDetailView.refer') }}</strong></p>
        <p>
          {{ $t('articleDetailView.adapt') }}
          <a :href="article.reference" target="_blank" rel="noopener noreferrer"
            class="text-blue-600 underline hover:text-blue-800">
            {{ currentArticle.reference }}
          </a>
        </p>
        <p>{{ $t('articleDetailView.under') }} {{ currentArticle.licence }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">{{ $t('articleDetailView.loading') }}</div>


  </section>

</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
const { locale, messages } = useI18n()
const route = useRoute()
const article = ref(null)
const router = useRouter()

function goBack() {
  const from = route.query.from
  const title = route.query.title

  if (from === 'questionList') {
    // 回到 journey 页面并触发 QuestionList 弹窗
    router.push({
      name: 'Journey',
      query: {
        from: 'questionList',
        title
      }
    })
  } else {
    // 默认回退行为
    window.history.back()
  }
  window.history.back()
}

onMounted(async () => {
  const id = route.params.id
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`)
  article.value = response.data

})

const currentArticle = computed(() => {
  const articleId = String(route.params.id)
  const raw = locale.value === 'zh'
    ? messages.value.zh?.articles?.[articleId] || article.value
    : article.value

  return {
    ...raw,
    content: raw?.content?.replace(/\\n/g, '<br>') || ''
  }
})
</script>