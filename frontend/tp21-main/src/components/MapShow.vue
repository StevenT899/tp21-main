<template>
  <div class="map-container">
    <div class="filter-section flex flex-col md:flex-row gap-4 mb-4">
      <div class="filter-group">
        <label for="school-type" class="block text-sm font-medium text-gray-700 mb-1">School Type</label>
        <select id="school-type" v-model="filters.schoolType"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="ALL">ALL</option>
          <option v-for="type in availableSchoolTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="language-program" class="block text-sm font-medium text-gray-700 mb-1">Language Program</label>
        <select id="language-program" v-model="filters.languageProgram"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="ALL">ALL</option>
          <option v-for="language in availableLanguages" :key="language" :value="language">{{ language }}</option>
        </select>
      </div>

      <div class="filter-actions flex items-end gap-2">
        <button @click="applyFilters"
          class="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filter
        </button>

        <button @click="resetFilters"
          class="flex items-center gap-2 bg-white text-gray-700 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Reset
        </button>
      </div>
    </div>

    <div class="map-instruction flex items-center gap-2 mb-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>Click on any school icon on the map to preview key info and add to compare.</span>
    </div>

    <!-- Use flex to layout the map and sidebar side by side -->
    <div class="flex">
      <!-- Map section -->
      <div class="map-wrapper relative rounded-lg overflow-hidden border border-gray-300 flex-1" style="height: 500px;">
        <div id="map" ref="mapContainer" class="w-full h-full"></div>

        <!-- School Popup -->
        <div v-if="selectedSchool" class="school-popup absolute bg-white p-4 rounded-lg shadow-lg"
          style="top: 50%; right: 20px; transform: translateY(-50%); width: 300px; z-index: 10;">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-bold">{{ selectedSchool.name }}</h3>
            <svg v-if="isInCompareList" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-green-500">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p class="text-gray-600 mb-3">{{ selectedSchool.type }} school</p>

          <div class="grid grid-cols-2 gap-2 mb-4">
            <div v-for="(language, index) in selectedSchool.languages" :key="index"
              class="rounded-md p-2 text-center text-sm" style="background-color: #EBF1FA;">
              {{ language }}
            </div>
          </div>

          <div class="flex justify-between">
            <router-link :to="{ name: 'SchoolDetail', params: { id: selectedSchool.id } }" @click.native="scrollToTop" class="hover:underline">
              <button class="text-blue-500 hover:underline">View details</button>
            </router-link>
            <button @click="handleAddToCompare(selectedSchool)" :disabled="!isSchoolLoaded"
              class="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add to compare
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar section on the right -->
      <div v-if="checkCompareListLength" class="compare-sidebar w-1/4 p-4 bg-white shadow-lg rounded-lg ms-4" style="height: 500px;">
        <CompareSideBar />
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div v-if="toast.show" :class="['toast', toast.type]">
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, defineProps, watch, computed, onUnmounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import schoolIcon from '@/assets/images/school.png';
import CompareSideBar from '@/components/CompareSideBar.vue';

// Use ref to manage compareList for reactivity
const compareList = ref(JSON.parse(sessionStorage.getItem('compareList') || '[]'));

// Watch compareList changes
watch(compareList, (newVal) => {
  console.log('MapShow: compareList changed:', newVal)
  sessionStorage.setItem('compareList', JSON.stringify(newVal));
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: newVal }))
}, { deep: true });

// Computed property to check compare list length and control sidebar visibility
const checkCompareListLength = computed(() => {
  return compareList.value && compareList.value.length > 0;
});

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

const toast = ref({ show: false, type: '', message: '' })
let toastTimeout = null

const showToast = (type, message, duration = 3000) => {
  toast.value = { show: true, type, message }
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, duration)
}

const isInCompareList = computed(() => {
  if (!selectedSchool.value) return false
  return compareList.value.some(item => item.School_AGE_ID === selectedSchool.value.id)
})

const isSchoolLoaded = ref(false);

const handleAddToCompare = (school) => {
  console.log('MapShow: Add to compare clicked for:', school)

  // Check if the school object is valid
  if (!school || !school.School_AGE_ID) {
    console.warn('Invalid school object or missing School_AGE_ID')
    showToast('error', 'Invalid school data. Cannot add to compare.')
    return
  }

  // Check if the school is already in the compare list
  const exists = compareList.value.some(item => item.id === school.School_AGE_ID || item.url === school.School_URL)

  // If it already exists, show warning and return
  if (exists) {
    console.log('School already exists in compareList:', school.School_Name)
    showToast('warning', `"${school.School_Name}" is already in your compare list.`)
    return
  }

  // Check if the compareList has reached the limit of 3 schools
  if (compareList.value.length >= 3) {
    showToast('warning', 'You can only compare up to 3 schools.')
    return
  }

  // Add the school to the compare list
  compareList.value.push(school)
  console.log('MapShow: School added to compareList:', school.School_Name)

  // Show success toast
  showToast('success', `"${school.School_Name}" added to compare!`)
  
  // Update sessionStorage and trigger event
  sessionStorage.setItem('compareList', JSON.stringify(compareList.value))
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
}

// Receive query searching parameters and if a school is identified from HomeView.vue
const props = defineProps({
  searchQuery: { type: String, default: '' },
  isSchool: { type: Boolean, default: false },
  selectedSuburb: { type: String, default: '' },
  selectedType: { type: String, default: '' }
})

// Reference the map container
const mapContainer = ref(null)
let map = null
const mapLoaded = ref(false)

// Filter conditions
const filters = reactive({
  schoolType: 'ALL',
  languageProgram: 'ALL'
})

// Selected school
const selectedSchool = ref(null)

// Store school data from the backend
const schools = ref([])

// Computed property to get filtered schools
const filteredSchools = computed(() => {
  let result = [...schools.value];
  const query = props.searchQuery.toLowerCase().trim();

  // Select by selected type and value
  if (props.selectedType === 'school') {
    // If the selected type is school, filter schools with exact name match (case-insensitive)
    result = result.filter(school =>
      school.School_Name.toLowerCase() === query
    );
  } else if (props.selectedType === 'suburb' && props.selectedSuburb) {
    const isPostcode = /^\d+$/.test(props.selectedSuburb);
    if (isPostcode) {
      // If it's a postcode, filter schools with matching postcode
      result = result.filter(school =>
        school.Postcode && school.Postcode.toString() === props.selectedSuburb
      );
    } else {
      // If it's a suburb, filter schools in that suburb
      result = result.filter(school =>
        school.Suburb && school.Suburb.toLowerCase() === props.selectedSuburb.toLowerCase()
      );
    }
  } else if (query) {
    const isPostcode = /^\d+$/.test(query);
    if (isPostcode) {
      // If it's a postcode, filter schools with matching postcode
      result = result.filter(school =>
        school.Postcode && school.Postcode.toString() === query
      );
    } else {
      // If it's a school name or suburb name, perform an exact match (case-insensitive)
      const exactSchoolMatches = result.filter(school =>
        school.School_Name.toLowerCase() === query
      );

      if (exactSchoolMatches.length > 0) {
        result = exactSchoolMatches;
      } else {
        const exactSuburbMatches = result.filter(school =>
          school.Suburb && school.Suburb.toLowerCase() === query
        );

        if (exactSuburbMatches.length > 0) {
          result = exactSuburbMatches;
        }
      }
    }
  }

  // Apply filters
  if (filters.schoolType !== 'ALL') {
    result = result.filter(school => school.School_Sector === filters.schoolType);
  }

  if (filters.languageProgram !== 'ALL') {
    result = result.filter(school =>
      Array.isArray(school.languages) && school.languages.some(lang => lang === filters.languageProgram)
    );
  }

  return result;
})

// Computed property to get available school types after filtering
const availableSchoolTypes = computed(() => {
  const types = new Set();
  filteredSchools.value.forEach(school => {
    if (school.School_Sector) {
      types.add(school.School_Sector);
    }
  });
  return Array.from(types);
})

// Computed property to get available language programs after filtering
const availableLanguages = computed(() => {
  const languages = new Set();
  filteredSchools.value.forEach(school => {
    if (Array.isArray(school.languages)) {
      school.languages.forEach(lang => {
        languages.add(lang);
      });
    }
  });
  return Array.from(languages);
})

// Watch for changes in search-related parameters and reapply filters when they change
watch([
  () => props.searchQuery,
  () => props.isSchool,
  () => props.selectedSuburb,
  () => props.selectedType
], (newValues, oldValues) => {
  if (newValues !== oldValues && mapLoaded.value) {
    applyFilters();
  }
}, { immediate: false })

// Initialize the map
const initializeMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmV2aXZlZGVzaXJlIiwiYSI6ImNtOG50dzNmbDA0cGQyam9od2QzMjRnOHMifQ.1TH3sOapBo7eXNQ-2hBu6A'

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136], // Near Melbourne
    zoom: 11,
    maxZoom: 14
  })

  // Add navigation control
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')

  // Ensure the map is fully loaded before setting markers and initializing schools
  map.on('load', () => {
    console.log('Map fully loaded');
    mapLoaded.value = true;
    initializeSchools();

    // global listener for click incident
    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['school-points'] });
      if (features.length === 0) {
        selectedSchool.value = null;
      }
    });
  })
}

// Initialize school data and layers
const initializeSchools = () => {
  // Add school icon
  map.loadImage(
    schoolIcon, // School icon
    (error, image) => {
      if (error) throw error

      map.addImage('school-icon', image)

      // Add school points
      map.addSource('schools', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: schools.value.map(school => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [school.Longitude, school.Latitude] // Generate coordinates based on backend data
            },
            properties: {
              id: school.School_AGE_ID, // Use School_AGE_ID as id
              name: school.School_Name, // Use School_Name as name
              type: school.School_Sector, // Use School_Sector as type
              languages: Array.isArray(school.languages) ? school.languages.join(',') : '',
              suburb: school.Suburb // Ensure correct case for Suburb
            }
          }))
        }
      })

      map.addLayer({
        id: 'school-points',
        type: 'symbol',
        source: 'schools',
        layout: {
          'icon-image': 'school-icon',
          'icon-size': 0.9,
          'icon-allow-overlap': true
        }
      })

      map.on('click', 'school-points', (e) => {
        if (e.features && e.features.length > 0) {
          const properties = e.features[0].properties;
          selectedSchool.value = {
            id: properties.id,
            name: properties.name,
            type: properties.type,
            languages: properties.languages ? properties.languages.split(',') : []
          };

          isSchoolLoaded.value = false;

          const sid = properties.id;
          fetch(`${import.meta.env.VITE_API_URL}/school/${sid}`)
            .then(response => response.json())
            .then(fullData => {
              if (fullData && !fullData.error) {
                selectedSchool.value = {
                  ...fullData,
                  id: fullData.School_AGE_ID,
                  name: fullData.School_Name,
                  type: fullData.School_Sector,
                  languages: fullData.languages || []
                };
                isSchoolLoaded.value = true;
              }
            });
        }
      });

      // Change cursor style on mouse hover
      map.on('mouseenter', 'school-points', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'school-points', () => {
        map.getCanvas().style.cursor = ''
      })

      // Apply initial filters
      setTimeout(() => {
        applyFilters();
      }, 100);
    }
  )
}

// Apply filter conditions
const applyFilters = () => {
  if (!mapLoaded.value) {
    console.log('Map not ready yet');
    return;
  }

  if (!map.getSource('schools')) {
    console.log('Schools source not ready yet');
    return;
  }

  // Update map data
  try {
    map.getSource('schools').setData({
      type: 'FeatureCollection',
      features: filteredSchools.value.map(school => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [school.Longitude, school.Latitude]
        },
        properties: {
          id: school.School_AGE_ID,
          name: school.School_Name,
          type: school.School_Sector,
          languages: Array.isArray(school.languages) ? school.languages.join(',') : '',
          suburb: school.Suburb
        }
      }))
    });

    // If there are schools after filtering, zoom the map to these school locations
    if (filteredSchools.value.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredSchools.value.forEach(school => {
        bounds.extend([school.Longitude, school.Latitude]);
      });
      map.fitBounds(bounds, { padding: 50 });
    }
  } catch (error) {
    console.error('Error updating map data:', error);
  }
}

// Reset filter conditions
const resetFilters = () => {
  filters.schoolType = 'ALL'
  filters.languageProgram = 'ALL'
  applyFilters()
  selectedSchool.value = null
}

// Initialize the map and fetch backend data after the component is mounted
onMounted(() => {
  fetch(`${import.meta.env.VITE_API_URL}/schools`)
    .then(response => response.json())
    .then(data => {
      schools.value = data;
      initializeMap();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  // Listen for storage events and custom events
  const handleStorageChange = (event) => {
    console.log('MapShow: Storage event received:', event)
    if (event.key === 'compareList') {
      const newCompareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
      compareList.value = newCompareList;
    }
  };

  const handleCompareListUpdate = (event) => {
    console.log('MapShow: CompareListUpdated event received:', event)
    if (event.detail) {
      compareList.value = event.detail;
    } else {
      const newCompareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
      compareList.value = newCompareList;
    }
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('compareListUpdated', handleCompareListUpdate);

  // Clean up event listeners
  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('compareListUpdated', handleCompareListUpdate);
  });
});
</script>



<style scoped>
  /* Toast Notification */
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    z-index: 1000;
  }
  
  .toast.success {
    background-color: #4CAF50;
  }
  
  .toast.error {
    background-color: #f44336;
  }
  
  .toast.info {
    background-color: #2196F3;
  }
  
  .toast.warning {
    background-color: #ff9800;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>