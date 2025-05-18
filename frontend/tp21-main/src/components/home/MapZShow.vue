<!-- /**
  MapZShow.vue
 
  Description:
    Displays an interactive Mapbox GL map with a school zone polygon, user location marker, and school markers.
    Users can click on schools to view details in a popup, add them to a comparison sidebar, and request their current location.
 
  Key Features:
    - Renders zone polygon and search-point layers from `polygonValue` and `coordinates` props
    - Loads and updates school markers from the `schools` prop with custom icons
    - Clickable popups showing school name, type, languages, and add-to-compare controls
    - CompareSideBar component for managing up to three selected schools with remove-all and remove-single actions
    - Button to fetch and emit the user’s current geolocation via `locationObtained` event
    - Toast notifications for success, warning, and error feedback on add/remove operations
 / -->

<template>

  <div class="flex items-center flex-wrap mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 me-2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>

    <!-- <svg class= "me-2" width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 16.6666V12.5M13.5 8.33331H13.5113M24.75 12.5C24.75 18.2529 19.7132 22.9166 13.5 22.9166C7.2868 22.9166 2.25 18.2529 2.25 12.5C2.25 6.74701 7.2868 2.08331 13.5 2.08331C19.7132 2.08331 24.75 6.74701 24.75 12.5Z" stroke="#757575" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg> -->

    <!-- <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
<path d="M11.5 0.406128C17.7134 0.406128 22.75 5.44275 22.75 11.6561C22.75 17.8695 17.7134 22.9061 11.5 22.9061C5.28663 22.9061 0.25 17.8695 0.25 11.6561C0.25 5.44275 5.28663 0.406128 11.5 0.406128ZM11.5 2.65613C9.11305 2.65613 6.82387 3.60434 5.13604 5.29217C3.44821 6.97999 2.5 9.26918 2.5 11.6561C2.5 14.0431 3.44821 16.3323 5.13604 18.0201C6.82387 19.7079 9.11305 20.6561 11.5 20.6561C13.8869 20.6561 16.1761 19.7079 17.864 18.0201C19.5518 16.3323 20.5 14.0431 20.5 11.6561C20.5 9.26918 19.5518 6.97999 17.864 5.29217C16.1761 3.60434 13.8869 2.65613 11.5 2.65613ZM11.5 16.1561C11.7984 16.1561 12.0845 16.2747 12.2955 16.4856C12.5065 16.6966 12.625 16.9828 12.625 17.2811C12.625 17.5795 12.5065 17.8656 12.2955 18.0766C12.0845 18.2876 11.7984 18.4061 11.5 18.4061C11.2016 18.4061 10.9155 18.2876 10.7045 18.0766C10.4935 17.8656 10.375 17.5795 10.375 17.2811C10.375 16.9828 10.4935 16.6966 10.7045 16.4856C10.9155 16.2747 11.2016 16.1561 11.5 16.1561ZM11.5 5.46863C12.4476 5.46866 13.3655 5.79865 14.0963 6.40193C14.827 7.00521 15.3248 7.84411 15.5042 8.77453C15.6836 9.70495 15.5335 10.6688 15.0795 11.5006C14.6255 12.3323 13.8961 12.98 13.0165 13.3324C12.8862 13.3803 12.7688 13.4577 12.6734 13.5585C12.6239 13.6148 12.616 13.6868 12.6171 13.761L12.625 13.9061C12.6247 14.1929 12.5149 14.4687 12.318 14.6772C12.1212 14.8857 11.8522 15.0111 11.5659 15.0279C11.2797 15.0448 10.9978 14.9516 10.7779 14.7676C10.5581 14.5835 10.4167 14.3225 10.3829 14.0378L10.375 13.9061V13.6249C10.375 12.3278 11.4213 11.5493 12.1795 11.2444C12.4881 11.1211 12.7573 10.9162 12.9582 10.6515C13.1591 10.3868 13.2841 10.0724 13.3198 9.742C13.3555 9.41163 13.3005 9.07777 13.1608 8.77629C13.021 8.4748 12.8018 8.21708 12.5266 8.03079C12.2514 7.8445 11.9307 7.73669 11.5989 7.71893C11.2671 7.70117 10.9367 7.77413 10.6432 7.92998C10.3497 8.08583 10.1042 8.31868 9.93309 8.60353C9.76196 8.88838 9.67166 9.21445 9.67188 9.54675C9.67188 9.84512 9.55335 10.1313 9.34237 10.3422C9.13139 10.5532 8.84524 10.6718 8.54688 10.6718C8.24851 10.6718 7.96236 10.5532 7.75138 10.3422C7.5404 10.1313 7.42188 9.84512 7.42188 9.54675C7.42188 8.46517 7.85153 7.42788 8.61633 6.66308C9.38113 5.89829 10.4184 5.46863 11.5 5.46863Z" fill="black"/>
</svg> -->



    <span>{{ $t('MapShow.mapInstruction1') }} </span>
    <img :src="schoolIcon" alt="School Icon" class="w-5 h-5 mx-1 ms-2 me-2" />
    <span>{{ $t('MapShow.mapInstruction2') }} </span>
    <div class="rounded-md p-2 text-center text-sm ms-2 me-2" style="background-color: #EBF1FA;">
      {{ $t(`MapShow.mapInstruction4`) }}
    </div>
    <span>{{ $t('MapShow.mapInstruction3') }} </span>
  </div>
  <span class="mb-2 ms-9">{{ $t('MapShow.mapInstruction5') }} </span>

  <div class="map-outer-container flex">


    <div class="map-wrapper relative rounded-lg overflow-hidden border border-gray-300" style="height: 500px;">

      <div id="map" class="w-full h-full"></div>
      <!-- Popup -->
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

    <div v-if="checkCompareListLength" class="ms-1">
      <CompareSideBar @remove-all="handleRemoveAll" @remove-school="handleRemoveSchool" @rm="onSingleRemoved"
        @rma="onAllRemoved" />
    </div>

  </div>

  <!-- Toast -->
  <transition name="fade">
    <div v-if="toast.show" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>
  </transition>
</template>


<script setup>
import { onMounted, ref, watch, defineEmits, computed, onUnmounted } from 'vue';
import CompareSideBar from '@/components/home/CompareSideBar.vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import selfIcon from '@/assets/images/self_position.png';
import schoolIcon from '@/assets/images/school.png';
import schoolIconSelected from '@/assets/images/school_clicked.png';
import { useI18n } from 'vue-i18n'
import '@/assets/toast.css'

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


function onSingleRemoved() {

  showToast('success', 'removedFromCompare')
}
function onAllRemoved() {

  showToast('success', 'allSchoolsRemoved')
}


onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136],
    zoom: 11,
    maxZoom: 12
  });

  // Add navigation control
  map.value.addControl(new mapboxgl.NavigationControl(), 'top-right')

  map.value.on('load', () => {
    initializeZonePolygon();
    initializeSchools();
    initializeSearchPoint();
    fitMapToSchools();
    map.value.resize();
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
function initializeSearchPoint() {
  map.value.loadImage(selfIcon, (err, img) => {
    if (err) throw err;
    map.value.addImage('self-icon', img);
    map.value.addSource('search-point', { type: 'geojson', data: buildSearchPointGeoJSON(props.coordinates) });
    map.value.addLayer({
      id: 'self-icon',
      type: 'symbol',
      source: 'search-point',
      layout: {
        'icon-image': 'self-icon',
        'icon-size': 0.5,
        'icon-allow-overlap': true
      }
    });
  });
}

function initializeSchools() {
  map.value.loadImage(schoolIcon, (err, normalImg) => {
    if (err) throw err;
    map.value.addImage('school-icon', normalImg);

    map.value.loadImage(schoolIconSelected, (err2, selectedImg) => {
      if (err2) throw err2;
      map.value.addImage('school-icon-selected', selectedImg);

      map.value.addSource('schools', {
        type: 'geojson',
        data: buildSchoolsGeoJSON(props.schools)
      });

      map.value.addLayer({
        id: 'school-points',
        type: 'symbol',
        source: 'schools',
        layout: {
          'icon-image': ['case', ['==', ['get', 'selected'], 'yes'], 'school-icon-selected', 'school-icon'],
          'icon-size': 0.9,
          'icon-allow-overlap': true
        }
      });

      map.value.on('click', (e) => {
        const features = map.value.queryRenderedFeatures(e.point, { layers: ['school-points'] });
        if (features.length === 0) {
          selectedSchool.value = null;
          map.value.getSource('schools').setData(buildSchoolsGeoJSON(props.schools, null));
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

        // update to selected state
        map.value.getSource('schools').setData(buildSchoolsGeoJSON(props.schools, selectedSchool.value.id));

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

      map.value.on('mouseenter', 'school-points', () => map.value.getCanvas().style.cursor = 'pointer');
      map.value.on('mouseleave', 'school-points', () => map.value.getCanvas().style.cursor = '');
    });
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

function buildSchoolsGeoJSON(schools, selectedId = null) {

  return {
    type: 'FeatureCollection',
    features: schools.map(s => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [s.Longitude, s.Latitude] },
      properties: {
        selected: s.School_AGE_ID === selectedId ? 'yes' : 'no',
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
  map.value.getSource('schools').setData(buildSchoolsGeoJSON(newArr, selectedSchool.value?.id || null));
  fitMapToSchools();
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
.map-outer-container {
  display: flex;
  align-items: flex-start;
}

.map-wrapper {
  width: calc(100% - 200px);
  height: 500px;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}

.compare-sidebar-container {
  width: 200px;
  height: 500px;
  background-color: white;
  border-left: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
