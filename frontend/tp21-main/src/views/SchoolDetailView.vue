<template>
    <div class="max-w-4xl mx-auto px-6 py-6 space-y-6">
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
                <button
                    @click="addToCompare"
                    class="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                    Add to compare
                </button>
            </div>
        </div>

        <!-- Basic Info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl border">
            <div>
                <p class="text-xl">School Type</p>
                <p class="font-semibold text-gray-900 mt-6">{{ school?.School_Sector }}</p>
            </div>
            <div>
                <p class="text-xl">Year Range</p>
                <p class="font-semibold text-gray-900 mt-6">{{ school?.Year_Range }}</p>
            </div>
            <div>
                <p class="text-xl">School Zone Check</p>
                <button v-if="!isButtonClicked" @click="checkUserLocation" class="mt-6 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded hover:bg-blue-200">
                    📍 Use Location
                </button>
                
                <span v-if="locationStatus" :class="{'text-green-600': locationStatus === 'This school is in your school zone', 'text-red-500': locationStatus === 'This school is not in your school zone'}" class="ml-2 text-green-600 text-sm font-semibold">
                    <!-- Add the SVG icon before the text when inside the zone -->
                    <span v-if="locationStatus === 'This school is in your school zone'" class="flex gap-2">
                        <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3167 26.05L28.8292 12.5375L26.1458 9.85417L15.3167 20.6833L9.85417 15.2208L7.17083 17.9042L15.3167 26.05ZM4.58333 35.25C3.52917 35.25 2.62706 34.875 1.877 34.1249C1.12694 33.3749 0.751278 32.4721 0.75 31.4167V4.58333C0.75 3.52917 1.12567 2.62706 1.877 1.877C2.62833 1.12694 3.53044 0.751278 4.58333 0.75H31.4167C32.4708 0.75 33.3736 1.12567 34.1249 1.877C34.8763 2.62833 35.2513 3.53044 35.25 4.58333V31.4167C35.25 32.4708 34.875 33.3736 34.1249 34.1249C33.3749 34.8763 32.4721 35.2513 31.4167 35.25H4.58333Z" fill="#00AD06"/>
                        </svg>
                        {{ locationStatus }}
                    </span>

                    
                    <!-- Display the status text if not in zone -->
                    <span class="flex gap-2" v-else>
                        <!-- Show "not in school zone" with the new SVG icon -->
                        <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.8125 30.875C36.8125 34.1406 34.1406 36.8125 30.875 36.8125H7.125C3.85938 36.8125 1.1875 34.1406 1.1875 30.875V7.125C1.1875 3.85938 3.85938 1.1875 7.125 1.1875H30.875C34.1406 1.1875 36.8125 3.85938 36.8125 7.125V30.875Z" fill="#FF0004"/>
                            <path d="M29.6875 12.5875L25.4125 8.3125L19 14.725L12.5875 8.3125L8.3125 12.5875L14.725 19L8.3125 25.4125L12.5875 29.6875L19 23.275L25.4125 29.6875L29.6875 25.4125L23.275 19L29.6875 12.5875Z" fill="white"/>
                        </svg>
                        {{ locationStatus }}
                    </span>
                    
                </span>
            </div>
        </div>

        <!-- Language Program -->
        <div class="bg-white p-6 rounded-xl border space-y-4">
            <div class="flex items-center gap-2">
                <h2 class="text-xl font-semibold">Language Program</h2>
                <div class="relative group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-600 cursor-pointer"
                    fill="none"
                    viewBox="0 0 32 32"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <path d="M12 16h.01" />
                    <path d="M12 12a2 2 0 1 0-2-2" />
                  </svg>
                  <div class="absolute top-full mt-2 right-0 w-64 bg-gray-800 text-white text-lg p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    ICSEA reflects the socio-educational background of students. The average is 1000. Higher scores indicate greater advantage.
                    <button>Read More</button>
                  </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="(lang, index) in school?.languages || []"
                    :key="index"
                    class="px-3 py-1 text-sm bg-blue-400 text-white rounded"
                >
                    {{ lang }}
                </span>
                <span v-if="!(school?.languages && school.languages.length)" class="py-1 text-lg text-gray-700 rounded">
                    None
                </span>
            </div>

            <h2 class="text-xl font-semibold mt-6">Student Cultural Background</h2>
            <p class="text-gray-700"><strong>{{ Math.round((school?.not_English / (school?.not_stated + school?.English + school?.not_English)) * 100) }}%</strong> of students at the school are from language backgrounds other than English</p>

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

                <h2 class="text-xl font-semibold mt-6">Student Enrolment</h2>
                <div class="flex justify-between text-gray-700 me-30">
                    <span>Total Enrolment: <strong>{{ school?.Total_Enrolment }}</strong></span>
                    <span>
                        Student per teaching staff:
                        <strong>{{ Math.round(1 / (school?.Teaching_staff_per_student || 1)) }}</strong>
                    </span>
                </div>

                <!-- GenderChartInDetailPage -->
                <GenderChartInDetailPage mt-2
                    v-if="school?.Girls_Enrolment && school?.Boys_Enrolment"
                    :girls="school?.Girls_Enrolment" 
                    :boys="school?.Boys_Enrolment" 
                />
                <h2 class="text-xl font-semibold flex items-center gap-1 mt-6">Index Of Community Socio-Educational Advantage (ICSEA)</h2>
                <p class="text-gray-700"><strong>{{ school?.ICSEA }}</strong> (Higher than {{ school?.ICSEA_percentile }}% of primary schools in Victoria)</p>
            </div>
        </div>

        <!-- Toast Notification -->
        <transition name="fade">
            <div v-if="toast.show" :class="[ 
                'fixed top-6 left-1/2 transform -translate-x-1/2', 
                'px-6 py-4 rounded-xl shadow-lg text-white z-50 text-lg max-w-xl w-full text-center',
                toast.type === 'success' ? 'bg-green-600' :
                    toast.type === 'warning' ? 'bg-yellow-500' :
                        'bg-red-600' ]">
                {{ toast.message }}
            </div>
        </transition>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import * as turf from '@turf/turf';
import GenderChartInDetailPage from '@/components/GenderChartInDetailPage.vue'
import LanguageChartInDetailPage from '@/components/LanguageChartInDetailPage.vue'

const locationStatus = ref('')
const isButtonClicked = ref(false)

const route = useRoute()
const router = useRouter()
const school = ref(null)
const toast = ref({ show: false, type: '', message: '' })

let toastTimeout = null

// Function to show toast notifications
const showToast = (type, message, duration = 3000) => {
    toast.value = { show: true, type, message }
    if (toastTimeout) clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => {
        toast.value.show = false
    }, duration)
}

// Function to go back to the previous page
const goBack = () => {
    router.go(-1)
}

// Add the current school to the compare list
const addToCompare = () => {
    const compareList = JSON.parse(sessionStorage.getItem('compareList') || '[]')

    if (compareList.some(item => item.School_AGE_ID === school.value?.School_AGE_ID)) {
        showToast('warning', "This school is already in your compare list.")
        return
    }

    if (compareList.length >= 3) {
        showToast('warning', "You can only compare up to 3 schools.")
        return
    }

    compareList.push(school.value)
    sessionStorage.setItem('compareList', JSON.stringify(compareList))
    showToast('success', `${school.value.School_Name} has been added to your compare list.`)
}


function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error)
      )
    } else {
      reject('Geolocation is not supported by this browser.')
    }
  })
}

function isPointInPolygon(point, polygon) {
    let x = point[0], y = point[1];
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];

        let intersect = ((yi > y) !== (yj > y)) && 
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;
}

async function checkUserLocation() {
  try {
    const currentLocation = await getCurrentLocation()
    const currentCoords = [currentLocation.longitude, currentLocation.latitude]

    let coordinates = school.value.coordinates[0];  // Get the polygon coordinates

    // Ensure the polygon is closed
    if (coordinates[0][0][0] !== coordinates[0][coordinates[0].length - 1][0] ||
        coordinates[0][0][1] !== coordinates[0][coordinates[0].length - 1][1]) {
      coordinates[0].push(coordinates[0][0]) // Close the polygon
    }

    // Check if the user's location is inside the polygon
    const isInside = isPointInPolygon(currentCoords, coordinates[0])

    // Update location status
    locationStatus.value = isInside ? 'This school is in your school zone' : 'This school is not in your school zone'
    isButtonClicked.value = true 

  } catch (error) {
    console.error('Error checking location:', error)
    locationStatus.value = 'Error, unable to check location'
  }
}






  
// Fetch school data from API on mounted
onMounted(() => {
    const id = route.params.id
    fetch(`${import.meta.env.VITE_API_URL}/school/${id}`)
        .then(res => res.json())
        .then(data => {
            school.value = data
        })
})
</script>

<style scoped>
/* Optional: Custom styling for the sidebar */
.bg-white {
    background-color: #ffffff;
}
</style>
