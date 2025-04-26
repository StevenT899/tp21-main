<template>
  <div class="map-container flex">
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

    <!-- Map and Sidebar Container -->
    <div class="flex">
      <!-- Map section -->
      <div class="map-wrapper relative rounded-lg overflow-hidden border border-gray-300 transition-all duration-300" 
           :class="{'w-full': !checkCompareListLength, 'w-3/4': checkCompareListLength}" 
           style="height: 500px;">
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

      <!-- Sidebar section -->
      <div v-if="checkCompareListLength" 
           class="compare-sidebar w-1/4 p-4 bg-white shadow-lg rounded-lg ms-4 transition-all duration-300" 
           style="height: 500px;">
        <CompareSideBar @remove-all="handleRemoveAll" @remove-school="handleRemoveSchool" />
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

<script>
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue';
import { useSchoolStore } from '../../stores/school';
import { useCompareStore } from '../../stores/compare';
import { useToastStore } from '../../stores/toast';
import { useMapStore } from '../../stores/map';
import { useFilterStore } from '../../stores/filter';
import { useSchoolService } from '../../services/school';
import { useCompareService } from '../../services/compare';
import { useMapService } from '../../services/map';
import { useFilterService } from '../../services/filter';
import { useRouter } from 'vue-router';
import { useScroll } from 'vue-scrollto';
import CompareSideBar from './CompareSideBar.vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import schoolIcon from '@/assets/images/school.png';

export default {
  name: 'MapShow',
  components: {
    CompareSideBar
  },
  setup() {
    const schoolStore = useSchoolStore();
    const compareStore = useCompareStore();
    const toastStore = useToastStore();
    const mapStore = useMapStore();
    const filterStore = useFilterStore();
    const schoolService = useSchoolService();
    const compareService = useCompareService();
    const mapService = useMapService();
    const filterService = useFilterService();
    const router = useRouter();
    const scroll = useScroll();

    const mapContainer = ref(null);
    const selectedSchool = ref(null);
    const isSchoolLoaded = ref(false);
    const map = ref(null);
    const mapLoaded = ref(false);
    const schools = ref([]);
    
    // 添加地图重置函数
    const resizeMap = () => {
      if (map.value) {
        setTimeout(() => {
          map.value.resize();
          console.log('Map manually resized');
        }, 300);
      }
    };
    
    const compareList = ref(JSON.parse(sessionStorage.getItem('compareList') || '[]'));

    // Watch compareList changes
    watch(compareList, (newVal) => {
      console.log('MapShow: compareList changed:', newVal)
      sessionStorage.setItem('compareList', JSON.stringify(newVal));
      window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: newVal }))
    }, { deep: true });

    // Watch compareList length changes
    watch(() => compareList.value.length, (newLength, oldLength) => {
      console.log('CompareList length changed:', newLength, oldLength);
      if (newLength === 0) {
        resizeMap();
      }
    }, { immediate: true });

    const checkCompareListLength = computed(() => {
      return compareList.value && compareList.value.length > 0;
    });

    const isInCompareList = computed(() => {
      if (!selectedSchool.value) return false
      return compareList.value.some(item => item.School_AGE_ID === selectedSchool.value.id)
    });

    const filters = ref({
      schoolType: 'ALL',
      languageProgram: 'ALL'
    });

    const availableSchoolTypes = ref(['ALL', 'Primary', 'Secondary', 'Tertiary']);
    const availableLanguages = ref(['ALL', 'English', 'Spanish', 'French', 'German']);

    const toast = ref({
      show: false,
      message: '',
      type: 'success'
    });

    let toastTimeout = null;

    const showToast = (type, message, duration = 3000) => {
      toast.value = { show: true, type, message }
      if (toastTimeout) clearTimeout(toastTimeout)
      toastTimeout = setTimeout(() => {
        toast.value.show = false
      }, duration)
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    const handleRemoveAll = () => {
      console.log('MapShow: Removing all schools');
      compareList.value = [];
      sessionStorage.setItem('compareList', '[]');
      window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: [] }));
      resizeMap();
    };

    const handleRemoveSchool = (schoolId) => {
      console.log('MapShow: Removing school:', schoolId);
      compareList.value = compareList.value.filter(school => school.School_AGE_ID !== schoolId);
      sessionStorage.setItem('compareList', JSON.stringify(compareList.value));
      window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }));
      
      if (compareList.value.length === 0) {
        resizeMap();
      }
    };

    const handleAddToCompare = (school) => {
      console.log('MapShow: Add to compare clicked for:', school)

      if (!school || !school.School_AGE_ID) {
        console.warn('Invalid school object or missing School_AGE_ID')
        showToast('error', 'Invalid school data. Cannot add to compare.')
        return
      }

      const exists = compareList.value.some(item => item.id === school.School_AGE_ID || item.url === school.School_URL)

      if (exists) {
        console.log('School already exists in compareList:', school.School_Name)
        showToast('warning', `"${school.School_Name}" is already in your compare list.`)
        return
      }

      if (compareList.value.length >= 3) {
        showToast('warning', 'You can only compare up to 3 schools.')
        return
      }

      compareList.value.push(school)
      console.log('MapShow: School added to compareList:', school.School_Name)
      showToast('success', `"${school.School_Name}" added to compare!`)
      
      sessionStorage.setItem('compareList', JSON.stringify(compareList.value))
      window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
    };



     const filteredSchools = computed(() => {
      let result = [...schools.value];

      if (filters.value.schoolType !== 'ALL') {
        result = result.filter(school => school.School_Sector === filters.value.schoolType);
      }

      if (filters.value.languageProgram !== 'ALL') {
        result = result.filter(school =>
          Array.isArray(school.languages) && school.languages.some(lang => lang === filters.value.languageProgram)
        );
      }

      return result;
    });

    const applyFilters = () => {
      if (!mapLoaded.value) {
        console.log('Map not ready yet');
        return;
      }

      if (!map.value.getSource('schools')) {
        console.log('Schools source not ready yet');
        return;
      }

      try {
        map.value.getSource('schools').setData({
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

        if (filteredSchools.value.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          filteredSchools.value.forEach(school => {
            bounds.extend([school.Longitude, school.Latitude]);
          });
          map.value.fitBounds(bounds, { padding: 50 });
        }

        // 确保地图正确显示
        resizeMap();
      } catch (error) {
        console.error('Error updating map data:', error);
      }
    };

    const resetFilters = () => {
      filters.value = {
        schoolType: 'ALL',
        languageProgram: 'ALL'
      };
      applyFilters();
      selectedSchool.value = null;
    };

    const initializeMap = () => {
      mapboxgl.accessToken = 'pk.eyJ1IjoicmV2aXZlZGVzaXJlIiwiYSI6ImNtOG50dzNmbDA0cGQyam9od2QzMjRnOHMifQ.1TH3sOapBo7eXNQ-2hBu6A'

      map.value = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [144.9631, -37.8136],
        zoom: 11,
        maxZoom: 14
      })

      map.value.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.value.on('load', () => {
        console.log('Map fully loaded');
        mapLoaded.value = true;
        initializeSchools();

        map.value.on('click', (e) => {
          const features = map.value.queryRenderedFeatures(e.point, { layers: ['school-points'] });
          if (features.length === 0) {
            selectedSchool.value = null;
          }
        });
      })
    }

    const initializeSchools = () => {
      map.value.loadImage(
        schoolIcon,
        (error, image) => {
          if (error) throw error

          map.value.addImage('school-icon', image)

          map.value.addSource('schools', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: schools.value.map(school => ({
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
            }
          })

          map.value.addLayer({
            id: 'school-points',
            type: 'symbol',
            source: 'schools',
            layout: {
              'icon-image': 'school-icon',
              'icon-size': 0.9,
              'icon-allow-overlap': true
            }
          })

          map.value.on('click', 'school-points', (e) => {
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

          map.value.on('mouseenter', 'school-points', () => {
            map.value.getCanvas().style.cursor = 'pointer'
          })

          map.value.on('mouseleave', 'school-points', () => {
            map.value.getCanvas().style.cursor = ''
          })

          setTimeout(() => {
            applyFilters();
          }, 100);
        }
      )
    }

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

      const handleStorageChange = (event) => {
        console.log('MapShow: Storage event received:', event)
        if (event.key === 'compareList') {
          const newCompareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
          compareList.value = newCompareList;
        }
      };

      const handleCompareListUpdate = (event) => {
        console.log('MapShow: CompareListUpdated event received:', event)
        if (event.detail !== undefined) {
          compareList.value = event.detail;
          sessionStorage.setItem('compareList', JSON.stringify(event.detail));
        } else {
          const newCompareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
          compareList.value = newCompareList;
        }
      };

      // 添加页面可见性变化监听
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          console.log('Page became visible, resizing map');
          resizeMap();
        }
      };

      // 添加路由变化监听
      router.afterEach(() => {
        nextTick(() => {
          console.log('Route changed, resizing map');
          resizeMap();
        });
      });

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('compareListUpdated', handleCompareListUpdate);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      onUnmounted(() => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('compareListUpdated', handleCompareListUpdate);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      });
    });

    return {
      mapContainer,
      selectedSchool,
      isInCompareList,
      isSchoolLoaded,
      checkCompareListLength,
      filters,
      availableSchoolTypes,
      availableLanguages,
      toast,
      applyFilters,
      resetFilters,
      handleAddToCompare,
      handleRemoveAll,
      handleRemoveSchool,
      scrollToTop
    };
  }
};
</script>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
}

.map-wrapper {
  transition: all 0.3s ease;
  flex-grow: 1;
}

.map-wrapper.w-full {
  width: 100% !important;
}

.map-wrapper.w-3/4 {
  width: 75% !important;
}

.compare-sidebar {
  transition: all 0.3s ease;
  width: 25%;
  opacity: 1;
}

#map {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
}

/* Filter styles */
.filter-section {
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-group {
  flex: 1;
  min-width: 200px;
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