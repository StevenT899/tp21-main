<template>
  <div class="app">
    <!-- Hero Section -->
    <section class="py-12 px-6 md:px-12 lg:px-24 bg-white relative overflow-visable">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.2]">
            Find the Right Primary School for Your Child
          </h1>
          <p class="text-lg text-gray-700 mb-4">
            Explore, compare, and understand Victorian schools. We help migrant families make confident school choices.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Use our simple map tool to search schools, see what they offer, and find the best fit for your child —
            academically, culturally, and practically.
          </p>
          <p class="font-semibold text-lg mb-4">Choose an option to get started!</p>

          <div class="flex flex-col sm:flex-row w-5/7 mb-8">
            <button class="w-2/3 bg-blue-600 text-white py-2 px-6 rounded-r-none rounded-md hover:bg-blue-700 transition-colors"
              @click="isChecked = false" :disabled="isChecked">
              Explore schools
            </button>
            <button class="w-2/3" :class="{
              'bg-gray-200 text-gray-700 py-2 px-6 rounded-l-none rounded-md hover:bg-gray-300 transition-colors': !isChecked,
              'bg-blue-600 text-white py-2 px-6 rounded-l-none rounded-md hover:bg-blue-700 transition-colors': isChecked
            }" @click="isChecked = true" :disabled="!isChecked">
              Check your <span class="underline underline-offset-2">school zone</span>
            </button>
          </div>

          <div class="relative">
            <div class="flex">
              <div class="relative flex-grow">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="text-gray-500">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <!-- searching bar -->
                <input v-model="searchQuery" @input="search" @keydown.enter="showMapAndSearch"
                  @focus="showSuggestions = true" ref="searchBar" type="text" maxlength="60"
                  placeholder="Enter suburb/ postcode/ school name"
                  class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button @click="showMapAndSearch"
                class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                Search
              </button>
            </div>
            <!-- searching suggetion box -->
            <div v-if="showSuggestions && searchResults.length > 0" ref="suggestionBox"
              class="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
              <div v-if="suburbResults.length > 0">
                <p class="text-sm font-semibold text-gray-700 p-2 border-b border-gray-200">Suburb</p>
                <ul>
                  <li v-for="(suburb, index) in suburbResults" :key="index"
                    class="py-2 px-4 hover:bg-gray-100 cursor-pointer" @click="selectResult(suburb, 'suburb')">
                    {{ suburb }}
                  </li>
                </ul>
              </div>
              <div v-if="schoolResults.length > 0">
                <p class="text-sm font-semibold text-gray-700 p-2 border-b border-gray-200">School</p>
                <ul>
                  <li v-for="(school, index) in schoolResults" :key="index"
                    class="py-2 px-4 hover:bg-gray-100 cursor-pointer" @click="selectResult(school, 'school')">
                    {{ school }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- prompt: no result -->
            <div v-if="showNoResultMessage"
              class="absolute top-full left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md mt-1 z-10">
              No result found. Please try again!
            </div>
          </div>
        </div>
        <img src="@/assets/images/home1.png" alt="homepage photo" class="w-full h-auto">
      </div>
    </section>

    <!-- Map Section -->
    <section v-if="showMap" class="py-12 px-6 md:px-12 lg:px-24 border-t border-b border-gray-200"
      style="background: linear-gradient(to bottom, #ecf2fb 1%, transparent 15%);">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Find Schools Near You</h2>
        <MapShow :searchQuery="searchQuery" :isSchool="isSchool" :selectedSuburb="selectedSuburb"
          :selectedType="selectedType" />
      </div>
    </section>

    <!-- Help Section -->
    <HelpSection />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MapShow from '@/components/MapShow.vue';
import HelpSection from '@/components/home/HelpSection.vue';
import { useClickOutside } from '@/utils/useClickOutside';

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
  if (searchQuery.value.trim().length === 0) {
    return; // if nothing in search bar, do nothing
  }

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
};
</script>