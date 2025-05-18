<!-- /**
  MapShow.vue
 
  Description:
    Renders the interactive school map page, allowing users to search, filter, and compare schools.
 
  Key Features:
    - Mapbox GL map displaying school markers with custom icons
    - Filter controls for school type and language program with apply/reset actions
    - Search integration for school names, suburbs, and postcodes
    - Clickable markers opening popups with school details and add-to-compare functionality
    - CompareSideBar component to manage up to three selected schools
    - ModalBox for displaying informational modals (language program, ICSEA, school zone)
    - Toast notifications for feedback on add/remove/filter actions
    - Responsive layout with sidebar toggle and map instructions
 / -->
<template>
  <div class="map-container relative">
    <!--Filter + Reset + Sidebar -->
    <div class="filter-section flex flex-wrap items-start gap-4 mb-4 pr-40">

      <div class="filter-group">
        <label for="school-type" class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('MapShow.filterSection.schoolType') }}
        </label>
        <select id="school-type" v-model="filters.schoolType"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ">
          <option value="ALL">{{ $t('MapShow.filterSection.all') }}</option>
          <option v-for="type in availableSchoolTypes" :key="type" :value="type">{{
            $t(`MapShow.filterSection.schoolTypes.${type}`) || type }}</option>
        </select>
      </div>

      <div class="filter-group">
        <div class="flex items-center">
          <label for="language-program" class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('MapShow.filterSection.languageProgram') }}
          </label>
          <div class="relative ml-1">
            <svg width="16" height="16" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-400 cursor-pointer absolute left-0 -bottom-0.5 " @click="openModal('lp')">
              <path
                d="M14.1666 0.666504C21.5306 0.666504 27.4999 6.63584 27.4999 13.9998C27.4999 21.3638 21.5306 27.3332 14.1666 27.3332C6.80259 27.3332 0.833252 21.3638 0.833252 13.9998C0.833252 6.63584 6.80259 0.666504 14.1666 0.666504ZM14.1666 3.33317C11.3376 3.33317 8.6245 4.45698 6.62411 6.45736C4.62372 8.45775 3.49992 11.1709 3.49992 13.9998C3.49992 16.8288 4.62372 19.5419 6.62411 21.5423C8.6245 23.5427 11.3376 24.6665 14.1666 24.6665C16.9956 24.6665 19.7087 23.5427 21.7091 21.5423C23.7094 19.5419 24.8333 16.8288 24.8333 13.9998C24.8333 11.1709 23.7094 8.45775 21.7091 6.45736C19.7087 4.45698 16.9956 3.33317 14.1666 3.33317ZM14.1666 19.3332C14.5202 19.3332 14.8593 19.4736 15.1094 19.7237C15.3594 19.9737 15.4999 20.3129 15.4999 20.6665C15.4999 21.0201 15.3594 21.3593 15.1094 21.6093C14.8593 21.8594 14.5202 21.9998 14.1666 21.9998C13.813 21.9998 13.4738 21.8594 13.2238 21.6093C12.9737 21.3593 12.8333 21.0201 12.8333 20.6665C12.8333 20.3129 12.9737 19.9737 13.2238 19.7237C13.4738 19.4736 13.813 19.3332 14.1666 19.3332ZM14.1666 6.6665C15.2896 6.66654 16.3776 7.05764 17.2436 7.77264C18.1097 8.48763 18.6997 9.48188 18.9123 10.5846C19.125 11.6873 18.947 12.8297 18.409 13.8155C17.8709 14.8012 17.0064 15.5689 15.9639 15.9865C15.8095 16.0433 15.6703 16.135 15.5573 16.2545C15.4986 16.3212 15.4893 16.4065 15.4906 16.4945L15.4999 16.6665C15.4995 17.0063 15.3694 17.3332 15.1361 17.5803C14.9028 17.8274 14.584 17.9762 14.2447 17.9961C13.9055 18.016 13.5714 17.9056 13.3108 17.6875C13.0502 17.4694 12.8827 17.16 12.8426 16.8225L12.8333 16.6665V16.3332C12.8333 14.7958 14.0733 13.8732 14.9719 13.5118C15.3377 13.3658 15.6567 13.1229 15.8948 12.8092C16.1329 12.4954 16.2811 12.1228 16.3234 11.7312C16.3657 11.3397 16.3005 10.944 16.1349 10.5867C15.9693 10.2294 15.7094 9.92392 15.3833 9.70314C15.0572 9.48236 14.6771 9.35458 14.2838 9.33353C13.8905 9.31248 13.4989 9.39895 13.1511 9.58366C12.8033 9.76838 12.5123 10.0443 12.3095 10.3819C12.1067 10.7195 11.9997 11.106 11.9999 11.4998C11.9999 11.8535 11.8594 12.1926 11.6094 12.4426C11.3593 12.6927 11.0202 12.8332 10.6666 12.8332C10.313 12.8332 9.97382 12.6927 9.72378 12.4426C9.47373 12.1926 9.33325 11.8535 9.33325 11.4998C9.33325 10.218 9.84248 8.98858 10.7489 8.08215C11.6553 7.17573 12.8847 6.6665 14.1666 6.6665Z"
                fill="black" />
            </svg>
            <ModalBox ref="ModalBoxRef" />
          </div>
        </div>
        <select id="language-program" v-model="filters.languageProgram"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="ALL">{{ $t('MapShow.filterSection.all') }}</option>
          <option v-for="language in availableLanguages" :key="language" :value="language">{{
            $t(`MapShow.filterSection.languages.${language}`) || language }}</option>
        </select>
      </div>


      <div class="filter-actions flex items-end gap-2" style="margin-top: 1.375rem;">
        <button @click="applyFilters"
          class="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          {{ $t('MapShow.filterSection.filter') }}
        </button>

        <button @click="resetFilters"
          class="flex items-center gap-2 bg-white text-gray-700 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          {{ $t('MapShow.filterSection.reset') }}
        </button>
      </div>
    </div>

    <!-- Map Instruction -->
    <div class="map-instruction flex items-center gap-2 mb-2 pr-40">
      <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.5 16.6666V12.5M13.5 8.33331H13.5113M24.75 12.5C24.75 18.2529 19.7132 22.9166 13.5 22.9166C7.2868 22.9166 2.25 18.2529 2.25 12.5C2.25 6.74701 7.2868 2.08331 13.5 2.08331C19.7132 2.08331 24.75 6.74701 24.75 12.5Z"
          stroke="#757575" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="flex items-center flex-wrap">
        <span>{{ $t('MapShow.mapInstruction1') }} </span>
        <img :src="schoolIcon" alt="School Icon" class="w-5 h-5 mx-1 ms-2 me-2" />
        <span>{{ $t('MapShow.mapInstruction2') }} </span>
        <div class="rounded-md p-2 text-center text-sm ms-2 me-2" style="background-color: #EBF1FA;">
          {{ $t(`MapShow.mapInstruction4`) }}
        </div>
        <span>{{ $t('MapShow.mapInstruction3') }} </span>
      </div>
    </div>

    <!-- Map -->
    <div class="flex pr-40">
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
          <p class="text-gray-600 mb-3">{{ $t(`schoolTypesSchool.${selectedSchool.type}`) || selectedSchool.type }}</p>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <div v-for="(language, index) in selectedSchool.languages" :key="index"
              class="rounded-md p-2 text-center text-sm" style="background-color: #EBF1FA;">
              {{ $t(`languages.${language}`) || language }}
            </div>
          </div>
          <div class="flex justify-between">
            <router-link :to="{ name: 'SchoolDetail', params: { id: selectedSchool.id } }" @click.native="scrollToTop"
              class="text-blue-500 hover:underline">
              <button class="text-blue-500 underline cursor-pointer">{{ $t('MapShow.schoolPopup.viewDetails')
                }}</button>
            </router-link>
            <button @click="handleAddToCompare(selectedSchool)" :disabled="!isSchoolLoaded"
              class="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              {{ $t('MapShow.schoolPopup.addToCompare') }}
            </button>
          </div>
        </div>
      </div>
    </div>


    <div v-if="checkCompareListLength"
      class="absolute top-0 h-full flex flex-col p-4 bg-white shadow-lg border-l border-gray-200"
      style="width: 190px; right: -40px;">
      <CompareSideBar @rm="onSingleRemoved" @rma="onAllRemoved" />
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toast.show" :class="['toast', toast.type]">{{ toast.message }}</div>
    </transition>
  </div>

</template>

<script setup>
import { ref, onMounted, reactive, defineProps, watch, computed, onUnmounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import schoolIcon from '@/assets/images/school.png';
import schoolIconSelected from '@/assets/images/school_clicked.png';
import CompareSideBar from '@/components/home/CompareSideBar.vue';
import ModalBox from '../base/ModalBox.vue';
import { useI18n } from 'vue-i18n'
import '@/assets/toast.css'

const { t } = useI18n();
const ModalBoxRef = ref(null);
const openModal = (modalType) => {
  ModalBoxRef.value.toggleModal(modalType);
};




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

const showToast = (type, messageKey, params = {}, duration = 3000) => {
  const message = t(`messages.toast.${type}.${messageKey}`, params)
  toast.value = { show: true, type, message }
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, duration)
}


function onSingleRemoved() {

  showToast('success', 'removedFromCompare')
}
function onAllRemoved() {

  showToast('success', 'allSchoolsRemoved')
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
    showToast('error', 'invalidSchoolData')
    return
  }

  // Check if the school is already in the compare list
  const exists = compareList.value.some(item => item.id === school.School_AGE_ID || item.url === school.School_URL)

  // If it already exists, show warning and return
  if (exists) {
    console.log('School already exists in compareList:', school.School_Name)
    showToast('warning', 'alreadyInCompare', { schoolName: school.School_Name })
    return
  }

  // Check if the compareList has reached the limit of 3 schools
  if (compareList.value.length >= 3) {
    showToast('warning', 'compareLimit')
    return
  }

  // Add the school to the compare list
  compareList.value.push(school)
  console.log('MapShow: School added to compareList:', school.School_Name)

  // Show success toast
  showToast('success', 'addedToCompare', { schoolName: school.School_Name })

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
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

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
  map.loadImage(schoolIcon, (err1, image1) => {
    if (err1) throw err1;
    map.addImage('school-icon', image1);

    map.loadImage(schoolIconSelected, (err2, image2) => {
      if (err2) throw err2;
      map.addImage('school-icon-selected', image2);

      // initial data (no selected schools)
      map.addSource('schools', {
        type: 'geojson',
        data: buildSchoolsGeoJSON(schools.value, null)
      });

      map.addLayer({
        id: 'school-points',
        type: 'symbol',
        source: 'schools',
        layout: {
          'icon-image': ['case', ['==', ['get', 'selected'], 'yes'], 'school-icon-selected', 'school-icon'],
          'icon-size': 0.9,
          'icon-allow-overlap': true
        }
      });

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

          // update to selected state
          map.getSource('schools').setData(buildSchoolsGeoJSON(schools.value, selectedSchool.value.id));

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

      map.on('mouseenter', 'school-points', () => map.getCanvas().style.cursor = 'pointer');
      map.on('mouseleave', 'school-points', () => map.getCanvas().style.cursor = '');

      setTimeout(() => {
        applyFilters();
      }, 100);
    });
  });
};

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
    map.getSource('schools').setData(buildSchoolsGeoJSON(filteredSchools.value, selectedSchool.value?.id || null));


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

function buildSchoolsGeoJSON(schoolList, selectedId = null) {
  return {
    type: 'FeatureCollection',
    features: schoolList.map(school => ({
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
        suburb: school.Suburb,
        selected: school.School_AGE_ID === selectedId ? 'yes' : 'no'
      }
    }))
  };
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
.map-wrapper {
  width: calc(100% - 200px);
  /* Adjust the width of the map here */
}

.compare-sidebar-container {
  position: relative;
  width: 100%;
}
</style>
