<template>
    <div v-if="visible"
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button @click="close"
                class="absolute top-2 right-3 text-gray-600 hover:text-red-400 text-3xl cursor-pointer">
                &times;
            </button>
            <h2 class="text-2xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
                <span class="text-xl">❓</span> {{ title }} FAQs
            </h2>
            <div class="space-y-3">
                <div v-for="(q, idx) in questions" :key="idx"
                    class="bg-gray-50 hover:bg-gray-100 text-gray-800 text-base rounded-lg px-4 py-3 shadow cursor-pointer transition duration-200"
                    @click="goToArticle(q.id)">
                    {{ q.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    visible: Boolean,
    title: String,
    questions: Array
})

const emit = defineEmits(['close'])
const close = () => emit('close')

function goToArticle(id) {
    router.push({
        name: 'ArticleDetail',
        params: { id },
        query: {
            from: 'questionList',
            title: props.title
        }
    })
    close()
}
</script>
