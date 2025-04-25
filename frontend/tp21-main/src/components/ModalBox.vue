<template>

    <div>     <!-- Modal for language -->
        <div v-if="showModal === 'lp'" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        
                <button @click="toggleModal('lp')" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
                &times;
                </button>

                <h2 class="text-xl font-semibold mb-4">What is a Language Program?</h2>
                <p class="text-lg text-gray-700 mb-6">
                A language program in government primary schools offers students the opportunity to learn a language 
                other than English. These programs help students develop language skills, support cultural diversity.
                </p>
                <button @click="toggleModal('languageProgram')" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Read More
                </button>
            </div>
        </div>
        

        <!-- Modal for icsea -->
        <div v-if="showModal === 'icsea'" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
                <button @click="toggleModal('icsea')" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
                &times;
                </button>
                <h2 class="text-xl font-semibold mb-4">What is an ICSEA?</h2>
                <p class="text-lg text-gray-700 mb-6">
                    ICSEA is a number that shows the average education and income background of families at a school. 
                    It helps give context, but it’s not a score of how “good” a school is.
                </p>
                <button @click="toggleModal('icsea')" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Read More
                </button>
          </div>
      </div>   
      
    </div>
  
</template>


<script setup>
const showModal = ref(null)
const toggleModal = (modalType) => {
  if (showModal.value === modalType) {
    showModal.value = null;
  } else {
    showModal.value = modalType;
  }
};
</script>

