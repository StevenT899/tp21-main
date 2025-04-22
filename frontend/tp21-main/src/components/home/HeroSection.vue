<template>
    <section class="py-12 px-6 md:px-12 lg:px-24 bg-white relative overflow-visable">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.2]">{{ $t('homeView.heroTitle')
                }}
                </h1>
                <p class="text-lg text-gray-700 mb-4">{{ $t('homeView.heroDesc1') }}</p>
                <p class="text-lg text-gray-700 mb-6">{{ $t('homeView.heroDesc2') }}</p>
                <p class="font-semibold text-lg mb-4">{{ $t('homeView.heroStart') }}</p>

                <!-- schools / school zone -->
                <div class="flex flex-col sm:flex-row gap-4 mb-8">
                    <button @click="onExploreSchools" :class="activeView === 'school'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'"
                        class="py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                        {{ $t('homeView.exploreSchools') }}
                    </button>

                    <button @click="onShowMapZone" :class="activeView === 'zone'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'"
                        class="py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
                        {{ $t('homeView.checkPrefix') }}
                        <span class="underline underline-offset-2">{{ $t('homeView.schoolZone') }}</span>
                    </button>
                </div>

                <div class="relative">
                    <div class="flex">
                        <div class="relative flex-grow">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="text-gray-500">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>

                            <!-- searching bar -->
                            <input v-if="activeView === VIEW_SCHOOL" v-model="searchQuery" @input="search"
                                @keydown.enter="showMapAndSearch" @focus="showSuggestions = true" ref="searchBar"
                                type="text" maxlength="60" :placeholder="getSearchPlaceholder()"
                                class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input v-if="activeView === VIEW_ZONE" v-model="searchQuery2" @input="handleInput"
                                @keydown.enter="performSearch" @focus="showSuggestions = true" ref="searchBar"
                                type="text" maxlength="60" :placeholder="getSearchPlaceholder()"
                                class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button v-if="activeView === VIEW_SCHOOL" @click="showMapAndSearch"
                            class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                            {{ $t('homeView.searchButton') }}
                        </button>
                        <button v-if="activeView === VIEW_ZONE" @click="performSearch"
                            class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                            {{ $t('homeView.searchButton') }}
                        </button>
                    </div>


                    <!-- searching suggetion box -->
                    <!-- SCHOOL -->
                    <div v-if="showSuggestions && searchResults.length > 0 && activeView === VIEW_SCHOOL"
                        ref="suggestionBox"
                        class="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
                        <div v-if="suburbResults.length > 0">
                            <p class="text-sm font-semibold text-gray-700 p-2 border-b border-gray-200">Suburb</p>
                            <ul>
                                <li v-for="(suburb, index) in suburbResults" :key="index"
                                    class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                    @click="selectResult(suburb, 'suburb')">
                                    {{ suburb }}
                                </li>
                            </ul>
                        </div>
                        <div v-if="schoolResults.length > 0">
                            <p class="text-sm font-semibold text-gray-700 p-2 border-b border-gray-200">School</p>
                            <ul>
                                <li v-for="(school, index) in schoolResults" :key="index"
                                    class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                    @click="selectResult(school, 'school')">
                                    {{ school }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- ZONE -->
                    <div v-if=" showSuggestions && searchLocationResults.length > 0 && activeView === VIEW_ZONE" ref="suggestionBox"
                        class="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
                        <ul>
                            <li v-for="location in searchLocationResults" :key="location"
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                @click="handleSuggestionSelected(location)">
                                {{ location }}
                            </li>
                        </ul>
                    </div>

                    <!-- prompt: no result -->
                    <div v-if="showNoResultMessage"
                        class="absolute top-full left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md mt-1 z-10">
                        {{ $t('homeView.noResult') }}
                    </div>
                </div>
            </div>
            <img src="@/assets/images/home1.png" alt="homepage photo" class="w-full h-auto">
        </div>
    </section>

    <!-- Map Section -->
    <section v-if="activeView === VIEW_SCHOOL && showMap" id="map-section"
        class="py-12 px-6 md:px-12 lg:px-24 border-t border-b border-gray-200"
        style="background: linear-gradient(to bottom, #ecf2fb 1%, transparent 15%);">
        <div class="max-w-7xl mx-auto">
            <MapShow :searchQuery="searchQuery" :isSchool="isSchool" :selectedSuburb="selectedSuburb"
                :selectedType="selectedType" />
        </div>
    </section>

    <!-- MapZone Section -->
    <section v-if="activeView === VIEW_ZONE && showMap" id="map-zone-section"
        class="py-12 px-6 md:px-12 lg:px-24 border-t border-b border-gray-200">
        <div class="max-w-7xl mx-auto">
            <MapZShow v-if="coordinates.length > 0 && isInPolygon" :coordinates="coordinates"
                :polygonValue="polygonValue" :schools="SearchSchoolsForMapShow" />
            <div v-if="!isInPolygon && searchResults.length > 0 && props.searchType === 'location'"
                class="text-red-500">
                no result
            </div>
        </div>
    </section>

</template>

<script setup>
import { ref, nextTick } from 'vue';
import MapShow from '@/components/MapShow.vue';
import { useClickOutside } from '@/utils/useClickOutside';
import MapZShow from './MapZShow.vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { point, polygon, booleanPointInPolygon } from '@turf/turf';

// search bar
const searchQuery = ref('');
const showNoResultMessage = ref(false);
const showMap = ref(false);
const isSchool = ref(false);
// search suggestion box
const selectedType = ref(''); //'suburb' or 'school'
const selectedSuburb = ref('');
const suggestionBox = ref(null);
const searchBar = ref(null);
const { isOpen: showSuggestions } = useClickOutside(suggestionBox, searchBar);

// store searching results
const searchResults = ref([]);
const suburbResults = ref([]);
const schoolResults = ref([]);
const schools = ref([]);
const suburbPostcodeMap = ref({}); // map: suburb -> postcode

// —— NEW STATUS OF BUTTONS —— //
const VIEW_SCHOOL = 1
const VIEW_ZONE = 2
const activeView = ref(VIEW_SCHOOL)
const showMapZone = ref(false)
const selectedSchool = ref('');

// fetch schools from database
const fetchSchools = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/schools`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        schools.value = data;

        // create suburbPostcodeMap
        data.forEach(school => {
            if (school.Suburb && school.Postcode) {
                suburbPostcodeMap.value[school.Suburb.toLowerCase()] = school.Postcode;
            }
        });
    } catch (error) {
        console.error('Error fetching schools:', error);
    }
};

const search = async () => {
    const input = searchQuery.value;
    // judge: if input>2
    if (input.length <= 2) {
        searchResults.value = [];
        suburbResults.value = [];
        schoolResults.value = [];
        return;
    }

    if (!schools.value.length) {
        await fetchSchools();
    }
    // clear previous searching result
    searchResults.value = [];
    suburbResults.value = [];
    schoolResults.value = [];

    const lowerCaseInput = input.toLowerCase().trim();

    const uniqueSuburbs = new Set();
    const uniqueSchools = new Set();


    schools.value.forEach(school => {
        const formattedSuburb = `${school.Suburb}, ${school.Postcode}`;
        const lowerSuburb = school.Suburb?.toLowerCase();
        const lowerSchool = school.School_Name?.toLowerCase();
        const postcode = school.Postcode?.toString();

        // exact match suburb
        if (lowerSuburb === lowerCaseInput) {
            uniqueSuburbs.add(formattedSuburb);
        }

        // exact match school
        if (lowerSchool === lowerCaseInput) {
            uniqueSchools.add(school.School_Name);
        }

        // exact match postcode
        if (postcode === lowerCaseInput) {
            uniqueSuburbs.add(formattedSuburb);
        }

        // fuzzy suburb match
        if (lowerSuburb?.includes(lowerCaseInput)) {
            uniqueSuburbs.add(formattedSuburb);
        }

        // fuzzy school match
        if (lowerSchool?.includes(lowerCaseInput)) {
            uniqueSchools.add(school.School_Name);
        }
    });

    suburbResults.value = [...uniqueSuburbs];
    schoolResults.value = [...uniqueSchools];
    searchResults.value = [...uniqueSuburbs, ...uniqueSchools];

    // show suggetion box
    showSuggestions.value = true;
};

const showMapAndSearch = async () => {
    // if nothing in search bar, do nothing
    if (searchQuery.value.trim().length === 0) return;

    await search(); // run search to update suggestion results


    const input = searchQuery.value.toLowerCase().trim();

    // reset state
    isSchool.value = false;
    selectedSuburb.value = '';
    selectedType.value = '';

    let exactSchoolMatch = false;
    let exactSuburbMatch = false;

    // check exact school match
    for (const school of schools.value) {
        if (school.School_Name.toLowerCase() === input) {
            exactSchoolMatch = true;
            isSchool.value = true;
            selectedType.value = 'school';
            break;
        }
    }

    // check exact suburb match (if not a school)
    if (!exactSchoolMatch) {
        for (const school of schools.value) {
            if (school.Suburb && school.Suburb.toLowerCase() === input) {
                exactSuburbMatch = true;
                selectedSuburb.value = school.Suburb;
                selectedType.value = 'suburb';
                break;
            }
        }
    }

    // check if input is an exact postcode match (only digits)
    if (!exactSchoolMatch && !exactSuburbMatch) {
        const isPostcode = /^\d+$/.test(input);
        if (isPostcode) {
            const suburbExists = schools.value.some(
                school => school.Postcode?.toString() === input
            );
            if (suburbExists) {
                exactSuburbMatch = true;
                selectedSuburb.value = input;
                selectedType.value = 'suburb';
            }
        }
    }

    // final decision
    const isExactMatch = exactSchoolMatch || exactSuburbMatch;

    if (!isExactMatch) {
        showNoResultMessage.value = true;
        showMap.value = false;

        // error prompt timer
        setTimeout(() => {
            showNoResultMessage.value = false;
        }, 2000);
    } else {
        showNoResultMessage.value = false;
        showMap.value = true;
    }

    // always hide suggestion box when search is confirmed
    showSuggestions.value = false;

    // scroll to map
    nextTick(() => {
        const mapSection = document.getElementById('map-section');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

};

const selectResult = (result, type) => {
    if (type === 'suburb') {
        // extract suburb name from formatted string
        const suburbName = result.split(',')[0].trim();
        searchQuery.value = suburbName;
        selectedSuburb.value = suburbName;
        isSchool.value = false;
        selectedType.value = 'suburb';
    } else {
        searchQuery.value = result;
        isSchool.value = true;
        selectedSuburb.value = '';
        selectedType.value = 'school';
    }

    searchResults.value = [];
    suburbResults.value = [];
    schoolResults.value = [];

    // trigger searching auto
    showSuggestions.value = false;
    showMap.value = true;

    // scroll to map
    nextTick(() => {
        const mapSection = document.getElementById('map-section');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
};


// BUTTONS: SCHOOLS / SCHOOL ZONE 
const onExploreSchools = async () => {
    activeView.value = VIEW_SCHOOL
    showMapZone.value = false
    await showMapAndSearch()
}
const onShowMapZone = () => {
    activeView.value = VIEW_ZONE
    showMap.value = false
    showNoResultMessage.value = false
    showMapZone.value = true

    nextTick(() => {
        const el = document.getElementById('map-zone-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
}

const { t } = useI18n();
const getSearchPlaceholder = () => {
    if (activeView.value === VIEW_ZONE) {
        return t('homeView.searchPlaceholder2');
    }
    return t('homeView.searchPlaceholder');
}










//ZONE
// Define component emits
const emits = defineEmits(['searchPerformed']);

// Search query
const searchQuery2 = ref('');
// Search results
const searchLocationResults = ref([]);
const selectedLocations = ref([]);
// Suggestions
const suggestions = ref([]);
// Coordinates
const coordinates = ref([]);
// Flag to check if the point is in the polygon
const isInPolygon = ref(false);
// 存储所有学校的多边形和学校信息
const zoneSchoolsData = ref([]);
// 存储符合条件的学校名字
const SearchSchoolNames = ref([]);
// 存储符合条件的学校数据，用于 MapShow 组件
const SearchSchoolsForMapShow = ref([]);
// 多边形值
const polygonValue = ref([]);

// Get search suggestions
// 使用 debounce 来限制 API 请求频率
const fetchSuggestions = debounce(async () => {
    if (searchQuery2.value.trim().length >= 5) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/proxy/place-autocomplete`, {
                params: {
                    input: searchQuery2.value,
                }
            });
            if (response.data.status === 'OK') {
                suggestions.value = response.data.predictions;
                console.log(suggestions.value);
                searchLocationResults.value = suggestions.value.map(suggestion => suggestion.description);
                showSuggestions.value = true;
            } else {
                suggestions.value = [];
            }
        } catch (error) {
            console.error('获取搜索建议时出错:', error);
            suggestions.value = [];
        }
    } else {
        suggestions.value = [];
    }
}, 800);

// 在输入时调用
const handleInput = () => {
    fetchSuggestions();
};

// Handle suggestion selection
const handleSuggestionSelected = (location) => {
    searchQuery2.value = location;
    suggestions.value = [];
    searchLocationResults.value = [];
    showSuggestions.value = false;
    showMap.value = true;
    performSearch();
};


// Perform search
const performSearch = async () => {
    try {
        console.log('发起请求的地址参数:', searchQuery2.value);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/proxy/geocode`, {
            params: {
                address: searchQuery2.value,
            }
        });
        console.log('请求响应数据:', response.data);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            selectedLocations.value = [`地理位置: ${searchQuery2.value}, 纬度: ${lat}, 经度: ${lng}`];
            coordinates.value = [lng, lat];

            // 判断点是否在多边形内
            checkPointInPolygons();

            emits('searchPerformed', selectedLocations.value);
        } else {
            selectedLocations.value = ['未找到相关地理位置信息'];
            coordinates.value = [];
            isInPolygon.value = false;
            emits('searchPerformed', selectedLocations.value);
        }
    } catch (error) {
        console.error('搜索地理位置时出错:', error);
        selectedLocations.value = ['搜索地理位置时出错，请稍后重试'];
        coordinates.value = [];
        isInPolygon.value = false;
        emits('searchPerformed', selectedLocations.value);
    }
};




// 获取所有zone的学校信息
const fetchZoneSchools = async () => {
    try {
        const response = await axios.get('http://localhost:5000/zoneSchools');
        zoneSchoolsData.value = response.data;
    } catch (error) {
        console.error('获取学校信息时出错:', error);
    }
};

// 根据学校名字获取符合条件的学校数据
const fetchZoneSchoolsByName = async (name) => {
    try {
        const response = await axios.get(`http://localhost:5000/school/zone?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('获取符合条件的学校数据时出错:', error);
        return [];
    }
};

const checkPointInPolygons = async () => {
  // 如果还没选点，就不执行
  if (!coordinates.value.length) return;

  // 构造 turf 点
  const pt = point(coordinates.value);
  const insideNames = [];

  // 先根据所有 zoneSchoolsData 找出哪些学校名字在多边形内
  zoneSchoolsData.value.forEach(school => {
    try {
      const coords = JSON.parse(school.coordinates);
      if (booleanPointInPolygon(pt, polygon(coords))) {
        insideNames.push(school.School_Name);
      }
    } catch (e) {
      console.error(`解析学校 ${school.School_Name} 的 coordinates 时出错:`, e);
    }
  });

  if (insideNames.length) {
    // 标记为在多边形内
    isInPolygon.value = true;

    // 把所有符合条件的学校完整数据拉下来
    const details = await Promise.all(
      insideNames.map(async name => {
        const arr = await fetchZoneSchoolsByName(name);
        return arr[0] || null;
      })
    );
    SearchSchoolsForMapShow.value = details.filter(Boolean);
    console.log(SearchSchoolsForMapShow.value)

    // 从这些完整对象里提取 coordinates 更新 polygonValue
    const newPolys = SearchSchoolsForMapShow.value.map(school => {
      try {
        return JSON.parse(school.coordinates);
      } catch (e) {
        console.error(`解析学校 ${school.School_Name} 的 coordinates 时出错:`, e);
        return [];
      }
    });

    // flatted 一层，保持之前格式
    polygonValue.value = newPolys.length
      ? newPolys.flat(1)
      : [[[]]];
    console.log('polygonValue-------:', polygonValue.value)
  } else {
    // 没找到就重置
    isInPolygon.value = false;
    SearchSchoolsForMapShow.value = [];
    polygonValue.value = [[[]]];
  }
};

// 在组件加载时获取所有学校信息
fetchZoneSchools();
</script>