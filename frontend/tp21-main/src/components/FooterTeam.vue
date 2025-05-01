<!-- /**
  Footer.vue
 
  Description:
    Renders the global page footer, including localized acknowledgment message.
 / -->
 
<template>
    <!-- Footer -->
    <footer class="py-8 px-6 md:px-12 lg:px-24 bg-white border-t  border-gray-400">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start">
                <div class="mb-6 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    </svg>
                </div>
            </div>

            <div class="mt-8 text-sm text-gray-600">
                <p>{{ $t('footer.acknowledgment') }}</p>
            </div>
        </div>
    </footer>
</template>