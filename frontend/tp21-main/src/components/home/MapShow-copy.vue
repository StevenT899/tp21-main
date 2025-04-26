<template>
  <div class="map-container flex">
<<<<<<< HEAD:frontend/tp21-main/src/components/home/MapShow-copy.vue
    <div class="filter-section flex flex-col md:flex-row gap-4 mb-4">
      <div class="filter-group">
        <label for="school-type" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('MapShow.filterSection.schoolType') }}</label>
        <select id="school-type" v-model="filters.schoolType"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="ALL">ALL</option>
          <option v-for="type in availableSchoolTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="language-program" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('MapShow.filterSection.languageProgram') }}</label>
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

    <div class="map-instruction flex items-center gap-2 mb-2 text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>{{ $t('MapShow.mapInstruction') }}</span>
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
        <button class="absolute top-4 right-11 bg-white text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md"
          @click="getCurrentLocation">
          Get Location
        </button>
      </div>
    </transition>

    <!-- 侧边栏部分，淡入淡出动画 -->
    <transition name="sidebar-fade">
      <div
        v-if="checkCompareListLength"
        class="compare-sidebar w-1/4 p-4 bg-white shadow-lg rounded-lg ms-4"
        style="height: 500px;"
      >
        <CompareSideBar @remove-all="handleRemoveAll" @remove-school="handleRemoveSchool" />
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition name="fade">
      <div v-if="toast.show" :class="['toast', toast.type]">
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue';
import CompareSideBar from '@/components/CompareSideBar.vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import schoolIcon from '@/assets/images/school.png';

const mapContainer = ref(null);
const selectedSchool = ref(null);
const isSchoolLoaded = ref(false);
const map = ref(null);
const mapLoaded = ref(false);
const schools = ref([]);

const compareList = ref(JSON.parse(sessionStorage.getItem('compareList') || '[]'));

const checkCompareListLength = computed(() => {
  return compareList.value && compareList.value.length > 0;
});

const isInCompareList = computed(() => {
  if (!selectedSchool.value) return false
  return compareList.value.some(item => item.School_AGE_ID === selectedSchool.value.id)
});

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

const handleAddToCompare = (school) => {
  if (!school || !school.School_AGE_ID) {
    showToast('error', 'Invalid school data. Cannot add to compare.')
    return
  }
  const exists = compareList.value.some(item => item.id === school.School_AGE_ID || item.url === school.School_URL)
  if (exists) {
    showToast('warning', `"${school.School_Name}" is already in your compare list.`)
    return
  }
  if (compareList.value.length >= 3) {
    showToast('warning', 'You can only compare up to 3 schools.')
    return
  }
  compareList.value.push(school)
  showToast('success', `"${school.School_Name}" added to compare!`)
  sessionStorage.setItem('compareList', JSON.stringify(compareList.value))
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
};

const handleRemoveAll = () => {
  compareList.value = [];
  sessionStorage.setItem('compareList', '[]');
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: [] }));
};

const handleRemoveSchool = (schoolId) => {
  compareList.value = compareList.value.filter(school => school.School_AGE_ID !== schoolId);
  sessionStorage.setItem('compareList', JSON.stringify(compareList.value));
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }));
};

const resizeMap = () => {
  if (map.value) {
    setTimeout(() => {
      map.value.resize();
    }, 400); // 等待动画完成
  }
};

// 监听 compareList 长度变化，sidebar 显隐时 resize 地图
watch(checkCompareListLength, () => {
  resizeMap();
});

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmV2aXZlZGVzaXJlIiwiYSI6ImNtOG50dzNmbDA0cGQyam9od2QzMjRnOHMifQ.1TH3sOapBo7eXNQ-2hBu6A';
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136],
    zoom: 11,
    maxZoom: 14
  });

  map.value.addControl(new mapboxgl.NavigationControl(), 'top-right')

  map.value.on('load', () => {
    mapLoaded.value = true;
    // ...初始化学校、polygon等
  });

  // 监听 compareList 的 storage 事件
  const handleStorageChange = (event) => {
    if (event.key === 'compareList') {
      const newCompareList = JSON.parse(sessionStorage.getItem('compareList') || '[]');
      compareList.value = newCompareList;
    }
  };
  const handleCompareListUpdate = (event) => {
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

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('compareListUpdated', handleCompareListUpdate);
  });
});

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // emit('locationObtained', [longitude, latitude]);
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
.map-container {
  display: flex;
}

.map-wrapper {
  transition: width 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s, border 0.3s;
  flex-grow: 1;
  /* transition: width 0.3s ease; */
}

.map-wrapper.w-full {
  width: 100% !important;
}

.map-wrapper.w-3/4 {
  width: 75% !important;
 
}

.compare-sidebar {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
  opacity: 1;
  transform: translateX(0);
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
}

.map-width-fade-enter-active,
.map-width-fade-leave-active {
  transition: width 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s, border 0.3s;
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