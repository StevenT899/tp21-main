<template>
  <div class="map-wrapper relative rounded-lg overflow-hidden border border-gray-300" style="height: 500px;">
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
      <p class="text-gray-600 mb-3">{{ selectedSchool.type }} school</p>

      <div class="grid grid-cols-2 gap-2 mb-4">
        <div v-for="(language, index) in selectedSchool.languages" :key="index"
          class="rounded-md p-2 text-center text-sm" style="background-color: #EBF1FA;">
          {{ language }}
        </div>
      </div>

      <div class="flex justify-between">
        <button class="text-blue-500 hover:underline">View details</button>
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
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import schoolIcon from '@/assets/images/school.png';

const props = defineProps({
  schools: { type: Array, default: () => [] },
  polygonValue: { type: Array, default: () => [] },
  coordinates: { type: Array, default: () => [] }
});

const selectedSchool = ref(null);
const isSchoolLoaded = ref(false);

const map = ref(null);

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmV2aXZlZGVzaXJlIiwiYSI6ImNtOG50dzNmbDA0cGQyam9od2QzMjRnOHMifQ.1TH3sOapBo7eXNQ-2hBu6A';
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136],
    zoom: 11,
    maxZoom: 14
  });

  map.value.on('load', () => {
    initializeZonePolygon();
    initializeSchools();
    initializeSearchPoint();

  });
});

function handleAddToCompare() {

}

// 学校图层
function initializeSchools() {
  map.value.loadImage(schoolIcon, (err, img) => {
    if (err) throw err;
    map.value.addImage('school-icon', img);

    map.value.addSource('schools', {
      type: 'geojson',
      data: buildSchoolsGeoJSON(props.schools)
    });
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

    map.value.on('click', 'school-points', async e => {
      const p = e.features[0].properties;
      selectedSchool.value = {
        id: p.id,
        name: p.name,
        type: p.type,
        languages: p.languages ? p.languages.split(',') : []
      };
      isSchoolLoaded.value = false;
    });

    // hover
    map.value.on('mouseenter', 'school-points', () => map.value.getCanvas().style.cursor = 'pointer');
    map.value.on('mouseleave', 'school-points', () => map.value.getCanvas().style.cursor = '');
  });
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

watch(() => props.schools, newArr => {
  if (map.value.isStyleLoaded() && map.value.getSource('schools')) {
    map.value.getSource('schools').setData(buildSchoolsGeoJSON(newArr));
  }
});

// 区域多边形
function initializeZonePolygon() {
  map.value.addSource('zone-polygons', {
    type: 'geojson',
    data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: props.polygonValue } }
  });
  map.value.addLayer({ id: 'zone-fill', type: 'fill', source: 'zone-polygons', paint: { 'fill-color': '#088', 'fill-opacity': 0.2 } });
  map.value.addLayer({ id: 'zone-line', type: 'line', source: 'zone-polygons', paint: { 'line-color': '#088', 'line-width': 2 } });
}
watch(() => props.polygonValue, poly => {
  map.value.getSource('zone-polygons').setData({ type: 'Feature', geometry: { type: 'Polygon', coordinates: poly } });
});

// 搜索位置点
function initializeSearchPoint() {
  map.value.addSource('search-point', { type: 'geojson', data: buildSearchPointGeoJSON(props.coordinates) });
  map.value.addLayer({ id: 'search-point-layer', type: 'circle', source: 'search-point', paint: { 'circle-radius': 8, 'circle-color': '#f30' } });
}
watch(() => props.coordinates, coords => {
  if (map.value.isStyleLoaded() && map.value.getSource('search-point')) {
    map.value.getSource('search-point').setData(buildSearchPointGeoJSON(coords));
  }
});
function buildSearchPointGeoJSON(coords) {
  return { type: 'FeatureCollection', features: coords.length === 2 ? [{ type: 'Feature', geometry: { type: 'Point', coordinates: coords } }] : [] };
}
</script>

<style scoped>
#map {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
