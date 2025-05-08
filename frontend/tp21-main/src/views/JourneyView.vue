<template>
    <div class="min-h-screen bg-gray-50 p-8 mx-auto max-w-[1400px]">
    <!-- Page Header -->
        <div class="text-start mb-5">
            <h1 class="text-3xl font-semibold text-blue-600 mb-2">{{ $t('journeyView.pageHeader.title') }}</h1>
            <p class="text-lg text-gray-600">{{ $t('journeyView.pageHeader.description') }}</p>
        </div>
        <div>
            <JourneyMap/>
        </div>
    </div>
</template>

<script setup>
import JourneyMap from '@/components/journey/JourneyMap.vue';
</script>