<template>
    <div class="w-full space-y-4">
      <!-- Header -->
      <div class="text-xl font-semibold">
        Schools Added for Comparison ({{ compareList.length }}/3)
      </div>
  
      <!-- School List -->
      <div class="space-y-2">
        <div v-for="(school, index) in compareList" :key="school.id" class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-semibold">{{ school.name }}</h3>
              <p class="text-sm text-gray-500">{{ school.type }}</p>
              <p class="text-sm text-blue-500">{{ school.suburb || school.Suburb }}</p>
            </div>
            <button @click="removeFromCompare(index)" class="text-red-500 text-sm">Remove</button>
          </div>
        </div>
      </div>
  
      <!-- Remove All Button -->
      <button v-if="compareList.length > 0" @click="removeAll" 
              class="w-full py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors">
        Remove All
      </button>
  
      <!-- Compare Now Button -->
      <router-link to="/compare">
        <button 
                class="w-full py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
            Compare Now
        </button>
      </router-link>
    
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Retrieve the comparison list from sessionStorage
  const compareList = computed(() => {
    const list = sessionStorage.getItem('compareList')
    return list ? JSON.parse(list) : []
  })
  
  // Remove a school from the compare list
  const removeFromCompare = (index) => {
    const updatedList = [...compareList.value]
    updatedList.splice(index, 1)
    sessionStorage.setItem('compareList', JSON.stringify(updatedList))
  }
  
  // Remove all schools from the compare list
  const removeAll = () => {
    sessionStorage.setItem('compareList', JSON.stringify([]))
  }
  
  
  </script>
  
  <style scoped>
  /* Optional: Custom styling for the sidebar */
  .bg-white {
    background-color: #ffffff;
  }
  </style>
  