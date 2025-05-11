<template>
    <div v-if="visible"
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button @click="close" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 text-2xl">
                &times;
            </button>
            <h2 class="text-xl font-semibold mb-4">{{ title }} Enrolment Checklist</h2>
            <p class="text-gray-700 mb-4">Tick the items you've prepared:</p>
            <ul class="text-left space-y-2">
                <li v-for="(item, index) in checklist" :key="index" class="flex items-center space-x-2">
                    <input type="checkbox" v-model="checkedItems[index]" class="accent-blue-500" />
                    <label>{{ item }}</label>
                </li>
            </ul>
            <button @click="close" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                Done
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
    visible: Boolean,
    title: String,
    checklist: Array
});
const emit = defineEmits(['close']);

const checkedItems = ref([]);

watch(
    () => props.checklist,
    (newList) => {
        checkedItems.value = newList.map(() => false);
    },
    { immediate: true }
);

function close() {
    emit('close');
}
</script>

<style scoped>
input[type='checkbox'] {
    transform: scale(1.1);
}
</style>
