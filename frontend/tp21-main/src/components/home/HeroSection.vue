<!-- /**
  HeroSection.vue
 
  Description:
    HeroSection contain search school and explore school features for user to search and find searching results,
    after that, primary school information will be gotten from backend and pass to Maps to show. 
 
  Key Features:
    - Search primary schools by entering school name, suburb name or postcode.
    - Search school zone, finding schools within specific school zone according to an address.
    - Shearching suggestion box to prompt users.
 / -->

<template>
    <section class="py-12 px-6 md:px-12 lg:px-24 bg-white relative overflow-visable">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.2]">{{
                    $t('homeView.heroTitle') }}</h1>
                <p class="text-lg text-gray-700 mb-4">{{ $t('homeView.heroDesc1') }}</p>
                <p class="text-lg text-gray-700 mb-6">{{ $t('homeView.heroDesc2') }}</p>
                <p class="font-semibold text-lg mb-4">{{ $t('homeView.heroStart') }}</p>

                <!-- schools / school zone -->
                <div class="flex flex-col sm:flex-row mb-8">
                    <button @click="onExploreSchools" :class="activeView === 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'" class="py-2 px-6 rounded-md transition-colors">
                        {{ $t('homeView.exploreSchools') }}
                    </button>

                    <button @click="onShowMapZone" :class="activeView === 2
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'" class="py-2 px-6 rounded-md transition-colors">
                        {{ $t('homeView.checkPrefix') }}
                        <span v-if="!canSchoolZoneDesripBeChecked" class="underline underline-offset-2">{{
                            $t('homeView.schoolZone') }}</span>
                        <span v-if="canSchoolZoneDesripBeChecked" class="underline underline-offset-2"
                            @click.stop="openModal('ss')">{{
                                $t('homeView.schoolZone') }}</span>
                    </button>
                    <ModalBox ref="ModalBoxRef" />
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
                                :class="{ 'highlight-border': highlightSchoolSearch }"
                                class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input v-if="activeView === VIEW_ZONE" v-model="searchQuery2" @input="handleInput"
                                @keydown.enter="performSearch" @focus="showSuggestions = true" ref="searchBar"
                                type="text" maxlength="60" :placeholder="getSearchPlaceholder()"
                                :class="{ 'highlight-border': highlightZoneSearch }"
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
                            <p class="text-sm font-semibold text-gray-700 p-2 border-b border-gray-200">
                                {{ $t('homeView.suburb') }}</p>
                            <ul>
                                <li v-for="(suburb, index) in suburbResults" :key="index"
                                    class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                    @click="selectResult(suburb, 'suburb')">
                                    {{ suburb }}
                                </li>
                            </ul>
                        </div>
                        <div v-if="schoolResults.length > 0">
                            <p class="text-sm font-semibold text-gray-700 p-2 border-b border-gray-200">
                                {{ $t('homeView.school') }}</p>
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
                    <div v-if="showSuggestions && searchLocationResults.length > 0 && activeView === VIEW_ZONE"
                        ref="suggestionBox"
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
                :selectedType="selectedType" :matchedSchools="filteredMapSchools" />
        </div>
    </section>

    <!-- MapZone Section -->
    <section v-if="activeView === VIEW_ZONE && showMap" id="map-zone-section"
        class="py-12 px-6 md:px-12 lg:px-24 border-t border-b border-gray-200">
        <div class="max-w-7xl mx-auto">
            <MapZShow v-if="coordinates.length > 0 && isInPolygon" :coordinates="coordinates"
                :polygonValue="polygonValue" :schools="SearchSchoolsForMapShow"
                @locationObtained="handleLocationObtained" />
            <div v-if="!isInPolygon && searchResults.length > 0 && props.searchType === 'location'"
                class="text-red-500">
                no result
            </div>
        </div>
    </section>

</template>

<script setup>
import { ref, nextTick, onMounted, computed } from 'vue';
import MapShow from '@/components/home/MapShow.vue';
import MapZShow from './MapZShow.vue';
import { useClickOutside } from '@/utils/useClickOutside';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { point, polygon, booleanPointInPolygon } from '@turf/turf';
import ModalBox from '../base/ModalBox.vue';

defineOptions({ name: 'HomeView' })

const filteredMapSchools = computed(() => {
    if (!schools.value.length) return [];

    const input = searchQuery.value.toLowerCase().trim();
    if (selectedType.value === 'school') {
        return schools.value.filter(s => s.School_Name.toLowerCase() === input);
    } else if (selectedType.value === 'suburb') {
        const isPostcode = /^\d+$/.test(selectedSuburb.value);
        if (isPostcode) {
            return schools.value.filter(s => s.Postcode?.toString() === selectedSuburb.value);
        }
        return schools.value.filter(s => s.Suburb?.toLowerCase() === selectedSuburb.value.toLowerCase());
    }
    return [];
});

const ModalBoxRef = ref(null);
const openModal = (modalType) => {
    if (canSchoolZoneDesripBeChecked.value) {
        ModalBoxRef.value.toggleModal(modalType);
    }
};

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
const highlightSchoolSearch = ref(false);
const highlightZoneSearch = ref(false);
const isExploreSchoolsButtonDisabled = ref(false);
const isShowMapZoneButtonDisabled = ref(false);
const canSchoolZoneDesripBeChecked = ref(false);
const buttonClickTime = ref(0);

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
    saveSearchState();
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
    saveSearchState();
};


// BUTTONS: SCHOOLS / SCHOOL ZONE 
const onExploreSchools = async () => {
    sessionStorage.removeItem('schoolSearchState');

    buttonClickTime.value = 0;
    canSchoolZoneDesripBeChecked.value = false;
    activeView.value = VIEW_SCHOOL
    searchQuery.value = '';
    showMapZone.value = false
    showMap.value = false
    highlightSchoolSearch.value = true;
    isExploreSchoolsButtonDisabled.value = true;
    isShowMapZoneButtonDisabled.value = false;
    showSuggestions.value = false;
    searchResults.value = [];
    setTimeout(() => {
        highlightSchoolSearch.value = false;
    }, 3000);
    await showMapAndSearch()
}
const onShowMapZone = () => {
    sessionStorage.removeItem('schoolSearchState');

    buttonClickTime.value++;
    if (buttonClickTime.value === 1) {
        canSchoolZoneDesripBeChecked.value = true
        activeView.value = VIEW_ZONE
        searchQuery2.value = '';
        showMap.value = false
        showNoResultMessage.value = false
        showMapZone.value = true
        highlightZoneSearch.value = true;
        isExploreSchoolsButtonDisabled.value = false;
        isShowMapZoneButtonDisabled.value = true;
        showSuggestions.value = false;
        searchLocationResults.value = [];
        setTimeout(() => {
            highlightZoneSearch.value = false;
        }, 3000);

        nextTick(() => {
            const el = document.getElementById('map-zone-section')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        })
        // waiting to get address location
        setTimeout(() => {
            getLocation();
        }, 1000);
    }

}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log('lat:', latitude, 'long:', longitude);
                coordinates.value = [longitude, latitude];
                await checkPointInPolygons();
            },
            (error) => {
                console.error('Error during fetching location:', error.message);
            }
        );
    } else {
        console.error('browser not support this function.');
    }
};

const { t } = useI18n();
const getSearchPlaceholder = () => {
    if (activeView.value === VIEW_ZONE) {
        return t('homeView.searchPlaceholder2');
    }
    return t('homeView.searchPlaceholder');
}










//ZONE
const searchQuery2 = ref('');
const searchLocationResults = ref([]);
const selectedLocations = ref([]);
const suggestions = ref([]);
const coordinates = ref([]);
const isInPolygon = ref(false);
const zoneSchoolsData = ref([]);
const SearchSchoolsForMapShow = ref([]);
const polygonValue = ref([]);
const isSearching = ref(false);

// Get search suggestions
const handleInput = () => {
    if (!isSearching.value) {
        fetchSuggestions();
    }
};
// Use debounce to restrict Api frequency
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
                console.log("Searching Suggestions:", suggestions.value);
                searchLocationResults.value = suggestions.value.map(suggestion => suggestion.description);
                showSuggestions.value = true;
            } else {
                suggestions.value = [];
            }
        } catch (error) {
            console.error('Error during fetching suggestions:', error);
            suggestions.value = [];
        }
    } else {
        suggestions.value = [];
    }
}, 600);

// Handle suggestion selection
const handleSuggestionSelected = (location) => {
    searchQuery2.value = location;
    suggestions.value = [];
    searchLocationResults.value = [];
    showSuggestions.value = false;
    performSearch();
};

// Perform search
const performSearch = async () => {
    searchLocationResults.value = [];
    showSuggestions.value = false;
    isSearching.value = true;
    try {
        console.log('Address parameter for the initiated request:', searchQuery2.value);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/proxy/geocode`, {
            params: {
                address: searchQuery2.value,
            }
        });
        console.log('Request response data:', response.data);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            selectedLocations.value = [`Geographical location: ${searchQuery2.value}, Latitude: ${lat}, Longitude: ${lng}`];
            coordinates.value = [lng, lat];

            checkPointInPolygons();
        } else if (response.data.status === 'ZERO_RESULTS') {
            showNoResultMessage.value = true;
            setTimeout(() => {
                showNoResultMessage.value = false;
            }, 2000);
            selectedLocations.value = ['No relevant geographical location information found'];
            coordinates.value = [];
            isInPolygon.value = false;
        } else {
            selectedLocations.value = ['No relevant geographical location information found'];
            coordinates.value = [];
            isInPolygon.value = false;
        }
    } catch (error) {
        console.error('An error occurred while searching for the geographical location:', error);
        selectedLocations.value = ['An error occurred while searching for the geographical location. Please try again later'];
        coordinates.value = [];
        isInPolygon.value = false;
    } finally {
        isSearching.value = false;
    }
};

const fetchZoneSchools = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/zoneSchools`);
        zoneSchoolsData.value = response.data;
    } catch (error) {
        console.error('An error occurred while fetching the school information:', error);
    }
};

const fetchZoneSchoolsByName = async (name) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/school/zone?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('An error occurred while fetching the eligible school data:', error);
        return [];
    }
};

const checkPointInPolygons = async () => {
    if (!coordinates.value.length) return;

    const pt = point(coordinates.value);
    const insideNames = [];

    zoneSchoolsData.value.forEach(school => {
        try {
            const coords = JSON.parse(school.coordinates);
            if (booleanPointInPolygon(pt, polygon(coords))) {
                insideNames.push(school.School_Name);
            }
        } catch (e) {
            console.error(`Error: parsing ${school.School_Name} coordinates:`, e);
        }
    });

    if (insideNames.length) {
        isInPolygon.value = true;

        const details = await Promise.all(
            insideNames.map(async name => {
                const arr = await fetchZoneSchoolsByName(name);
                return arr[0] || null;
            })
        );
        SearchSchoolsForMapShow.value = details.filter(Boolean);
        console.log(SearchSchoolsForMapShow.value)

        const newPolys = SearchSchoolsForMapShow.value.map(school => {
            try {
                return JSON.parse(school.coordinates);
            } catch (e) {
                console.error(`Error: parsing ${school.School_Name} coordinates:`, e);
                return [];
            }
        });

        polygonValue.value = newPolys.length
            ? newPolys.flat(1)
            : [[[]]];
        showMap.value = true;
        console.log('polygonValue-------:', polygonValue.value)
        // scroll to map
        nextTick(() => {
            const mapSection = document.getElementById('map-zone-section');
            if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        saveSearchState();

    } else {
        showNoResultMessage.value = true;
        setTimeout(() => {
            showNoResultMessage.value = false;
        }, 2000);
        isInPolygon.value = false;
        SearchSchoolsForMapShow.value = [];
        polygonValue.value = [[[]]];
    }
};

const handleLocationObtained = (coords) => {
    coordinates.value = coords;
    checkPointInPolygons();
};

fetchZoneSchools();


//session storage
const saveSearchState = () => {
    const state = {
        activeView: activeView.value,
        searchQuery: searchQuery.value,
        searchQuery2: searchQuery2.value,
        coordinates: coordinates.value,
        isInPolygon: isInPolygon.value,
        selectedSuburb: selectedSuburb.value,
        selectedType: selectedType.value,
        isSchool: isSchool.value,
        SearchSchoolsForMapShow: SearchSchoolsForMapShow.value,
        polygonValue: polygonValue.value,
        showMap: showMap.value
    };
    sessionStorage.setItem('schoolSearchState', JSON.stringify(state));
};

const loadSearchState = async() => {
    const saved = sessionStorage.getItem('schoolSearchState');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            if (!schools.value.length) {
                await fetchSchools();
            }
            console.log('✅ loaded state:', state);
            activeView.value = state.activeView || VIEW_SCHOOL;
            searchQuery.value = state.searchQuery || '';
            searchQuery2.value = state.searchQuery2 || '';
            coordinates.value = state.coordinates || [];
            isInPolygon.value = state.isInPolygon || false;
            selectedSuburb.value = state.selectedSuburb || '';
            selectedType.value = state.selectedType || '';
            isSchool.value = state.isSchool || false;
            SearchSchoolsForMapShow.value = state.SearchSchoolsForMapShow || [];
            polygonValue.value = state.polygonValue || [[[]]];
            showMap.value = state.showMap || false;

            return state.showMap;
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
    return false;
};
onMounted(() => {
  loadSearchState();
});

</script>

<style scoped>
@keyframes highlight {
    0% {
        box-shadow: inset 0 0 0 0 rgba(43, 127, 255, 0);
    }

    1% {
        box-shadow: inset 0 0 0 2px #2b7fff;
    }

    99% {
        box-shadow: inset 0 0 0 2px #2b7fff;
    }

    100% {
        box-shadow: inset 0 0 0 0 rgba(43, 127, 255, 0);
    }
}

.highlight-border {
    animation: highlight 1s linear;
}

.underline.hover:text-red-600 {
    cursor: pointer;
}
</style>