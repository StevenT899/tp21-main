<template>
    <div class="compare-sidebar-container">
      <div v-if="compareList.length > 0" class="w-full max-w-lg mx-auto space-y-3">
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
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue'
  
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
  
  // Manage compareList using reactive ref
  const compareList = ref([])
  
  // Watch sessionStorage and update compareList when the page reloads
  const loadCompareList = () => {
    const list = sessionStorage.getItem('compareList')
    if (list) {
      try {
        const parsedList = JSON.parse(list)
        compareList.value = parsedList
        console.log('CompareSideBar: Loaded compare list:', parsedList)
      } catch (error) {
        console.error('Error parsing compare list:', error)
        compareList.value = []
      }
    } else {
      compareList.value = []
    }
  }
  
  // Update sessionStorage whenever compareList changes
  const saveCompareList = () => {
    try {
      const listToSave = JSON.stringify(compareList.value)
      sessionStorage.setItem('compareList', listToSave)
      console.log('CompareSideBar: Saved compare list:', compareList.value)
    } catch (error) {
      console.error('Error saving compare list:', error)
    }
  }
  
  // Initialize compareList
  loadCompareList()
  
  // Add watch for compareList changes
  watch(compareList, (newVal) => {
    console.log('CompareSideBar: compareList changed:', newVal)
    saveCompareList()
    // Dispatch custom event to notify parent components
    window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: newVal }))
  }, { deep: true })
  
  // Event handlers
  const handleStorageChange = (event) => {
    console.log('CompareSideBar: Storage event received:', event)
    if (event.key === 'compareList') {
      loadCompareList()
    }
  }
  
  const handleCompareListUpdate = (event) => {
    console.log('CompareSideBar: CompareListUpdated event received:', event)
    if (event.detail) {
      compareList.value = event.detail
    } else {
      loadCompareList()
    }
  }
  
  // Add event listeners
  onMounted(() => {
    console.log('CompareSideBar: Component mounted')
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('compareListUpdated', handleCompareListUpdate)
    loadCompareList()
  })
  
  // Remove event listeners
  onUnmounted(() => {
    console.log('CompareSideBar: Component unmounted')
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('compareListUpdated', handleCompareListUpdate)
  })
  
  // Remove a school from the compare list
  const removeFromCompare = (index) => {
    console.log('CompareSideBar: Removing school at index:', index)
    compareList.value.splice(index, 1)
    saveCompareList()
    showToast('success', `Removed from your compare list successfully.`)
    window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
  }
  
  // Remove all schools from the compare list
  const removeAll = () => {
    console.log('CompareSideBar: Removing all schools')
    compareList.value = []
    saveCompareList()
    showToast('success', 'All schools have been removed from your compare list.')
    window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
  }
  </script>
  
  <style scoped>
  .compare-sidebar-container {
    position: relative;
    width: 100%;
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