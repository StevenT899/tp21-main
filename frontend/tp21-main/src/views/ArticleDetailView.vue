<template>
    <section class="max-w-3xl mx-auto py-8 px-4">
        <button
      @click="goBack"
      class="mb-6 inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 focus:outline-none"
    >
      <span class="text-lg font-medium">&lt; Back</span>
    </button>
      <div v-if="article">
        <h1 class="text-3xl font-bold mb-4">{{ article.topic }}</h1>
        <hr class="border-t-2 mb-6">
        <div class="text-gray-800 leading-relaxed whitespace-pre-line mb-6">{{ article.content }}</div>
        <div class="bg-blue-50 p-4 rounded text-sm text-gray-700 space-y-1">
            <p><strong>Reference and Licence:</strong></p>
            <p>
                Adapted from:
                <a
                :href="article.reference"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 underline hover:text-blue-800"
                >
                {{ article.reference }}
                </a>
            </p>
            <p>Under {{ article.licence }}</p>
        </div>
      </div>
      <div v-else class="text-center text-gray-400">Loading...</div>
    </section>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const article = ref(null)

  function goBack() {
    window.history.back()
 }



  onMounted(async () => {
    const id = route.params.id
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`)
    article.value = response.data
    if (article.value.content) {
    article.value.content = article.value.content.replace(/\\n/g, '\n')
  }
    console.log(article.value)
  })


  
  </script>
  