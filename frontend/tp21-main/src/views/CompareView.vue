<template>
  <div class="min-h-screen bg-gray-50 p-8 mx-auto max-w-[1400px]">
    <!-- Page Header -->
    <div class="text-start mb-10">
      <h1 class="text-3xl font-semibold text-blue-600 mb-2">COMPARE YOUR SELECTED SCHOOLS</h1>
      <p class="text-lg text-gray-600">You can select up to 3 schools. See how they compare side-by-side.</p>
    </div>

    <!-- No school selected case -->
    <div v-if="schools.length === 0" class="text-center text-lg text-gray-600">
      <p>No schools available to compare.</p>
      <button @click="goToHome" class="mt-4 text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
        Go to Homepage
      </button>
    </div>

    <!-- School Comparison Cards -->
    <div v-else class="flex flex-wrap justify-center gap-x-20">
      <div
        v-for="(school, index) in schools"
        :key="index"
        class="relative w-full sm:w-1/3 p-4 max-w-md bg-white rounded-lg shadow-lg"
      >
        <!-- Remove Button -->
        <button
          @click="removeSchool(index)"
          class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold z-10"
          title="Remove this school"
        >
          ×
        </button>

        <!-- School Header -->
        <div class="flex flex-col mb-4">
          <h2 class="text-3xl font-bold text-center text-600 mb-6 mt-6">{{ school.name }}</h2>

          <!-- Website Link -->
          <div v-if="school.url" class="text-right mt-[-1rem] mb-4">
            <a
              :href="school.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 text-sm hover:underline inline-flex items-center gap-1"
            >
              Visit school website
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- School Info -->
        <div class="space-y-6 text-xl text-gray-800">
          <!-- Type -->
          <div class="pb-4 border-b border-gray-300">
            <span class="block font-bold">School Type</span>
            <span class="block">{{ school.type }}</span>
          </div>

          <!-- Year Range -->
          <div class="pb-4 border-b border-gray-300">
            <span class="block font-bold">Year Range</span>
            <span class="block">{{ school.yearRange }}</span>
          </div>

          <!-- Language Programs -->
          <div class="pb-4 border-b border-gray-300">
            <span class="block font-bold mb-2">Language Program</span>
            <div v-if="school.languageProgramArr && school.languageProgramArr.length" class="flex flex-wrap gap-2">
              <span
                v-for="(lang, i) in school.languageProgramArr.slice(0, 4)"
                :key="i"
                class="bg-blue-600 text-white text-xl px-3 py-1 rounded-full"
              >
                {{ lang }}
              </span>
            </div>
            <div v-else class="text-white-500">None</div>
          </div>

          <!-- Staff-Student Ratio -->
          <div class="pb-4 border-b border-gray-300">
            <span class="block font-bold">Teaching Staff Per Student</span>
            <span class="block">{{ formatNumber(school.staffPerStudent) }}</span>
          </div>

          <!-- ICSEA -->
          <div class="pb-4 border-b border-gray-300">
            <span class="block font-bold">Index of Community Socio-Educational Advantage (ICSEA)</span>
            <span class="block">{{ school.icsea }}</span>
          </div>

          <!-- Enrolment and Charts -->
          <div>
            <span class="block font-bold">Enrolments</span>
            <span class="block">Total enrolment: {{ school.totalEnrolment }}</span>
            <div class="flex justify-center items-end mt-6 pb-4"> 
              <GenderBarChart :girls="school.Girls_Enrolment" :boys="school.Boys_Enrolment" />
              <LanguageBarChart
                :english="school.english"
                :notEnglish="school.notEnglish"
                :notStated="school.notStated"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-semibold mb-4">Remove School</h2>
        <p class="text-gray-600 text-xl mb-6">Are you sure you want to remove this school from the comparison?</p>
        <div class="flex justify-center gap-4">
          <button
            @click="confirmRemove"
            class="px-4 py-2 bg-red-600 text-white text-lg rounded-md hover:bg-red-700"
          >
            Remove
          </button>
          <button
            @click="cancelRemove"
            class="px-4 py-2 bg-gray-200 text-gray-700 text-lg rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GenderBarChart from '../components/GenderBarChart.vue'
import LanguageBarChart from '../components/LanguageBarChart.vue'

// Router
const router = useRouter()

// School data list
const schools = ref([])

// Modal control
const showConfirm = ref(false)
const pendingRemoveIndex = ref(null)

// Trigger remove
const removeSchool = (index) => {
  pendingRemoveIndex.value = index
  showConfirm.value = true
}

// Confirm removal
const confirmRemove = () => {
  const index = pendingRemoveIndex.value
  if (index !== null && index >= 0 && index < schools.value.length) {
    schools.value.splice(index, 1)

    const stored = sessionStorage.getItem('compareList')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        parsed.splice(index, 1)
        sessionStorage.setItem('compareList', JSON.stringify(parsed))
      } catch (err) {
        console.error('Failed to update compareList in sessionStorage:', err)
      }
    }
  }

  showConfirm.value = false
  pendingRemoveIndex.value = null
}

// Cancel removal
const cancelRemove = () => {
  showConfirm.value = false
  pendingRemoveIndex.value = null
}

// Navigate to home page
const goToHome = () => {
  router.push({ name: 'Home' })
}

// Format number with two decimal places
const formatNumber = (value) => {
  const num = parseFloat(value)
  return isNaN(num) ? 'N/A' : num.toFixed(2)
}

// Load school data from sessionStorage
onMounted(() => {
  const stored = sessionStorage.getItem('compareList')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      schools.value = parsed.slice(0, 3).map(s => ({
        name: s.School_Name || s.name || 'N/A',
        type: s.School_Sector || s.type || 'N/A',
        yearRange: s.Year_Range || s.yearRange || 'N/A',
        languageProgram: Array.isArray(s.languages)
          ? s.languages.join(', ')
          : s.languageProgram || 'None',
        staffPerStudent: s.Teaching_staff_per_student || s.staffPerStudent || 'N/A',
        totalEnrolment: s.Total_Enrolment || s.totalEnrolment || 'N/A',
        studentLanguageBackground: s.Language_Flag || s.studentLanguageBackground || 'N/A',
        icsea: s.ICSEA || s.icsea || 'N/A',
        english: s.English || 0,
        notEnglish: s.not_English || 0,
        notStated: s.not_stated || 0,
        Girls_Enrolment: s.Girls_Enrolment || 0,
        Boys_Enrolment: s.Boys_Enrolment || 0,
        languageProgramArr: Array.isArray(s.languages) ? s.languages : (s.languageProgram ? [s.languageProgram] : []),
        url: s.School_URL || s.url || ''
      }))
    } catch (err) {
      console.error('Failed to parse compareList from sessionStorage:', err)
    }
  }
})
</script>

<style scoped>
</style>
