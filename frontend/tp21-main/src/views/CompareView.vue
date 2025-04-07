<template>
  <div class="min-h-screen bg-gray-50 p-8 mx-auto max-w-[1400px]">
    <!-- Page Header -->
    <div class="text-start mb-10">
      <h1 class="text-3xl font-semibold text-blue-600 mb-2">COMPARE YOUR SELECTED SCHOOLS</h1>
      <p class="text-lg text-gray-600">You can select up to 3 schools. See how they compare side-by-side.</p>
    </div>

    <!-- School Comparison Cards -->
    <div class="flex flex-wrap justify-center gap-x-20">
      <div
        v-for="i in 3"
        :key="i"
        class="relative w-full sm:w-1/3 p-4 max-w-md bg-white rounded-lg shadow-lg min-h-[650px]"
      >
        <template v-if="schools[i - 1]">
          <button
            @click="removeSchool(i - 1)"
            class="absolute top-2 right-2 text-sm font-semibold text-gray-400 hover:text-blue-500 z-10 bg-white px-2 py-1 rounded shadow"
            title="Remove this school"
          >
            Remove School
          </button>

          <div class="flex flex-col justify-between mb-4 h-28">
            <h2 class="text-3xl font-bold text-center text-600 mt-6">{{ schools[i - 1].name }}</h2>
            <div v-if="schools[i - 1].url" class="text-right mb-4">
              <a
                :href="schools[i - 1].url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 text-sm hover:underline inline-flex items-center gap-1"
              >
                Visit school website
              </a>
            </div>
          </div>

          <div class="space-y-6 text-xl text-gray-800 min-h-[460px]">
            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">School Type</span>
              <span class="block">{{ schools[i - 1].type }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">Year Range</span>
              <span class="block">{{ schools[i - 1].yearRange }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold mb-2">Language Program</span>
              <div v-if="schools[i - 1].languageProgramArr.length" class="flex flex-wrap gap-2">
                <span
                  v-for="(lang, j) in schools[i - 1].languageProgramArr.slice(0, 4)"
                  :key="j"
                  class="bg-blue-600 text-white text-xl px-3 py-1 rounded-full"
                >
                  {{ lang }}
                </span>
              </div>
              <div v-else class="text-white-500">None</div>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">Teaching Staff Per Student</span>
              <span class="block">{{ formatNumber(schools[i - 1].staffPerStudent) }}</span>
            </div>

            <!-- ICSEA with Tooltip -->
            <div class="pb-4 border-b border-gray-300">
              <div class="flex items-center justify-between">
                <span class="font-bold">Index of Community Socio-Educational Advantage (ICSEA)</span>
                <div class="relative group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-600 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <path d="M12 16h.01" />
                    <path d="M12 12a2 2 0 1 0-2-2" />
                  </svg>
                  <div class="absolute top-full mt-2 right-0 w-64 bg-gray-800 text-white text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    ICSEA reflects the socio-educational background of students. The average is 1000. Higher scores indicate greater advantage.
                  </div>
                </div>
              </div>
              <span class="block mt-2">{{ schools[i - 1].icsea }}</span>
            </div>

            <div>
              <span class="block font-bold">Enrolments</span>
              <span class="block">Total enrolment: {{ schools[i - 1].totalEnrolment }}</span>
              <div class="flex justify-center items-end mt-6 pb-4">
                <GenderBarChart :girls="schools[i - 1].Girls_Enrolment" :boys="schools[i - 1].Boys_Enrolment" />
                <LanguageBarChart
                  :english="schools[i - 1].english"
                  :notEnglish="schools[i - 1].notEnglish"
                  :notStated="schools[i - 1].notStated"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- Placeholder card -->
        <template v-else>
          <div class="flex flex-col h-full justify-start text-gray-500">
            <div class="mb-4 relative">
              <h3 class="text-xl font-semibold mb-2">Search To Add A School</h3>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  v-model="searchQuery"
                  @input="searchCompareSchools"
                  type="text"
                  placeholder="Enter school name"
                  class="text-lg w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ul v-if="recommendedSchool.length" class="absolute z-10 w-full border mt-1 rounded shadow bg-white max-h-60 overflow-y-auto">
                  <li
                    v-for="(item, index) in recommendedSchool"
                    :key="index"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    @click="selectRecommended(item)"
                  >
                    {{ item.School_Name }} ({{ item.Suburb }})
                  </li>
                </ul>
              </div>
              <div class="flex justify-end mt-2">
                <button @click="addToCompare" class="bg-blue-600 text-lg text-white px-4 py-2 rounded shadow hover:bg-blue-700 w-fit">
                  Add to compare
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-semibold mb-4">Remove School</h2>
        <p class="text-gray-600 text-xl mb-6">Are you sure you want to remove this school from the comparison?</p>
        <div class="flex justify-center gap-4">
          <button @click="confirmRemove" class="px-4 py-2 bg-red-600 text-white text-lg rounded-md hover:bg-red-700">Remove</button>
          <button @click="cancelRemove" class="px-4 py-2 bg-gray-200 text-gray-700 text-lg rounded-md hover:bg-gray-300">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      :class="[
        'fixed top-6 left-1/2 transform -translate-x-1/2 px-8 py-5 rounded-lg shadow-lg text-white text-2xl z-50 transition-opacity duration-300',
        toastType === 'success' ? 'bg-green-500' : 'bg-yellow-500'
      ]"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import GenderBarChart from '../components/GenderBarChart.vue'
import LanguageBarChart from '../components/LanguageBarChart.vue'

const schools = ref([])
const showConfirm = ref(false)
const pendingRemoveIndex = ref(null)
const recommendedSchool = ref([])
const allSchools = ref([])
const searchQuery = ref('')
let selectedSchool = null


const toastMessage = ref('')
const toastType = ref('success')
const showToast = ref(false)
const triggerToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const searchCompareSchools = async () => {
  const input = searchQuery.value.trim().toLowerCase()
  if (!input) {
    recommendedSchool.value = []
    return
  }
  if (!allSchools.value.length) {
    try {
      const res = await fetch('${import.meta.env.VITE_API_URL}/schools')
      // const res = await fetch('http://127.0.0.1:5000/schools')
      const data = await res.json()
      allSchools.value = data
    } catch (err) {
      console.error('Failed to fetch schools:', err)
      return
    }
  }
  recommendedSchool.value = allSchools.value.filter(s => {
    const name = (s.School_Name || '').toLowerCase()
    const suburb = (s.Suburb || '').toLowerCase()
    return name.includes(input) || suburb.includes(input)
  }).slice(0, 8)
}

const selectRecommended = (item) => {
  searchQuery.value = item.School_Name
  selectedSchool = item
  recommendedSchool.value = []
}

const addToCompare = async () => {
  if (!selectedSchool) {
    triggerToast('Please select a school first.', 'error')
    return
  }

  if (schools.value.length >= 3) {
    triggerToast('You can only compare up to 3 schools.', 'error')
    return
  }

  if (schools.value.find(s => s.name === selectedSchool.School_Name)) {
    triggerToast('This school has already been added.', 'error')
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/school/${selectedSchool.School_AGE_ID}`)
    // const res = await fetch(`http://127.0.0.1:5000/school/${selectedSchool.School_AGE_ID}`)
    const detailed = await res.json()

    const formatted = {
      name: detailed.School_Name || 'N/A',
      type: detailed.School_Sector || 'N/A',
      yearRange: detailed.Year_Range || 'N/A',
      languageProgram: Array.isArray(detailed.languages) ? detailed.languages.join(', ') : detailed.languageProgram || 'None',
      staffPerStudent: detailed.Teaching_staff_per_student || 'N/A',
      totalEnrolment: detailed.Total_Enrolment || 'N/A',
      studentLanguageBackground: detailed.Language_Flag || 'N/A',
      icsea: detailed.ICSEA || 'N/A',
      english: Number(detailed.English) || 0,
      notEnglish: Number(detailed.not_English) || 0,
      notStated: Number(detailed.not_stated) || 0,
      Girls_Enrolment: Number(detailed.Girls_Enrolment) || 0,
      Boys_Enrolment: Number(detailed.Boys_Enrolment) || 0,
      languageProgramArr: Array.isArray(detailed.languages) ? detailed.languages : (detailed.languageProgram ? [detailed.languageProgram] : []),
      url: detailed.School_URL || ''
    }

    schools.value.push(formatted)
    const stored = JSON.parse(sessionStorage.getItem('compareList') || '[]')
    stored.push(formatted)
    sessionStorage.setItem('compareList', JSON.stringify(stored))
    searchQuery.value = ''
    selectedSchool = null

    triggerToast('School added successfully!', 'success')
  } catch (err) {
    console.error('Failed to fetch detailed school data:', err)
    triggerToast('Failed to fetch school data.', 'error')
  }
}

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

const cancelRemove = () => {
  showConfirm.value = false
  pendingRemoveIndex.value = null
}

const removeSchool = (index) => {
  pendingRemoveIndex.value = index
  showConfirm.value = true
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
      schools.value = parsed.slice(0, 3).map(item => ({
        name: item.name,
        type: item.type,
        yearRange: item.yearRange || item.Year_Range,
        languageProgram: item.languageProgram,
        staffPerStudent: item.staffPerStudent,
        totalEnrolment: item.totalEnrolment,
        studentLanguageBackground: item.studentLanguageBackground,
        icsea: item.icsea,
        english: Number(item.english ?? item.English ?? 0),
        notEnglish: Number(item.notEnglish ?? item.not_English ?? 0),
        notStated: Number(item.notStated ?? item.not_stated ?? 0),
        Girls_Enrolment: Number(item.Girls_Enrolment ?? 0),
        Boys_Enrolment: Number(item.Boys_Enrolment ?? 0),
        languageProgramArr: item.languageProgramArr || item.languages || [],
        url: item.url || item.School_URL || '' 
      }))
    } catch (err) {
      console.error('Failed to parse compareList from sessionStorage:', err)
    }
  }
})
</script>
