<!-- CompareSideBar.vue 
  Description:
    The CompareSideBar component displays the user's selected schools in a sidebar.
    It provides controls to remove individual schools, clear all selections, and navigate to the comparison page,
    with toast notifications for each action.
 
  Key Features:
    1. Loads and syncs the compareList from sessionStorage.
    2. removeFromCompare(index): removes a single school, updates storage, and emits 'rm'.
    3. removeAll(): clears all schools, updates storage, and emits 'rma'.
    4. Listens for and dispatches 'compareListUpdated' custom events to keep components in sync.
    5. Adds/removes storage and compareListUpdated event listeners on mount and unmount.
    6. "Compare Now" button routes to '/compare' and scrolls to the top.
 
  Emits:
    - rm  : emitted when a single school is removed.
    - rma : emitted when all schools are removed. -->

<template>
  <div class="compare-sidebar-container">
    <div v-if="compareList.length > 0" class="compare-content">
      <!-- Header -->
      <div class="text-lg font-semibold header-text">
        {{ $t('CompareSideBar.header', { count: compareList.length }) }}
      </div>

      <!-- School List -->
      <div class="school-list">
        <div v-for="(school, index) in compareList" :key="school.id" class="school-card mt-1 mb-2">
          <div>
            <h3 class="school-name">{{ school.name || school.School_Name }}</h3>
    
            <p class="school-sector">
              {{ $t(`schoolTypes.${school.School_Sector || school.type || school.sector}`) }}
            </p>

            <!-- School Suburb with SVG Icon -->
            <p class="school-suburb flex items-center">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="mr-1">
                <path
                  d="M0.5 4.5C0.5 3.30653 0.974106 2.16193 1.81802 1.31802C2.66193 0.474106 3.80653 0 5 0C6.19347 0 7.33807 0.474106 8.18198 1.31802C9.02589 2.16193 9.5 3.30653 9.5 4.5C9.5 5.69347 9.02589 6.83807 8.18198 7.68198C7.33807 8.52589 6.19347 9 5 9C3.80653 9 2.66193 8.52589 1.81802 7.68198C0.974106 6.83807 0.5 5.69347 0.5 4.5ZM5 2.5C5.275 2.5 5.5 2.275 5.5 2C5.5 1.725 5.275 1.5 5 1.5C3.34375 1.5 2 2.84375 2 4.5C2 4.775 2.225 5 2.5 5C2.775 5 3 4.775 3 4.5C3 3.39687 3.89687 2.5 5 2.5ZM4 15V9.90938C4.66119 10.0302 5.33881 10.0302 6 9.90938V15C6 15.5531 5.55312 16 5 16C4.44688 16 4 15.5531 4 15Z"
                  fill="#004ABA" />
              </svg>
              {{ school.suburb || school.Suburb }}
            </p>

            <div class="flex justify-end">
              <button @click="removeFromCompare(index)" class="remove-button">
                {{ $t('CompareSideBar.removeButton') }}
              </button>
            </div>

          </div>
        </div>
      </div>

      <div class="button-group mt-1">

        <!-- Compare Now Button -->
        <router-link to="/compare" @click.native="scrollToTop" class="compare-link">
          <button class="compare-button mt-1">
            {{ $t('CompareSideBar.compareButton') }}
          </button>
        </router-link>

        <!-- Remove All Button -->
        <button v-if="compareList.length > 0" @click="removeAll" class="remove-all-button mt-1">
          {{ $t('CompareSideBar.removeAllButton') }}
        </button>
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
import { ref, watch, onMounted, onUnmounted, onActivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import '@/assets/toast.css'

const route = useRoute()

const emit = defineEmits(['rm', 'rma'])

const { t } = useI18n();
// Manage compareList using reactive ref
const compareList = ref([])

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo(0, 0)
}

// Toast notification
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

let toastTimeout = null

const showToast = (type, messageKey, params = {}, duration = 3000) => {
  const message = t(`messages.toast.${type}.${messageKey}`, params)
  console.log('[Toast] showToast:', type, messageKey, message)
  toast.value = { show: true, type, message }


  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, duration)
}

// Remove a school from the compare list
const removeFromCompare = (index) => {
  console.log('CompareSideBar: Removing school at index:', index)
  compareList.value.splice(index, 1)
  saveCompareList()
  emit('rm')
  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
}

// Remove all schools from the compare list
const removeAll = () => {
  console.log('CompareSideBar: Removing all schools')
  compareList.value = []
  saveCompareList()
  emit('rma')

  window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: compareList.value }))
}




// Watch sessionStorage and update compareList when the page reloads
const loadCompareList = () => {
  console.log('CompareSideBar: Loading compare list from storage')
  const list = sessionStorage.getItem('compareList')
  if (list) {
    try {
      const parsedList = JSON.parse(list)
      // Normalize data format to ensure consistency
      const normalizedList = parsedList.map(school => ({
        id: school.id || school.School_AGE_ID,
        name: school.name || school.School_Name,
        School_Sector: school.School_Sector || school.type || school.sector,
        suburb: school.suburb || school.Suburb,
        School_URL: school.School_URL || school.url
      }))
      compareList.value = normalizedList
      console.log('CompareSideBar: Loaded and normalized compare list:', normalizedList)
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
    // Normalize data format to ensure consistency
    const normalizedList = compareList.value.map(school => ({
      id: school.id || school.School_AGE_ID,
      name: school.name || school.School_Name,
      School_Sector: school.School_Sector || school.type || school.sector,
      suburb: school.suburb || school.Suburb,
      School_URL: school.School_URL || school.url
    }))
    const listToSave = JSON.stringify(normalizedList)
    sessionStorage.setItem('compareList', listToSave)
    console.log('CompareSideBar: Saved normalized compare list:', normalizedList)
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

// Add event listeners and route watcher
onMounted(() => {
  console.log('CompareSideBar: Component mounted')
  window.addEventListener('storage', handleStorageChange)
  window.addEventListener('compareListUpdated', handleCompareListUpdate)
  loadCompareList()
})

// Watch route changes to reload state when returning to home
watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/home' && oldPath !== '/home') {
    console.log('CompareSideBar: Returning to home, reloading state')
    loadCompareList()
  }
})

// Add onActivated hook to reload state when component is reactivated
onActivated(() => {
  console.log('CompareSideBar: Component activated')
  loadCompareList()
})

// Remove event listeners
onUnmounted(() => {
  console.log('CompareSideBar: Component unmounted')
  window.removeEventListener('storage', handleStorageChange)
  window.removeEventListener('compareListUpdated', handleCompareListUpdate)
})
</script>

<style scoped>

/* Compare Sidebar Container */
.compare-sidebar-container {
  position: relative;
  padding: 0.3rem;
  box-sizing: border-box;
  width: 300px;
}

/* Sidebar content */
.compare-content {
  width: 100%;
  max-width: 10rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Header text */
.header-text {
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.2rem 0;
}

/* School List */
.school-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
}

/* School Card */
.school-card {
  background-color: #F1F1F1;
  padding: 0.4rem 0.4rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  width: 100%;
}

/* School Name */
.school-name {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.05rem;
  line-height: 1.15;
}

/* School Suburb */
.school-suburb {
  font-size: 0.75rem;
  color: #3b82f6;
  margin-bottom: 0.1rem;
  line-height: 1.15;
}

.school-sector {
  font-size: 0.75rem;
  color: #333333;
  margin-bottom: 0.1rem;
  line-height: 1.15;
}

.remove-button {
  color: #333333;
  font-size: 0.75rem; 
  padding: 0.25rem 0.4rem;
  border-radius: 8px; 
  background: #ffffff;
  border: none;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border 0.18s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}




.remove-button:hover {
  background-color: #fee2e2;
  color: #b91c1c;
  border-color: #b91c1c;
}

/* Button Group */
.button-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  width: 100%;
}

/* Remove All Button & Compare Button */
.remove-all-button,
.compare-button {
  padding: 0.25rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  transition: all 0.18s;
  text-align: center;
  border: none;
  cursor: pointer;
  min-width: 100px;
  transition: background-color 0.3s;
  border-radius: 8px; 

}

/* Remove All Button Style */
.remove-all-button {
  background-color: #6b7280;
  color: white;
}

.remove-all-button:hover {
  background-color: #4b5563;
}

/* Compare Button Style */
.compare-button {
  background-color: #3b82f6;
  color: white;
}

.compare-button:hover {
  background-color: #2563eb;
}

/* Router Link styling */
.compare-link {
  display: inline-block;
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

  /* Remove All Button & Compare Button */
  .remove-all-button,
  .compare-button {
  padding: 0.25rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  transition: all 0.18s;
  text-align: center;
  border: none;
  cursor: pointer;
  min-width: 100px;
  transition: background-color 0.3s;
  }


  .remove-all-button:hover,
  .compare-button:hover {
    background-color: #2563eb;
    
  }

  /* Focus state */
  .remove-all-button:focus,
  .compare-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);

  }


  .school-card {
    padding: 0.2rem 0.3rem;
    background-color: #f8fafc;
  }

  .header-text {
    font-size: 0.9rem;
  }
}

@media (min-width: 600px) and (max-width: 1024px) {
  .compare-content {
    max-width: 90%;
  }

  .school-card {
    padding: 0.25rem 0.4rem;
  }

  .remove-all-button,
  .compare-button {
  padding: 0.25rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  transition: all 0.18s;
  text-align: center;
  border: none;
  cursor: pointer;
  min-width: 100px;
  transition: background-color 0.3s;
  }


  .remove-all-button:hover,
  .compare-button:hover {
    background-color: #2563eb;
    
  }
}

@media (min-width: 1025px) {
  .compare-content {
    max-width: 22rem;
  }
}





</style>