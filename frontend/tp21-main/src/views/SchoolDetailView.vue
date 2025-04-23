<template>
    <div class="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <!-- <button
      @click="goBack"
      class="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
    >
      Back
    </button> -->
      <!-- Header -->
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          {{ school?.School_Name || 'Loading...' }}
        </h1>
        <p class="text-lg text-gray-600 mt-4">{{ school?.Suburb }}, {{ school?.Postcode }}</p>
        <div class="flex justify-end items-center mt-4 flex-wrap gap-4">
          <a
            :href="school?.School_URL || '#'"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-1 text-blue-600 underline text-base"
          >
            Visit school website
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor"
              stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <button class="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
            Add to compare
          </button>
        </div>
      </div>
  
      <!-- Basic Info -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl border">
        <div>
          <p class="text-gray-500 text-sm">School Type</p>
          <p class="font-semibold text-gray-900">{{ school?.School_Sector }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Year Range</p>
          <p class="font-semibold text-gray-900">{{ school?.Year_Range }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">School Zone Check</p>
          <button class="mt-1 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded hover:bg-blue-200">
            📍 Use Location
          </button>
        </div>
      </div>
  
      <!-- Language Program -->
      <div class="bg-white p-6 rounded-xl border space-y-4">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold">Language Program</h2>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(lang, index) in school?.languages || []"
            :key="index"
            class="px-3 py-1 text-sm bg-blue-400 text-white rounded"
          >
            {{ lang }}
          </span>
          <span v-if="!(school?.languages && school.languages.length)" class="px-3 py-1 text-sm font-semibold text-gray-900 rounded">
            None
          </span>
        </div>
      </div>
  
      <!-- Student Cultural Background -->
      <div class="bg-white p-6 rounded-xl border space-y-4">
        <h2 class="text-xl font-semibold">Student Cultural Background</h2>
        <p class="text-gray-700">67% of students at the school are from language backgrounds other than English</p>

        <LanguageChartInDetailPage
      :notStated="school?.not_stated"
      :englishBackground="school?.English"
      :otherLanguagesBackground="school?.not_English"
    />
        
      </div>
  
      <!-- Staff and Enrolment (Vertical layout) -->
      <div class="grid grid-cols-1 gap-6">
        <div class="bg-white p-6 rounded-xl border space-y-4">
          <h2 class="text-xl font-semibold">School Staff</h2>
          <p class="text-gray-700">Teaching staff: <strong>{{ school?.Teaching_Staff }}</strong></p>
          <p class="text-gray-700">Non-teaching staff: <strong>{{ school?.Non_Teaching_Staff }}</strong></p>
  
          <h2 class="text-xl font-semibold">Student Enrolment</h2>
          <div class="flex justify-between text-gray-700 mb-1">
            <span>Total Enrolment: <strong>{{ school?.Total_Enrolment }}</strong></span>
            <span>
              Student per teaching staff:
              <strong>{{ Math.round(1 / (school?.Teaching_staff_per_student || 1)) }}</strong>
            </span>
          </div>
         
          <!-- <div class="w-full bg-purple-100 h-6 rounded overflow-hidden flex"> -->
            
            <GenderChartInDetailPage 
            v-if="school?.Girls_Enrolment && school?.Boys_Enrolment"
            :girls="school?.Girls_Enrolment" 
            :boys="school?.Boys_Enrolment" 
            />
            <p v-else>Loading...</p> <!-- Show loading or error message -->
             
  
          <h2 class="text-xl font-semibold flex items-center gap-1">Index Of Community Socio-Educational Advantage (ICSEA)</h2>
          <p class="text-gray-700">{{ school?.ICSEA }} (Higher than {{ school?.ICSEA_percentile }}% of primary schools in Victoria)</p>
        </div>
      </div>
  
      <!-- Debug School Object -->
      <!-- <div class="bg-gray-100 text-sm p-4 rounded-xl border border-gray-300 mt-8">
        <h2 class="font-bold mb-2 text-gray-700">Debug School Object</h2>
        <pre class="overflow-auto max-h-96 text-xs text-gray-800 bg-white p-2 rounded">
          {{ JSON.stringify(school, null, 2) }}
        </pre>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import GenderChartInDetailPage from '@/components/GenderChartInDetailPage.vue'
  import LanguageChartInDetailPage from '@/components/LanguageChartInDetailPage.vue'
  
  const route = useRoute()
  const router = useRouter()
  const school = ref(null)

  const goBack = () => {
  router.go(-1)  // This will go back to the previous page in the history
}
  
  onMounted(() => {
    const id = route.params.id
    fetch(`${import.meta.env.VITE_API_URL}/school/${id}`)
      .then(res => res.json())
      .then(data => {
          school.value = data
      })
  })
  </script>
  