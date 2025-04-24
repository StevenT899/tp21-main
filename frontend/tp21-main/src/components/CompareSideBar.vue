<template>
    <div class="w-full max-w-3xl mx-auto space-y-4">  <!-- Use max-width to make it responsive -->
      <!-- Header -->
      <div class="text-xl font-semibold">
        Schools Added for Comparison ({{ compareList.length }}/3)
      </div>
  
      <!-- School List -->
      <div class="space-y-2">
        <div v-for="(school, index) in compareList" :key="school.id" class="bg-white p-4 rounded-lg shadow w-full">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-semibold">{{ school.name || school.School_Name }}</h3>
              <p class="text-sm text-gray-500">{{ school.type || school.School_Sector }}</p>
              <p class="text-sm text-blue-500">{{ school.suburb || school.Suburb }}</p>
            </div>
            <button @click="removeFromCompare(index)" class="text-red-500 text-sm">Remove</button>
          </div>
        </div>
      </div>
  
      <div class="flex gap-2">
        <!-- Remove All Button -->
        <button v-if="compareList.length > 0" @click="removeAll"
                class="px-6 py-3 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors w-full">
          Remove All
        </button>
  
        <!-- Compare Now Button -->
        <router-link to="/compare">
          <button 
                  class="px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors w-full">
            Compare Now
          </button>
        </router-link>
      </div>
  
      <!-- Toast Notification -->
      <transition name="fade">
        <div v-if="toast.show" :class="['toast', toast.type]">
          {{ toast.message }}
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Reference for Toast
  const toast = ref({ show: false, type: '', message: '' })
  let toastTimeout = null
  
  const showToast = (type, message, duration = 3000) => {
    toast.value = { show: true, type, message }
    if (toastTimeout) clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => {
      toast.value.show = false
    }, duration)
  }
  
  // Retrieve the comparison list from sessionStorage
  const compareList = computed(() => {
    const list = sessionStorage.getItem('compareList')
    return list ? JSON.parse(list) : []
  })
  
  // Remove a school from the compare list
  const removeFromCompare = (index) => {
    const updatedList = [...compareList.value]
    const removedSchool = updatedList.splice(index, 1)
    sessionStorage.setItem('compareList', JSON.stringify(updatedList))
  
    // Show toast for single school removal
    showToast('success', `Remove from your compare list successfully.`)
  }
  
  // Remove all schools from the compare list
  const removeAll = () => {
    sessionStorage.setItem('compareList', JSON.stringify([]))
  
    // Show toast for clearing the compare list
    showToast('success', 'All schools have been removed from your compare list.')
  }
  </script>
  
  <style scoped>
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
  }
  
  .toast.success {
    background-color: #4CAF50; /* Green */
  }
  
  .toast.error {
    background-color: #f44336; /* Red */
  }
  
  .toast.info {
    background-color: #2196F3; /* Blue */
  }
  
  .toast.warning {
    background-color: #ff9800; /* Orange */
  }
  </style>
  