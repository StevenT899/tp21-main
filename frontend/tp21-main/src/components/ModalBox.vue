<!-- /**
  ModalBox.vue
 
  Description:
    Renders modal dialogs for language program details, ICSEA information, and school zone descriptions.
 
  Key Features:
    - Supports three modal types: 'lp' (language program), 'icsea', and 'ss' (school zone)
    - Semi-transparent blurred backdrop overlay with centered dialog box
    - Localized titles, descriptions, and buttons via vue-i18n keys
    - Toggles visibility through the exposed `toggleModal` method
 / -->

<template>

  <div> <!-- Modal for language -->
    <div v-if="showModal === 'lp'"
      class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">

        <button @click="toggleModal('lp')" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
          &times;
        </button>

        <h2 class="text-xl font-semibold mb-4">{{ $t('ModalBox.languageProgram.title') }}</h2>
        <p class="text-lg text-gray-700 mb-6">
          {{ $t('ModalBox.languageProgram.description') }}
        </p>
        <button @click="toggleModal('languageProgram')"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {{ $t('ModalBox.languageProgram.readMore') }}
        </button>
      </div>
    </div>


    <!-- Modal for icsea -->
    <div v-if="showModal === 'icsea'"
      class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button @click="toggleModal('icsea')" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
          &times;
        </button>
        <h2 class="text-xl font-semibold mb-4">{{ $t('ModalBox.icseaModal.title') }}</h2>
        <p class="text-lg text-gray-700 mb-6">
          {{ $t('ModalBox.icseaModal.description') }}
        </p>
        <button @click="toggleModal('icsea')" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {{ $t('ModalBox.icseaModal.readMore') }}
        </button>
      </div>
    </div>
    <!-- Modal for school zone -->
    <div v-if="showModal === 'ss'"
      class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button @click="toggleModal('ss')" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
          &times;
        </button>
        <h2 class="text-xl font-semibold mb-4">{{ $t('ModalBox.schoolZone.title') }}</h2>
        <p class="text-lg text-gray-700 mb-6">
          {{ $t('ModalBox.schoolZone.description')}}
        </p>
        <button @click="toggleModal('icsea')" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {{ $t('ModalBox.schoolZone.readMore') }}
        </button>
      </div>
    </div>
  </div>

</template>


<script setup>
import { ref } from 'vue';

const showModal = ref(null);

const toggleModal = (modalType) => {
  if (showModal.value === modalType) {
    showModal.value = null;
  } else {
    showModal.value = modalType;
  }
};

defineExpose({
  toggleModal
});

function onSuggestionClick(item) {
  router.push({ name: 'ArticleDetail', params: { id: item.id } });
}

</script>
