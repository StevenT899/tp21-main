<template>
    
      <div  v-if="compareList.length > 0" class="w-full max-w-lg mx-auto space-y-3">  <!-- Use max-width to make it responsive -->
        <!-- Header -->
        <div class="text-xl font-semibold">
          Schools Added for Comparison ({{ compareList.length }}/3)
        </div>
  
        <!-- School List -->
        <div class="space-y-1">
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
  
        <div class="flex gap-10">
          <!-- Remove All Button -->
          <button v-if="compareList.length > 0" @click="removeAll"
                  class="px-6 py-3 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors w-full">
            Remove All
          </button>
  
          <!-- Compare Now Button -->
          <router-link to="/compare" @click.native="scrollToTop">
            <button class="px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors w-full">
              Compare
            </button>
          </router-link>
        </div>
      </div>
  
      <transition name="fade">
        <div v-if="toast.show" :class="['toast', toast.type]">
          {{ toast.message }}
        </div>
      </transition>
   
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  
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
  
  // Manage compareList using reactive ref instead of sessionStorage directly
  const compareList = ref([])
  
  // Watch sessionStorage and update compareList when the page reloads
  const loadCompareList = () => {
    const list = sessionStorage.getItem('compareList')
    compareList.value = list ? JSON.parse(list) : []
  }
  
  // Update sessionStorage whenever compareList changes
  const saveCompareList = () => {
    sessionStorage.setItem('compareList', JSON.stringify(compareList.value))
  }
  
  // Initialize compareList
  loadCompareList()
  
  // Remove a school from the compare list
  const removeFromCompare = (index) => {
    compareList.value.splice(index, 1)
    saveCompareList()  // Update sessionStorage
    showToast('success', `Removed from your compare list successfully.`)
  }
  
  // Remove all schools from the compare list
  const removeAll = () => {
    compareList.value = []
    saveCompareList()  // Update sessionStorage
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
  