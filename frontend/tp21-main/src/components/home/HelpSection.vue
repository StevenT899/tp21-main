<template>
  <section class="py-12 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div class="bg-white p-6 rounded-lg shadow-lg">
              <img src="@/assets/images/help1.jpg" alt="help photo" class="w-full h-auto" />
          </div>
          <div>
              <h2 class="text-2xl font-bold text-gray-700 mb-6">{{ $t('helpSection.title') }}</h2><br>
              <p class="text-xl text-gray-700 mb-4">
                  {{ $t('helpSection.paragraph1') }}
              </p>
              <br>
              <p class="text-right italic font-medium">{{ $t('helpSection.signature') }}</p>
          </div>
      </div>
  </section>
</template>
  