<!--
  CompareView.vue
 
  Description:
    Renders the school comparison page where users can view up to three selected schools side by side.
    Each school card displays key details (name, location, type, year range, language programs, ICSEA, enrolment),
    interactive gender and language distribution charts, and controls to remove or add schools.
    Placeholder cards allow searching and adding new schools. Removal actions are confirmed via modal dialogs,
    informational modals expose details for language programs and ICSEA, and toast notifications provide feedback.
 
  Key Features:
    - Loads and displays up to three schools from sessionStorage.
    - Placeholder slots for adding schools via live search and recommendations.
    - Removal confirmation modal for individual schools.
    - Informational modals for language program and ICSEA explanations.
    - Toast notifications for success and error events.
 / -->




<template>
  <div class="min-h-screen bg-gray-50 p-8 mx-auto max-w-[1400px]">
    <!-- Page Header -->
    <div class="text-start mb-5">
      <button @click="goBack"
        class="mb-6 inline-flex items-center px-3 py-1 bg-[#E2EDFE] text-gray-800 rounded hover:bg-gray-200 focus:outline-none">
        <span class="text-lg font-medium">{{ $t('articleDetailView.button.goBack') }}</span>
      </button>

      <h1 class="text-3xl font-semibold text-blue-600 mb-2">{{ $t('compareView.pageHeader.title') }}</h1>
      <p class="text-lg text-gray-600">{{ $t('compareView.pageHeader.description') }}</p>

      <div class="map-instruction flex items-center gap-2 mb-2 pr-40 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
       
        <span>{{ $t('compareView.pageHeader.description2') }}</span>
      </div>

      

      

    </div>

    <!-- School Comparison Cards -->
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
      <div v-for="i in 3" :key="i"
        class="relative w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 p-4 max-w-md bg-white rounded-lg shadow-lg min-h-[650px]">
        <template v-if="schools[i - 1]">
          
          <button @click="removeSchool(i - 1)"
  class="flex items-center absolute top-2 right-2 text-sm font-semibold hover:text-blue-500 z-10 bg-white px-2 py-1 rounded shadow cursor-pointer"
 >

  <svg
    class="w-4 h-4 mr-1 self-center"
    width="14"
    height="14"
    viewBox="0 0 20 23"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.875 7.1875V21.5625C1.875 22.3531 2.52187 23 3.3125 23H16.25C17.0406 23 17.6875 22.3531 17.6875 21.5625V7.1875H1.875ZM6.1875 20.125H4.75V10.0625H6.1875V20.125ZM9.0625 20.125H7.625V10.0625H9.0625V20.125ZM11.9375 20.125H10.5V10.0625H11.9375V20.125ZM14.8125 20.125H13.375V10.0625H14.8125V20.125ZM18.0469 2.875H13.375V1.07812C13.3739 0.792538 13.2599 0.518972 13.058 0.31703C12.856 0.115088 12.5825 0.00113555 12.2969 0L7.26562 0C6.98004 0.00113555 6.70647 0.115088 6.50453 0.31703C6.30259 0.518972 6.18864 0.792538 6.1875 1.07812V2.875H1.51562C1.22969 2.875 0.955463 2.98859 0.753276 3.19078C0.551088 3.39296 0.4375 3.66719 0.4375 3.95312V5.75H19.125V3.95312C19.125 3.66719 19.0114 3.39296 18.8092 3.19078C18.607 2.98859 18.3328 2.875 18.0469 2.875ZM11.9375 2.875H7.625V1.45619H11.9375V2.875Z"
    />
  </svg>

  {{ $t('compareView.schoolCard.removeButton') }}
</button>

          <div class="flex flex-col justify-between mb-4 h-28">
            <h2 class="text-3xl font-bold text-center text-600 mt-6">{{ schools[i - 1].name }}</h2>

            <p class="text-center text-gray-500 mt-1 text-sm">
              {{ schools[i - 1].suburb }}, {{ schools[i - 1].postcode }}
            </p>

            <div v-if="schools[i - 1].url" class="text-right mt-1">
              <a :href="schools[i - 1].url" target="_blank" rel="noopener noreferrer"
                class="text-blue-500 text-sm hover:underline inline-flex items-center gap-1">
                {{ $t('compareView.schoolCard.visitWebsite') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor"
                  stroke-width="2" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          <div class="space-y-6 text-xl text-gray-800 min-h-[460px]">
            <div class="pb-4 border-b border-gray-300 sm:mt-20 md:mt-12 lg:mt-40 xl:mt-10">
              <span class="block font-bold">{{ $t('compareView.schoolCard.schoolType') }}</span>
              <span class="block text-center mt-6">{{ $t(`schoolTypes.${schools[i - 1].type}`) || schools[i - 1].type
                }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">{{ $t('compareView.schoolCard.yearRange') }}</span>
              <span class="block text-center mt-6">{{ schools[i - 1].yearRange }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <div class="flex items-center justify-between">
                <!-- Title and Icon -->
                <span class="block font-bold mb-2 mt-1">{{ $t('compareView.schoolCard.languageProgram') }}</span>

                <!-- Language Program Icon -->
                <div class="relative ml-2">
                  <svg width="16" height="16" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-600 cursor-pointer" @click="toggleModal('lp')">
                    <path
                      d="M14.1666 0.666504C21.5306 0.666504 27.4999 6.63584 27.4999 13.9998C27.4999 21.3638 21.5306 27.3332 14.1666 27.3332C6.80259 27.3332 0.833252 21.3638 0.833252 13.9998C0.833252 6.63584 6.80259 0.666504 14.1666 0.666504ZM14.1666 3.33317C11.3376 3.33317 8.6245 4.45698 6.62411 6.45736C4.62372 8.45775 3.49992 11.1709 3.49992 13.9998C3.49992 16.8288 4.62372 19.5419 6.62411 21.5423C8.6245 23.5427 11.3376 24.6665 14.1666 24.6665C16.9956 24.6665 19.7087 23.5427 21.7091 21.5423C23.7094 19.5419 24.8333 16.8288 24.8333 13.9998C24.8333 11.1709 23.7094 8.45775 21.7091 6.45736C19.7087 4.45698 16.9956 3.33317 14.1666 3.33317ZM14.1666 19.3332C14.5202 19.3332 14.8593 19.4736 15.1094 19.7237C15.3594 19.9737 15.4999 20.3129 15.4999 20.6665C15.4999 21.0201 15.3594 21.3593 15.1094 21.6093C14.8593 21.8594 14.5202 21.9998 14.1666 21.9998C13.813 21.9998 13.4738 21.8594 13.2238 21.6093C12.9737 21.3593 12.8333 21.0201 12.8333 20.6665C12.8333 20.3129 12.9737 19.9737 13.2238 19.7237C13.4738 19.4736 13.813 19.3332 14.1666 19.3332ZM14.1666 6.6665C15.2896 6.66654 16.3776 7.05764 17.2436 7.77264C18.1097 8.48763 18.6997 9.48188 18.9123 10.5846C19.125 11.6873 18.947 12.8297 18.409 13.8155C17.8709 14.8012 17.0064 15.5689 15.9639 15.9865C15.8095 16.0433 15.6703 16.135 15.5573 16.2545C15.4986 16.3212 15.4893 16.4065 15.4906 16.4945L15.4999 16.6665C15.4995 17.0063 15.3694 17.3332 15.1361 17.5803C14.9028 17.8274 14.584 17.9762 14.2447 17.9961C13.9055 18.016 13.5714 17.9056 13.3108 17.6875C13.0502 17.4694 12.8827 17.16 12.8426 16.8225L12.8333 16.6665V16.3332C12.8333 14.7958 14.0733 13.8732 14.9719 13.5118C15.3377 13.3658 15.6567 13.1229 15.8948 12.8092C16.1329 12.4954 16.2811 12.1228 16.3234 11.7312C16.3657 11.3397 16.3005 10.944 16.1349 10.5867C15.9693 10.2294 15.7094 9.92392 15.3833 9.70314C15.0572 9.48236 14.6771 9.35458 14.2838 9.33353C13.8905 9.31248 13.4989 9.39895 13.1511 9.58366C12.8033 9.76838 12.5123 10.0443 12.3095 10.3819C12.1067 10.7195 11.9997 11.106 11.9999 11.4998C11.9999 11.8535 11.8594 12.1926 11.6094 12.4426C11.3593 12.6927 11.0202 12.8332 10.6666 12.8332C10.313 12.8332 9.97382 12.6927 9.72378 12.4426C9.47373 12.1926 9.33325 11.8535 9.33325 11.4998C9.33325 10.218 9.84248 8.98858 10.7489 8.08215C11.6553 7.17573 12.8847 6.6665 14.1666 6.6665Z"
                      fill="black" />
                  </svg>
                </div>
              </div>


              <!-- Modal for Language Program -->
              <div v-if="showModal === 'lp'"
                class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">

                  <button @click="toggleModal('lp')"
                    class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
                    &times;
                  </button>

                  <h2 class="text-xl font-semibold mb-4">{{ $t('compareView.languageProgram.title') }}</h2>
                  <p class="text-lg text-gray-700 mb-6">
                    {{ $t('compareView.languageProgram.description') }}
                  </p>
                  <button @click="$router.push({ name: 'ArticleDetail', params: { id: 30 } })"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    {{ $t('compareView.languageProgram.readMore') }}
                  </button>
                </div>
              </div>



              <!-- Language Program Container -->
              <div v-if="schools[i - 1].languageProgramArr.length"
                class="flex flex-wrap gap-4 mt-6 justify-center min-h-[80px]">
                <!-- Render language program buttons -->
                <span v-for="(lang, j) in schools[i - 1].languageProgramArr.slice(0, 4)" :key="j"
                  class="bg-blue-700 text-sm text-white px-4 py-2 rounded-full w-1/3 text-center truncate mb-1"
                  :title="lang">
                  {{ $t(`languages.${lang}`) || lang }}
                </span>

                <!-- Empty placeholders -->
                <span v-for="n in (4 - schools[i - 1].languageProgramArr.length)" :key="'empty-' + n"
                  class="w-1/3 h-10 "></span>
              </div>

              <!-- Display "None" -->
              <div v-else class="text-500 w-full text-center py-2 mt-6 min-h-[56px]">
                {{ $t('compareView.schoolCard.none') }}
              </div>

              <!-- Empty row when "None" is displayed -->
              <div v-if="schools[i - 1].languageProgramArr.length === 0" class="flex justify-center gap-4">
                <span class="w-1/3 h-10"></span>
                <span class="w-1/3 h-10"></span>
              </div>
            </div>


            <div class="pb-4 border-b border-gray-300">
              <span class="block font-bold">{{ $t('compareView.schoolCard.studentPerStaff') }}</span>
              <span class="block text-center mt-6">{{ Math.round(formatNumber(1 / schools[i - 1].staffPerStudent))
                }}</span>
            </div>

            <div class="pb-4 border-b border-gray-300">
              <!-- ICSEA Section -->
              <div class="flex items-center justify-between">
                <span class="font-bold">{{ $t('compareView.schoolCard.icsea') }}</span>
                <div class="relative">
                  <svg width="16" height="16" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-600 cursor-pointer" @click="toggleModal('icsea')">
                    <path
                      d="M14.1666 0.666504C21.5306 0.666504 27.4999 6.63584 27.4999 13.9998C27.4999 21.3638 21.5306 27.3332 14.1666 27.3332C6.80259 27.3332 0.833252 21.3638 0.833252 13.9998C0.833252 6.63584 6.80259 0.666504 14.1666 0.666504ZM14.1666 3.33317C11.3376 3.33317 8.6245 4.45698 6.62411 6.45736C4.62372 8.45775 3.49992 11.1709 3.49992 13.9998C3.49992 16.8288 4.62372 19.5419 6.62411 21.5423C8.6245 23.5427 11.3376 24.6665 14.1666 24.6665C16.9956 24.6665 19.7087 23.5427 21.7091 21.5423C23.7094 19.5419 24.8333 16.8288 24.8333 13.9998C24.8333 11.1709 23.7094 8.45775 21.7091 6.45736C19.7087 4.45698 16.9956 3.33317 14.1666 3.33317ZM14.1666 19.3332C14.5202 19.3332 14.8593 19.4736 15.1094 19.7237C15.3594 19.9737 15.4999 20.3129 15.4999 20.6665C15.4999 21.0201 15.3594 21.3593 15.1094 21.6093C14.8593 21.8594 14.5202 21.9998 14.1666 21.9998C13.813 21.9998 13.4738 21.8594 13.2238 21.6093C12.9737 21.3593 12.8333 21.0201 12.8333 20.6665C12.8333 20.3129 12.9737 19.9737 13.2238 19.7237C13.4738 19.4736 13.813 19.3332 14.1666 19.3332ZM14.1666 6.6665C15.2896 6.66654 16.3776 7.05764 17.2436 7.77264C18.1097 8.48763 18.6997 9.48188 18.9123 10.5846C19.125 11.6873 18.947 12.8297 18.409 13.8155C17.8709 14.8012 17.0064 15.5689 15.9639 15.9865C15.8095 16.0433 15.6703 16.135 15.5573 16.2545C15.4986 16.3212 15.4893 16.4065 15.4906 16.4945L15.4999 16.6665C15.4995 17.0063 15.3694 17.3332 15.1361 17.5803C14.9028 17.8274 14.584 17.9762 14.2447 17.9961C13.9055 18.016 13.5714 17.9056 13.3108 17.6875C13.0502 17.4694 12.8827 17.16 12.8426 16.8225L12.8333 16.6665V16.3332C12.8333 14.7958 14.0733 13.8732 14.9719 13.5118C15.3377 13.3658 15.6567 13.1229 15.8948 12.8092C16.1329 12.4954 16.2811 12.1228 16.3234 11.7312C16.3657 11.3397 16.3005 10.944 16.1349 10.5867C15.9693 10.2294 15.7094 9.92392 15.3833 9.70314C15.0572 9.48236 14.6771 9.35458 14.2838 9.33353C13.8905 9.31248 13.4989 9.39895 13.1511 9.58366C12.8033 9.76838 12.5123 10.0443 12.3095 10.3819C12.1067 10.7195 11.9997 11.106 11.9999 11.4998C11.9999 11.8535 11.8594 12.1926 11.6094 12.4426C11.3593 12.6927 11.0202 12.8332 10.6666 12.8332C10.313 12.8332 9.97382 12.6927 9.72378 12.4426C9.47373 12.1926 9.33325 11.8535 9.33325 11.4998C9.33325 10.218 9.84248 8.98858 10.7489 8.08215C11.6553 7.17573 12.8847 6.6665 14.1666 6.6665Z"
                      fill="black" />
                  </svg>
                  <div v-if="showModal === 'icsea'"
                    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
                    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">

                      <button @click="toggleModal('icsea')"
                        class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
                        &times;
                      </button>

                      <h2 class="text-xl font-semibold mb-4">{{ $t('compareView.icseaModal.title') }}</h2>
                      <p class="text-lg text-gray-700 mb-6">
                        {{ $t('compareView.icseaModal.description') }}
                      </p>
                      <button @click="$router.push({ name: 'ArticleDetail', params: { id: 23 } })"
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        {{ $t('compareView.icseaModal.readMore') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <span class="block mt-6 text-center">{{ schools[i - 1].icsea }}</span>
            </div>

            <div>
              <span class="block font-bold">{{ $t('compareView.schoolCard.enrolments') }}</span>
              <span class="block text-center mt-6">{{ $t('compareView.schoolCard.totalEnrolment') }} {{ schools[i -
                1].totalEnrolment }}</span>
              <div class="flex justify-center items-end mt-6 pb-4">
                <GenderBarChart :girls="schools[i - 1].Girls_Enrolment" :boys="schools[i - 1].Boys_Enrolment" />
                <LanguageBarChart :english="schools[i - 1].english" :notEnglish="schools[i - 1].notEnglish"
                  :notStated="schools[i - 1].notStated" />
              </div>
            </div>
          </div>
        </template>

        <!-- Placeholder card -->
        <template v-else>
          <div class="flex flex-col h-full justify-start text-gray-500">
            <div class="mb-4 relative">
              <h3 class="text-xl text-black font-semibold mb-2">{{ $t('compareView.schoolCard.searchToAdd') }}</h3>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="text-gray-500">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input v-model="searchQueries[i - 1]" @input="searchCompareSchools(i)" type="text"
                  :placeholder="$t('compareView.schoolCard.searchPlaceholder')"
                  class="text-lg text-black w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <ul v-if="recommendedSchools[i - 1].length"
                  class="absolute z-10 w-full border mt-1 rounded shadow bg-white max-h-60 overflow-y-auto">
                  <li v-for="(item, index) in recommendedSchools[i - 1]" :key="index"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-lg text-black"
                    @click="selectRecommended(item, i)">
                    {{ item.School_Name }} ({{ item.Suburb }})
                  </li>
                </ul>
              </div>
              <div class="flex justify-end mt-2">
                <button @click="addToCompare(i)"
                  class="bg-blue-500 text-lg text-white px-4 py-2 rounded shadow hover:bg-blue-700 w-fit">
                  {{ $t('compareView.schoolCard.addToCompare') }}
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('compareView.confirmationModal.title') }}</h2>
        <p class="text-gray-600 text-xl mb-6">{{ $t('compareView.confirmationModal.message') }}</p>


        <div class="flex justify-center gap-4">
          <button @click="confirmRemove" class="px-4 py-2 bg-red-600 text-white text-lg rounded-md hover:bg-red-700">
            {{ $t('compareView.confirmationModal.remove') }}
          </button>
          <button @click="cancelRemove"
            class="px-4 py-2 bg-gray-200 text-gray-700 text-lg rounded-md hover:bg-gray-300">
            {{ $t('compareView.confirmationModal.cancel') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast"
      :class="['fixed top-6 left-1/2 transform -translate-x-1/2 px-8 py-5 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300', toastType === 'success' ? 'bg-green-500' : 'bg-yellow-500']">
      {{ toastMessage }}
    </div>

    <div
    class="fixed bottom-6 right-6 w-16 h-16 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition flex flex-col items-center justify-center"
    aria-label="Back to top" v-if="showBackToTop" @click="scrollToTop">
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="45" fill="#0B5CD5" fill-opacity="0.5" />
      <path
        d="M46.7678 18.2322C45.7915 17.2559 44.2085 17.2559 43.2322 18.2322L27.3223 34.1421C26.346 35.1184 26.346 36.7014 27.3223 37.6777C28.2986 38.654 29.8816 38.654 30.8579 37.6777L45 23.5355L59.1421 37.6777C60.1184 38.654 61.7014 38.654 62.6777 37.6777C63.654 36.7014 63.654 35.1184 62.6777 34.1421L46.7678 18.2322ZM45 53L47.5 53L47.5 36.5L45 36.5L42.5 36.5L42.5 53L45 53ZM45 36.5L47.5 36.5L47.5 20L45 20L42.5 20L42.5 36.5L45 36.5Z"
        fill="white" />
      <path
        d="M29.56 75V63.64H25.08V61H37.28V63.64H32.8V75H29.56ZM42.8295 75.16C41.6829 75.16 40.6629 74.92 39.7695 74.44C38.8895 73.96 38.1895 73.3067 37.6695 72.48C37.1629 71.64 36.9095 70.6867 36.9095 69.62C36.9095 68.54 37.1629 67.5867 37.6695 66.76C38.1895 65.92 38.8895 65.2667 39.7695 64.8C40.6629 64.32 41.6829 64.08 42.8295 64.08C43.9629 64.08 44.9762 64.32 45.8695 64.8C46.7629 65.2667 47.4629 65.9133 47.9695 66.74C48.4762 67.5667 48.7295 68.5267 48.7295 69.62C48.7295 70.6867 48.4762 71.64 47.9695 72.48C47.4629 73.3067 46.7629 73.96 45.8695 74.44C44.9762 74.92 43.9629 75.16 42.8295 75.16ZM42.8295 72.6C43.3495 72.6 43.8162 72.48 44.2295 72.24C44.6429 72 44.9695 71.66 45.2095 71.22C45.4495 70.7667 45.5695 70.2333 45.5695 69.62C45.5695 68.9933 45.4495 68.46 45.2095 68.02C44.9695 67.58 44.6429 67.24 44.2295 67C43.8162 66.76 43.3495 66.64 42.8295 66.64C42.3095 66.64 41.8429 66.76 41.4295 67C41.0162 67.24 40.6829 67.58 40.4295 68.02C40.1895 68.46 40.0695 68.9933 40.0695 69.62C40.0695 70.2333 40.1895 70.7667 40.4295 71.22C40.6829 71.66 41.0162 72 41.4295 72.24C41.8429 72.48 42.3095 72.6 42.8295 72.6ZM57.175 75.16C56.2683 75.16 55.475 74.96 54.795 74.56C54.115 74.16 53.5817 73.5533 53.195 72.74C52.8217 71.9133 52.635 70.8733 52.635 69.62C52.635 68.3533 52.815 67.3133 53.175 66.5C53.535 65.6867 54.055 65.08 54.735 64.68C55.415 64.28 56.2283 64.08 57.175 64.08C58.1883 64.08 59.095 64.3133 59.895 64.78C60.7083 65.2333 61.3483 65.8733 61.815 66.7C62.295 67.5267 62.535 68.5 62.535 69.62C62.535 70.7533 62.295 71.7333 61.815 72.56C61.3483 73.3867 60.7083 74.0267 59.895 74.48C59.095 74.9333 58.1883 75.16 57.175 75.16ZM50.815 78.88V64.24H53.795V66.44L53.735 69.64L53.935 72.82V78.88H50.815ZM56.635 72.6C57.155 72.6 57.615 72.48 58.015 72.24C58.4283 72 58.755 71.66 58.995 71.22C59.2483 70.7667 59.375 70.2333 59.375 69.62C59.375 68.9933 59.2483 68.46 58.995 68.02C58.755 67.58 58.4283 67.24 58.015 67C57.615 66.76 57.155 66.64 56.635 66.64C56.115 66.64 55.6483 66.76 55.235 67C54.8217 67.24 54.495 67.58 54.255 68.02C54.015 68.46 53.895 68.9933 53.895 69.62C53.895 70.2333 54.015 70.7667 54.255 71.22C54.495 71.66 54.8217 72 55.235 72.24C55.6483 72.48 56.115 72.6 56.635 72.6Z"
        fill="white" />
    </svg>
  </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted} from 'vue'
import GenderBarChart from '../../components/chart/GenderBarChart.vue'
import LanguageBarChart from '../../components/chart/LanguageBarChart.vue'
import { useI18n } from 'vue-i18n'




const { t } = useI18n();
const schools = ref([])
const recommendedSchools = ref([[], [], []])  // Recommended schools for each search input
const searchQueries = ref(['', '', ''])  // Search query for each input box
const allSchools = ref([])  // All schools data
const pendingRemoveIndex = ref(null)
const showConfirm = ref(false)

const toastMessage = ref('')
const toastType = ref('success')
const showToast = ref(false)



const showModal = ref(null)

function goBack() {
  window.history.back()
}




const toggleModal = (modalType) => {
  if (showModal.value === modalType) {
    showModal.value = null;
  } else {
    showModal.value = modalType;
  }
};

const searchCompareSchools = async (index) => {
  const input = searchQueries.value[index - 1].trim().toLowerCase()

  if (!input || input.length < 3) {
    recommendedSchools.value[index - 1] = []  // Clear results if input is empty
    return
  }

  if (!allSchools.value.length) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/schools`)

      const data = await res.json()
      allSchools.value = data
    } catch (err) {
      console.error('Failed to fetch schools:', err)
      return
    }
  }

  // Filter recommended schools for this specific search query
  recommendedSchools.value[index - 1] = allSchools.value.filter(s => {
    const name = (s.School_Name || '').toLowerCase()
    return name.includes(input)  // Check for name match
  }).slice(0, 8)
}

const selectRecommended = (item, index) => {
  searchQueries.value[index - 1] = item.School_Name  // Set selected school name to the input field
  recommendedSchools.value[index - 1] = []  // Clear recommendations
}

const triggerToast = (messageKey, type = 'success', params = {}) => {
  toastMessage.value = t(messageKey, params)
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const addToCompare = async (index) => {
  const selectedSchoolName = searchQueries.value[index - 1]

  if (!selectedSchoolName) {
    triggerToast('messages.toast.error.noSchoolSelected', 'error')
    return
  }

  const selectedSchool = allSchools.value.find(s => s.School_Name === selectedSchoolName)

  if (!selectedSchool) {
    triggerToast('messages.toast.error.schoolNotFound', 'error')
    return
  }

  if (schools.value.find(s => s.name === selectedSchool.School_Name)) {
    triggerToast('messages.toast.error.alreadyAdded', 'error')
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/school/${selectedSchool.School_AGE_ID}`)
    const detailed = await res.json()

    const formatted = {
      name: detailed.School_Name || t('messages.school.na'),
      type: detailed.School_Sector || t('messages.school.na'),
      yearRange: detailed.Year_Range || t('messages.school.na'),
      languageProgram: Array.isArray(detailed.languages) ?
        detailed.languages.join(', ') :
        detailed.languageProgram || t('messages.school.none'),
      staffPerStudent: detailed.Teaching_staff_per_student || t('messages.school.na'),
      totalEnrolment: detailed.Total_Enrolment || t('messages.school.na'),
      studentLanguageBackground: detailed.Language_Flag || t('messages.school.na'),
      icsea: detailed.ICSEA || t('messages.school.na'),
      english: Number(detailed.English) || 0,
      notEnglish: Number(detailed.not_English) || 0,
      notStated: Number(detailed.not_stated) || 0,
      Girls_Enrolment: Number(detailed.Girls_Enrolment) || 0,
      Boys_Enrolment: Number(detailed.Boys_Enrolment) || 0,
      languageProgramArr: Array.isArray(detailed.languages) ?
        detailed.languages :
        (detailed.languageProgram ? [detailed.languageProgram] : []),
      url: detailed.School_URL || '',
      suburb: detailed.Suburb || t('messages.school.na'),
      postcode: detailed.Postcode || t('messages.school.na')
    }

    schools.value.push(formatted)
    const stored = JSON.parse(sessionStorage.getItem('compareList') || '[]')
    stored.push(formatted)
    sessionStorage.setItem('compareList', JSON.stringify(stored))
    // Trigger update event
    window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: stored }))
    searchQueries.value[index - 1] = ''  // Clear the input field after adding
    triggerToast('messages.toast.success.schoolAdded', 'success')
  } catch (err) {
    console.error('Failed to fetch detailed school data:', err)
    triggerToast('messages.toast.error.fetchFailed', 'error')
  }
}

const confirmRemove = () => {
  const index = pendingRemoveIndex.value
  if (index !== null && index >= 0 && index < schools.value.length) {
    schools.value.splice(index, 1)
    const stored = sessionStorage.getItem('compareList')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        parsed.splice(index, 1)
        sessionStorage.setItem('compareList', JSON.stringify(parsed))
        // Trigger update event
        window.dispatchEvent(new CustomEvent('compareListUpdated', { detail: parsed }))
      } catch (err) {
        console.error('Failed to update compareList in sessionStorage:', err)
      }
    }
  }
  showConfirm.value = false
  pendingRemoveIndex.value = null
}

const cancelRemove = () => {
  showConfirm.value = false
  pendingRemoveIndex.value = null
}

const removeSchool = (index) => {
  pendingRemoveIndex.value = index
  showConfirm.value = true
}

const formatNumber = (value) => {
  const num = parseFloat(value)
  return isNaN(num) ? 'N/A' : num.toFixed(2)
}

onMounted(() => {
  const stored = sessionStorage.getItem('compareList')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      schools.value = parsed.slice(0, 3).map(item => ({
        name: item.name || item.School_Name,
        type: item.type || item.School_Sector,
        yearRange: item.yearRange || item.Year_Range,
        languageProgram: item.languageProgram || item.languageProgram || item.languageProgramArr,
        staffPerStudent: item.staffPerStudent || item.Teaching_staff_per_student,
        totalEnrolment: item.totalEnrolment || item.Total_Enrolment,
        studentLanguageBackground: item.studentLanguageBackground,
        icsea: item.icsea || item.ICSEA,
        english: Number(item.english ?? item.English ?? 0),
        notEnglish: Number(item.notEnglish ?? item.not_English ?? 0),
        notStated: Number(item.notStated ?? item.not_stated ?? 0),
        Girls_Enrolment: Number(item.Girls_Enrolment ?? 0),
        Boys_Enrolment: Number(item.Boys_Enrolment ?? 0),
        languageProgramArr: item.languageProgramArr || item.languages || [],
        url: item.url || item.School_URL || '',
        suburb: item.suburb || item.Suburb || '',
        postcode: item.postcode || item.Postcode || '',
      }))
    } catch (err) {
      console.error('Failed to parse compareList from sessionStorage:', err)
    }
  }

   window.addEventListener('scroll', handleScroll)
})


const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


</script>

<style scoped>
svg:hover+div {
  opacity: 1;
  pointer-events: auto;
}
</style>