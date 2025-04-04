<template>
    <div class="min-h-screen bg-gray-50 p-8">
      <!-- 页面标题 -->
      <div class="text-start mb-10">
        <h1 class="text-3xl font-semibold text-blue-600 mb-2">COMPARE YOUR SELECTED SCHOOLS</h1>
        <p class="text-lg text-gray-600">You can select up to 3 schools. See how they compare side-by-side.</p>
      </div>
  
      <!-- 如果没有数据，显示 "没有数据" -->
      <div v-if="schools.length === 0" class="text-center text-lg text-gray-600">
        <p>No schools available to compare.</p>
        <button @click="goToHome" class="mt-4 text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
            Go to Homepage
        </button>
      </div>
  
      <!-- 学校卡片容器 -->
      <div v-else class="flex flex-wrap justify-between gap-4 px-6">
        <div
          v-for="(school, index) in schools"
          :key="index"
          class="w-full sm:w-1/3 p-4 max-w-sm bg-white rounded-lg shadow-lg"
        >
          <!-- 学校信息 -->
          <h2 class="text-xl font-bold text-center text-blue-600 mb-4">{{ school.name }}</h2>
  
          <div class="space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>School Type</span>
              <span>{{ school.type }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Year Range</span>
              <span>{{ school.yearRange }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Language Program</span>
              <span>{{ school.languageProgram }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Teaching Staff Per Student</span>
              <span>{{ school.staffPerStudent }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Enrolments</span>
              <span>Total enrolment: {{ school.totalEnrolment }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Student Language Background</span>
              <span>{{ school.studentLanguageBackground }}%</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>ICSEA</span>
              <span>{{ school.icsea }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

import { useRouter } from 'vue-router';


  
  const schools = [
    {
      name: "St Mary Of The Cross Mackillop Catholic Parish Primary School",
      type: "Government",
      yearRange: "Prep-6",
      languageProgram: "Aboriginal Language",
      staffPerStudent: "1.2",
      totalEnrolment: "304",
      studentLanguageBackground: "25",
      icsea: "949"
    },
    {
      name: "St Mary Of The Cross Mackillop Catholic Parish Primary School",
      type: "Catholic",
      yearRange: "Prep-4",
      languageProgram: "Chinese",
      staffPerStudent: "1.5",
      totalEnrolment: "304",
      studentLanguageBackground: "30",
      icsea: "1024"
    },
    {
      name: "St Mary Of The Cross Mackillop Catholic Parish Primary School",
      type: "Government",
      yearRange: "Prep-6",
      languageProgram: "None",
      staffPerStudent: "1.3",
      totalEnrolment: "304",
      studentLanguageBackground: "20",
      icsea: "1201"
    }
  ];
  

const router = useRouter();

const goToHome = () => {
  router.push({ name: 'Home' });  
};
  </script>
  
  <style scoped>

  </style>
  