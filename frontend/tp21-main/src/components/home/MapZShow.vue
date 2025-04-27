<template>
  <div class="flex pr-40">
    <!-- Left section: Map -->
    <div class="map-wrapper relative rounded-lg overflow-hidden border border-gray-300 flex-1" style="height: 500px;">
      <div id="map" class="w-full h-full"></div>

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
            <button class="text-blue-500 underline cursor-pointer">{{ $t('MapShow.schoolPopup.viewDetails') }}</button>
          </router-link>
          <button @click="handleAddToCompare(selectedSchool)" :disabled="!isSchoolLoaded"
            class="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {{ $t('MapZShow.schoolPopup.addToCompare') }}
          </button>
        </div>
      </div>

      <button
        class="absolute top-2.5 right-11 bg-white text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md border-2 border-gray-300 cursor-pointer"
        @click="getCurrentLocation">
        {{ $t('MapZShow.mapControls.getLocation') }}
      </button>
    </div>

    <!-- Right section: Compare Sidebar -->
    <div v-if="checkCompareListLength"
      class="compare-sidebar-container absolute top-0 right-0 w-80 h-1/2 flex flex-col p-4 bg-white shadow-lg border-l border-gray-200">
      <CompareSideBar @remove-all="handleRemoveAll" @remove-school="handleRemoveSchool" />
    </div>


  </div>

  <!-- Toast Notification -->
  <transition name="fade">
    <div v-if="toast.show" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>
  </transition>

</template>



<script setup>
import { onMounted, ref, watch, defineEmits, computed, onUnmounted } from 'vue';
import CompareSideBar from '@/components/CompareSideBar.vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import schoolIcon from '@/assets/images/school.png';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const emit = defineEmits(['locationObtained']);

const props = defineProps({
  schools: { type: Array, default: () => [] },
  polygonValue: { type: Array, default: () => [] },
  coordinates: { type: Array, default: () => [] }
});

const selectedSchool = ref(null);
const isSchoolLoaded = ref(false);
const map = ref(null);

// Use ref to manage compareList for reactivity
const compareList = ref(JSON.parse(sessionStorage.getItem('compareList') || '[]'));

// Watch compareList changes
watch(compareList, (newVal) => {
  console.log('MapZShow: compareList changed:', newVal)
  sessionStorage.setItem('compareList', JSON.stringify(newVal));
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: newVal }))
}, { deep: true });

// Computed property to check compare list length and control sidebar visibility
const checkCompareListLength = computed(() => {
  return compareList.value && compareList.value.length > 0;
});

const isInCompareList = computed(() => {
  if (!selectedSchool.value) return false
  return compareList.value.some(item => item.School_AGE_ID === selectedSchool.value.id)
});

// Toast notification
const toast = ref({
  show: false,
  message: '',
  type: 'success'
});

let toastTimeout = null;

const showToast = (type, messageKey, params = {}, duration = 3000) => {
  const message = t(`messages.toast.${type}.${messageKey}`, params)
  toast.value = { show: true, type, message }
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, duration)
}

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const handleAddToCompare = (school) => {
  console.log('MapZShow: Add to compare clicked for:', school)

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
  console.log('MapZShow: School added to compareList:', school.School_Name)

  // Show success toast
  showToast('success', 'addedToCompare', { schoolName: school.School_Name })

  // Update sessionStorage and trigger event
  sessionStorage.setItem('compareList', JSON.stringify(compareList.value))
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
};

const handleRemoveAll = () => {
  console.log('MapZShow: Removing all schools');
  compareList.value = [];
  sessionStorage.setItem('compareList', '[]');
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: [] }));
};

const handleRemoveSchool = (schoolId) => {
  console.log('MapZShow: Removing school:', schoolId);
  compareList.value = compareList.value.filter(school => school.School_AGE_ID !== schoolId);
  sessionStorage.setItem('compareList', JSON.stringify(compareList.value));
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }));
};

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmV2aXZlZGVzaXJlIiwiYSI6ImNtOG50dzNmbDA0cGQyam9od2QzMjRnOHMifQ.1TH3sOapBo7eXNQ-2hBu6A';
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136],
    zoom: 11,
    maxZoom: 14
  });

  // Add navigation control
  map.value.addControl(new mapboxgl.NavigationControl(), 'top-right')

  map.value.on('load', () => {
    initializeZonePolygon();
    initializeSchools();
    initializeSearchPoint();
    fitMapToSchools()
  });

  // Listen for storage events and custom events
  const handleStorageChange = (event) => {
    console.log('MapZShow: Storage event received:', event)
    if (event.key === 'compareList') {
      const newCompareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
      compareList.value = newCompareList;
    }
  };

  const handleCompareListUpdate = (event) => {
    console.log('MapZShow: CompareListUpdated event received:', event)
    if (event.detail !== undefined) {
      compareList.value = event.detail;
      sessionStorage.setItem('compareList', JSON.stringify(event.detail));
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

// initialize data
function initializeSchools() {
  map.value.loadImage(schoolIcon, (err, img) => {
    if (err) throw err;

    map.value.addImage('school-icon', img);
    map.value.addSource('schools', { type: 'geojson', data: buildSchoolsGeoJSON(props.schools) });
    map.value.addLayer({
      id: 'school-points',
      type: 'symbol',
      source: 'schools',
      layout: {
        'icon-image': 'school-icon',
        'icon-size': 0.9,
        'icon-allow-overlap': true
      }
    });

    const closePopup = () => {
      selectedSchool.value = null; // Reset the selected school to close the popup
    };
    map.value.on('click', (e) => {
      const features = map.value.queryRenderedFeatures(e.point, { layers: ['school-points'] });
      if (features.length === 0) {
        closePopup();
      }
    });

    map.value.on('click', 'school-points', async e => {
      const p = e.features[0].properties;
      selectedSchool.value = {
        id: p.id,
        name: p.name,
        type: p.type,
        languages: p.languages ? p.languages.split(',') : []
      };
      isSchoolLoaded.value = false;

      const sid = selectedSchool.value.id;
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
    });

    // hover
    map.value.on('mouseenter', 'school-points', () => map.value.getCanvas().style.cursor = 'pointer');
    map.value.on('mouseleave', 'school-points', () => map.value.getCanvas().style.cursor = '');
  });
}

function initializeZonePolygon() {
  map.value.addSource('zone-polygons', {
    type: 'geojson',
    data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: props.polygonValue } }
  });
  map.value.addLayer({ id: 'zone-fill', type: 'fill', source: 'zone-polygons', paint: { 'fill-color': '#088', 'fill-opacity': 0.2 } });
  map.value.addLayer({ id: 'zone-line', type: 'line', source: 'zone-polygons', paint: { 'line-color': '#088', 'line-width': 2 } });
}

function initializeSearchPoint() {
  map.value.addSource('search-point', { type: 'geojson', data: buildSearchPointGeoJSON(props.coordinates) });
  map.value.addLayer({ id: 'search-point-layer', type: 'circle', source: 'search-point', paint: { 'circle-radius': 8, 'circle-color': '#f30' } });
}

function buildSchoolsGeoJSON(schools) {
  return {
    type: 'FeatureCollection',
    features: schools.map(s => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [s.Longitude, s.Latitude] },
      properties: {
        id: s.School_AGE_ID,
        name: s.School_Name,
        type: s.School_Sector,
        languages: Array.isArray(s.languages) ? s.languages.join(',') : ''
      }
    }))
  };
}

function buildSearchPointGeoJSON(coords) {
  return { type: 'FeatureCollection', features: coords.length === 2 ? [{ type: 'Feature', geometry: { type: 'Point', coordinates: coords } }] : [] };
}

function fitMapToSchools() {
  if (props.schools.length > 0) {
    const bounds = new mapboxgl.LngLatBounds();
    props.schools.forEach(school => {
      bounds.extend([school.Longitude, school.Latitude]);
    });
    map.value.fitBounds(bounds, { padding: 100 });
  }
}

// watch data
watch(() => props.schools, newArr => {
  map.value.getSource('schools').setData(buildSchoolsGeoJSON(newArr));
  fitMapToSchools()
});
watch(() => props.polygonValue, poly => {
  map.value.getSource('zone-polygons').setData({ type: 'Feature', geometry: { type: 'Polygon', coordinates: poly } });
});
watch(() => props.coordinates, coords => {
  map.value.getSource('search-point').setData(buildSearchPointGeoJSON(coords));
});

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        emit('locationObtained', [longitude, latitude]);
      },
      (error) => {
        console.error('Error during fetching location:', error.message);
      }
    );
  } else {
    console.error('browser not support this function.');
  }
}
</script>

<style scoped>
.map-wrapper {
  display: flex;
  width: calc(100% - 200px);
  height: 100%;
}

#map {
  display: flex;
  width: 100%;
}

.compare-sidebar-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  /* Sidebar width */
  height: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  /* Ensures the sidebar is above the map */
  overflow-y: auto;
  /* Allows the sidebar content to scroll if necessary */
}

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
