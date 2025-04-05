<template>
  <div class="min-h-screen bg-gray-50 p-8 mx-auto max-w-[1400px]">
    <div class="text-start mb-10">
      <h1 class="text-3xl font-semibold text-blue-600 mb-2">COMPARE YOUR SELECTED SCHOOLS</h1>
      <p class="text-lg text-gray-600">You can select up to 3 schools. See how they compare side-by-side.</p>
    </div>

    <div v-if="schools.length === 0" class="text-center text-lg text-gray-600">
      <p>No schools available to compare.</p>
      <button @click="goToHome" class="mt-4 text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
        Go to Homepage
      </button>
    </div>
    
    <div v-else class="flex flex-wrap justify-center gap-x-20">
      <div
        v-for="(school, index) in schools"
        :key="index"
        class="w-full sm:w-1/3 p-4 max-w-md bg-white rounded-lg shadow-lg"
      >
        <div class="flex flex-col mb-4">
          <h2 class="text-3xl font-bold text-center text-blue-600 mb-6">{{ school.name }}</h2>

          <div class="space-y-6 text-xl text-gray-800">
            <div>
              <span class="block font-bold">School Type</span>
              <span class="block">{{ school.type }}</span>
            </div>

            <div>
              <span class="block font-bold">Year Range</span>
              <span class="block">{{ school.yearRange }}</span>
            </div>

            <div>
              <span class="block font-bold">Language Program</span>
              <span class="block">{{ school.languageProgram || 'None' }}</span>
            </div>

            <div>
              <span class="block font-bold">Teaching Staff Per Student</span>
              <span class="block">{{ formatNumber(school.staffPerStudent) }}</span>
            </div>

            <div>
              <span class="block font-bold">Index of Community Socio-Educational Advantage (ICSEA)</span>
              <span class="block">{{ school.icsea }}</span>
            </div>

            <div>
              <span class="block font-bold">Enrolments</span>
              <span class="block">Total enrolment: {{ school.totalEnrolment }}</span>
              <div class="flex justify-center items-end gap-4 mt-6"> 
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GenderBarChart from '../components/GenderBarChart.vue'
import LanguageBarChart from '../components/LanguageBarChart.vue'
const router = useRouter()
const schools = ref([])

const goToHome = () => {
  router.push({ name: 'Home' }) 
}

const formatNumber = (value) => {
  const num = parseFloat(value)
  return isNaN(num) ? 'N/A' : num.toFixed(2)
}

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
        Boys_Enrolment: s.Boys_Enrolment || 0
      }))
    } catch (err) {
      console.error('Failed to parse compareList from sessionStorage:', err)
    }
  }
})
</script>

<style scoped>

</style>
