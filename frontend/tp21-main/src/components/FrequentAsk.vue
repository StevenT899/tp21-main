<template>
  <section class="max-w-3xl mx-auto py-8 px-4">

    <h2 class="text-3xl font-bold mb-6">{{ $t('supportView.frequentAskTitle') }}</h2>


    <div v-for="(item, idx) in faqs" :key="idx" class="border-b last:border-b-0">

      <button @click="toggle(idx)" class="w-full flex items-center justify-between py-4 focus:outline-none">
        <span class="flex items-center text-lg font-medium leading-tight">
          <img :src="item.icon" alt="icon" class="w-6 h-6 align-middle mr-2" />
          <span class="align-middle">{{ item.question }}</span>
        </span>
        <svg v-if="item.open" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600 align-middle" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600 align-middle" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
        </svg>
      </button>

      <transition name="fade">
        <div v-if="item.open" class="pb-4 text-gray-700 leading-relaxed">
          <p v-for="(line, i) in item.answer" :key="i" class="mb-2">
            {{ line }}
          </p>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import schoolIcon from '@/assets/images/school.png';
import q2 from '@/assets/images/q2.png';
import q3 from '@/assets/images/q3.png';
import q4 from '@/assets/images/q4.png';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const faqs = ref([])

function loadFaqs() {
  faqs.value = [
    {
      question: t('frequentAsk.faqs.0.question'),
      id: 1,
      icon: schoolIcon,
      answer: [
        t('frequentAsk.faqs.0.answer.0'),
        t('frequentAsk.faqs.0.answer.1'),
        t('frequentAsk.faqs.0.answer.2'),
        t('frequentAsk.faqs.0.answer.3'),
        t('frequentAsk.faqs.0.answer.4'),
      ],
      open: false
    },
    {
      question: t('frequentAsk.faqs.1.question'),
      id: 7,
      icon: q2,
      answer: [
        t('frequentAsk.faqs.1.answer.0'),
        t('frequentAsk.faqs.1.answer.1'),
        t('frequentAsk.faqs.1.answer.2'),
      ],
      open: false
    },
    {
      question: t('frequentAsk.faqs.2.question'),
      id: 16,
      icon: q3,
      answer: [
        t('frequentAsk.faqs.2.answer.0'),
        t('frequentAsk.faqs.2.answer.1'),
      ],
      open: false
    },
    {
      question: t('frequentAsk.faqs.3.question'),
      id: 22,
      icon: q4,
      answer: [
        t('frequentAsk.faqs.3.answer.0'),
        t('frequentAsk.faqs.3.answer.1'),
      ],
      open: false
    }
  ]
}

loadFaqs()

watch(locale, () => {
  loadFaqs()
})

function toggle(index) {
  faqs.value[index].open = !faqs.value[index].open
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>