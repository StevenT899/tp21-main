<template>
  <div class="min-h-screen bg-gray-50 p-8 mx-auto max-w-[1400px]">
    <!-- Page Header -->
    <div class="text-start mb-10">
      <h1 class="text-3xl font-semibold text-blue-600 mb-2">COMPARE YOUR SELECTED SCHOOLS</h1>
      <p class="text-lg text-gray-600">You can select up to 3 schools. See how they compare side-by-side.</p>
    </div>

    <!-- School Comparison Cards -->
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
      <div v-for="i in 3" :key="i"
        class="relative w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 p-4 max-w-md bg-white rounded-lg shadow-lg min-h-[650px]">
        <template v-if="schools[i - 1]">
          <button @click="removeSchool(i - 1)"
            class="absolute top-2 right-2 text-sm font-semibold text-gray-400 hover:text-blue-500 z-10 bg-white px-2 py-1 rounded shadow"
            title="Remove this school">
            Remove School
          </button>
          <div class="flex flex-col justify-between mb-4 h-28">
            <h2 class="text-3xl font-bold text-center text-600 mt-6">{{ schools[i - 1].name }}</h2>
            <div v-if="schools[i - 1].url" class="text-right mt-1">
              <a :href="schools[i - 1].url" target="_blank" rel="noopener noreferrer"
                class="text-blue-500 text-sm hover:underline inline-flex items-center gap-1">
                Visit school website
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor"
                  stroke-width="2" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          <div class="space-y-6 text-xl text-gray-800 min-h-[460px]">
            <div class="pb-4 border-b border-gray-300 sm:mt-20 md:mt-12 lg:mt-40 xl:mt-10">
              <span class="block font-bold">School Type</span>
              <span class="block text-center mt-6">{{ schools[i - 1].type }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">Year Range</span>
              <span class="block text-center mt-6">{{ schools[i - 1].yearRange }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold mb-2 mt-6">Language Program</span>

              <!-- Language Program Container -->
              <div v-if="schools[i - 1].languageProgramArr.length"
                class="flex flex-wrap gap-4 mt-6 justify-center min-h-[80px]">
                <!-- Render language program buttons -->
                <span v-for="(lang, j) in schools[i - 1].languageProgramArr.slice(0, 4)" :key="j"
                  class="bg-blue-700 text-sm text-white px-4 py-2 rounded-full w-1/3 text-center truncate mb-1"
                  :title="lang">
                  {{ lang }}
                </span>

                <!-- Empty placeholders -->
                <span v-for="n in (4 - schools[i - 1].languageProgramArr.length)" :key="'empty-' + n"
                  class="w-1/3 h-10 "></span>
              </div>

              <!-- Display "None" -->
              <div v-else class="text-500 w-full text-center py-2 mt-6 min-h-[56px]">
                None
              </div>

              <!-- Empty row when "None" is displayed -->
              <div v-if="schools[i - 1].languageProgramArr.length === 0" class="flex justify-center gap-4">
                <span class="w-1/3 h-10"></span>
                <span class="w-1/3 h-10"></span>
              </div>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">Student Per Teaching Staff</span>
              <span class="block text-center mt-6">{{ Math.round(formatNumber(1 / schools[i - 1].staffPerStudent)
                )}}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <div class="flex items-center justify-between group">
                <span class="font-bold">Index of Community Socio-Educational Advantage (ICSEA)</span>
                <div class="relative">


                  <svg width="16" height="16" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-600 cursor-pointer">
                    <path
                      d="M14.1666 0.666504C21.5306 0.666504 27.4999 6.63584 27.4999 13.9998C27.4999 21.3638 21.5306 27.3332 14.1666 27.3332C6.80259 27.3332 0.833252 21.3638 0.833252 13.9998C0.833252 6.63584 6.80259 0.666504 14.1666 0.666504ZM14.1666 3.33317C11.3376 3.33317 8.6245 4.45698 6.62411 6.45736C4.62372 8.45775 3.49992 11.1709 3.49992 13.9998C3.49992 16.8288 4.62372 19.5419 6.62411 21.5423C8.6245 23.5427 11.3376 24.6665 14.1666 24.6665C16.9956 24.6665 19.7087 23.5427 21.7091 21.5423C23.7094 19.5419 24.8333 16.8288 24.8333 13.9998C24.8333 11.1709 23.7094 8.45775 21.7091 6.45736C19.7087 4.45698 16.9956 3.33317 14.1666 3.33317ZM14.1666 19.3332C14.5202 19.3332 14.8593 19.4736 15.1094 19.7237C15.3594 19.9737 15.4999 20.3129 15.4999 20.6665C15.4999 21.0201 15.3594 21.3593 15.1094 21.6093C14.8593 21.8594 14.5202 21.9998 14.1666 21.9998C13.813 21.9998 13.4738 21.8594 13.2238 21.6093C12.9737 21.3593 12.8333 21.0201 12.8333 20.6665C12.8333 20.3129 12.9737 19.9737 13.2238 19.7237C13.4738 19.4736 13.813 19.3332 14.1666 19.3332ZM14.1666 6.6665C15.2896 6.66654 16.3776 7.05764 17.2436 7.77264C18.1097 8.48763 18.6997 9.48188 18.9123 10.5846C19.125 11.6873 18.947 12.8297 18.409 13.8155C17.8709 14.8012 17.0064 15.5689 15.9639 15.9865C15.8095 16.0433 15.6703 16.135 15.5573 16.2545C15.4986 16.3212 15.4893 16.4065 15.4906 16.4945L15.4999 16.6665C15.4995 17.0063 15.3694 17.3332 15.1361 17.5803C14.9028 17.8274 14.584 17.9762 14.2447 17.9961C13.9055 18.016 13.5714 17.9056 13.3108 17.6875C13.0502 17.4694 12.8827 17.16 12.8426 16.8225L12.8333 16.6665V16.3332C12.8333 14.7958 14.0733 13.8732 14.9719 13.5118C15.3377 13.3658 15.6567 13.1229 15.8948 12.8092C16.1329 12.4954 16.2811 12.1228 16.3234 11.7312C16.3657 11.3397 16.3005 10.944 16.1349 10.5867C15.9693 10.2294 15.7094 9.92392 15.3833 9.70314C15.0572 9.48236 14.6771 9.35458 14.2838 9.33353C13.8905 9.31248 13.4989 9.39895 13.1511 9.58366C12.8033 9.76838 12.5123 10.0443 12.3095 10.3819C12.1067 10.7195 11.9997 11.106 11.9999 11.4998C11.9999 11.8535 11.8594 12.1926 11.6094 12.4426C11.3593 12.6927 11.0202 12.8332 10.6666 12.8332C10.313 12.8332 9.97382 12.6927 9.72378 12.4426C9.47373 12.1926 9.33325 11.8535 9.33325 11.4998C9.33325 10.218 9.84248 8.98858 10.7489 8.08215C11.6553 7.17573 12.8847 6.6665 14.1666 6.6665Z"
                      fill="black" />
                  </svg>

                  <div
                    class="absolute top-full mt-2 right-0 w-64 bg-gray-800 text-white text-lg p-2 rounded shadow-lg opacity-0 transition-opacity duration-300 z-50 pointer-events-none group-hover:opacity-100">
                    ICSEA reflects the socio-educational background of students. The average is 1000. Higher scores
                    indicate greater advantage.
                  </div>
                </div>
              </div>
              <span class="block mt-6 text-center">{{ schools[i - 1].icsea }}</span>
            </div>

            <div>
              <span class="block font-bold">Enrolments</span>
              <span class="block text-center mt-6">Total enrolment: {{ schools[i - 1].totalEnrolment }}</span>
              <div class="flex justify-center items-end mt-6 pb-4">
                <GenderBarChart :girls="schools[i - 1].Girls_Enrolment" :boys="schools[i - 1].Boys_Enrolment" />
                <LanguageBarChart :english="schools[i - 1].english" :notEnglish="schools[i - 1].notEnglish"
                  :notStated="schools[i - 1].notStated" />
              </div>
            </div>
          </div>
        </template>

        <!-- Placeholder card -->
        <template v-else>
          <div class="flex flex-col h-full justify-start text-gray-500">
            <div class="mb-4 relative">
              <h3 class="text-xl text-black font-semibold mb-2">Search To Add A School</h3>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="text-gray-500">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input v-model="searchQueries[i - 1]" @input="searchCompareSchools(i)" type="text"
                  :placeholder="'Enter school name '"
                  class="text-lg text-black w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <ul v-if="recommendedSchools[i - 1].length"
                  class="absolute z-10 w-full border mt-1 rounded shadow bg-white max-h-60 overflow-y-auto">
                  <li v-for="(item, index) in recommendedSchools[i - 1]" :key="index"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-lg text-black"
                    @click="selectRecommended(item, i)">
                    {{ item.School_Name }} ({{ item.Suburb }})
                  </li>
                </ul>
              </div>
              <div class="flex justify-end mt-2">
                <button @click="addToCompare(i)"
                  class="bg-blue-500 text-lg text-white px-4 py-2 rounded shadow hover:bg-blue-700 w-fit">
                  Add to compare
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center bg-gradient-to-t from-transparent to-transparent  z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-semibold mb-4">Remove School</h2>
        <p class="text-gray-600 text-xl mb-6">Are you sure you want to remove this school from the comparison?</p>
        <div class="flex justify-center gap-4">
          <button @click="confirmRemove"
            class="px-4 py-2 bg-red-600 text-white text-lg rounded-md hover:bg-red-700">Remove</button>
          <button @click="cancelRemove"
            class="px-4 py-2 bg-gray-200 text-gray-700 text-lg rounded-md hover:bg-gray-300">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast"
      :class="['fixed top-6 left-1/2 transform -translate-x-1/2 px-8 py-5 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300', toastType === 'success' ? 'bg-green-500' : 'bg-yellow-500']">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GenderBarChart from '../components/GenderBarChart.vue'
import LanguageBarChart from '../components/LanguageBarChart.vue'

const schools = ref([])
const recommendedSchools = ref([[], [], []])  // Recommended schools for each search input
const searchQueries = ref(['', '', ''])  // Search query for each input box
const allSchools = ref([])  // All schools data
const pendingRemoveIndex = ref(null)
const showConfirm = ref(false)

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

const searchCompareSchools = async (index) => {
  const input = searchQueries.value[index - 1].trim().toLowerCase()

  if (!input) {
    recommendedSchools.value[index - 1] = []  // Clear results if input is empty
    return
  }

  if (!allSchools.value.length) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/schools`)

      const data = await res.json()
      allSchools.value = data
    } catch (err) {
      console.error('Failed to fetch schools:', err)
      return
    }
  }

  // Filter recommended schools for this specific search query
  recommendedSchools.value[index - 1] = allSchools.value.filter(s => {
    const name = (s.School_Name || '').toLowerCase()
    return name.includes(input)  // Check for name match
  }).slice(0, 8)
}

const selectRecommended = (item, index) => {
  searchQueries.value[index - 1] = item.School_Name  // Set selected school name to the input field
  recommendedSchools.value[index - 1] = []  // Clear recommendations
}

const addToCompare = async (index) => {
  const selectedSchoolName = searchQueries.value[index - 1]

  if (!selectedSchoolName) {
    triggerToast('Please select a school first.', 'error')
    return
  }

  const selectedSchool = allSchools.value.find(s => s.School_Name === selectedSchoolName)

  if (!selectedSchool) {
    triggerToast('This school is not found.', 'error')
    return
  }

  if (schools.value.find(s => s.name === selectedSchool.School_Name)) {
    triggerToast('This school has already been added.', 'error')
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/school/${selectedSchool.School_AGE_ID}`)
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
    searchQueries.value[index - 1] = ''  // Clear the input field after adding
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
        staffPerStudent: item.staffPerStudent || item.Teaching_staff_per_student
        ,
        totalEnrolment: item.totalEnrolment,
        studentLanguageBackground: item.studentLanguageBackground,
        icsea: item.icsea || item.ICSEA,
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

<style scoped>
svg:hover+div {
  opacity: 1;
  pointer-events: auto;
}
</style>