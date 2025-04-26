<template>
    <div class="compare-sidebar-container">
      <div v-if="compareList.length > 0" class="compare-content">
        <!-- Header -->
        <div class="text-lg font-semibold header-text">
          Added Schools ({{ compareList.length }}/3)
        </div>
  
        <!-- School List -->
        <div class="school-list">
          <div v-for="(school, index) in compareList" :key="school.id" class="school-card">
            <div>
              <h3 class="school-name">{{ school.name || school.School_Name }}</h3>
              <p class="school-suburb">{{ school.suburb || school.Suburb }}</p>
              <button @click="removeFromCompare(index)" class="remove-button">
                Remove
              </button>
            </div>
          </div>
        </div>
  
        <div class="button-group">
          <!-- Remove All Button -->
          <button v-if="compareList.length > 0" @click="removeAll" class="remove-all-button">
            Remove All
          </button>
  
          <!-- Compare Now Button -->
          <router-link to="/compare" @click.native="scrollToTop" class="compare-link">
            <button class="compare-button">
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
    padding: 0.3rem 1rem 1rem 1rem;
    box-sizing: border-box;
  }
  
  .compare-content {
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  
  .header-text {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.2rem 0;
  }
  
  .school-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
  }
  
  .school-card {
    background-color: white;
    padding: 0.32rem 0.5rem;
    border-radius: 0.32rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    width: 100%;
  }
  
  .school-name {
    font-weight: 600;
    font-size: 0.92rem;
    margin-bottom: 0.08rem;
    line-height: 1.15;
  }
  
  .school-type {
    font-size: 0.78rem;
    color: #6b7280;
    margin-bottom: 0.08rem;
    line-height: 1.15;
  }
  
  .school-suburb {
    font-size: 0.78rem;
    color: #3b82f6;
    margin-bottom: 0.18rem;
    line-height: 1.15;
  }
  
  .remove-button {
    color: #ef4444;
    font-size: 0.78rem;
    padding: 0.13rem 0.7rem;
    border-radius: 0.25rem;
    background: #fff;
    border: 1px solid #ef4444;
    cursor: pointer;
    transition: background 0.18s, color 0.18s, border 0.18s;
    margin-top: 0.08rem;
    display: inline-block;
    text-align: left;
    font-weight: 500;
  }
  
  .remove-button:hover {
    background-color: #fee2e2;
    color: #b91c1c;
    border-color: #b91c1c;
  }
  
  .button-group {
    display: flex;
    gap: 0.5rem;
    width: auto;
    margin-top: 0.3rem;
    justify-content: flex-end;
  }
  
  .remove-all-button,
  .compare-button {
    padding: 0.28rem 1rem;
    font-size: 0.85rem;
    border-radius: 0.25rem;
    transition: all 0.18s;
    text-align: center;
    border: none;
    cursor: pointer;
    width: auto;
    min-width: 80px;
    max-width: 120px;
    font-weight: 500;
    box-sizing: border-box;
  }
  
  .remove-all-button {
    background-color: #6b7280;
    color: white;
  }
  
  .remove-all-button:hover {
    background-color: #4b5563;
  }
  
  .compare-button {
    background-color: #3b82f6;
    color: white;
  }
  
  .compare-button:hover {
    background-color: #2563eb;
  }
  
  .compare-link {
    display: inline-block;
  }
  
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 7px 14px;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    z-index: 1000;
  }
  
  /* Responsive Design */
  @media (max-width: 640px) {
    .compare-content {
      max-width: 100%;
      padding: 0;
    }
  
    .button-group {
      gap: 0.3rem;
      justify-content: flex-end;
      flex-direction: row;
    }
    .remove-all-button,
    .compare-button {
      font-size: 0.8rem;
      padding: 0.22rem 0.7rem;
      min-width: 70px;
      max-width: 100px;
    }
    .school-card {
      padding: 0.25rem 0.3rem;
    }
    .header-text {
      font-size: 0.95rem;
    }
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    .compare-content {
      max-width: 90%;
    }
  
    .school-card {
      padding: 0.32rem 0.4rem;
    }
  }
  
  @media (min-width: 1025px) {
    .compare-content {
      max-width: 28rem;
    }
  }
  </style>
  