<template>
    <section class="max-w-3xl mx-auto py-8 px-4">
      <!-- 标题 -->
      <h2 class="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
  
      <!-- FAQ 列表 -->
      <div
        v-for="(item, idx) in faqs"
        :key="idx"
        class="border-b last:border-b-0"
      >
        <!-- 问题标题行：文本在左，图标在右 -->
        <button
  @click="toggle(idx)"
  class="w-full flex items-center justify-between py-4 focus:outline-none"
>
  <!-- 左侧：图标 + 文本，都垂直居中 -->
  <span class="flex items-center text-lg font-medium leading-tight">
    <img
      :src="schoolIcon"
      alt="School Icon"
      class="w-6 h-6 align-middle mr-2"
    />
    <span class="align-middle">{{ item.question }}</span>
  </span>

  <!-- 右侧：+ / – 图标 -->
  <svg
    v-if="item.open"
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 text-blue-600 align-middle"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 text-blue-600 align-middle"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 5v14m7-7H5"
    />
  </svg>
</button>

  
        <!-- 回答内容 -->
        <transition name="fade">
          <div
            v-if="item.open"
            class="pb-4 text-gray-700 leading-relaxed"
          >
            <p
              v-for="(line, i) in item.answer"
              :key="i"
              class="mb-2"
            >
              {{ line }}
            </p>
          </div>
        </transition>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import schoolIcon from '@/assets/images/school.png';
  
  const faqs = ref([
    {
      question: 'What types of primary schools are available in Victoria?',
      answer: [
        'Victoria has several types of primary schools:',
        '• Government (Public) Schools: Free to attend, open to everyone. Most students go to their local school, known as a Designated Neighbourhood School.',
        '• Catholic Schools: Faith-based schools often connected to local churches. Families usually pay fees, but lower than private schools.',
        '• Independent (Private) Schools: These schools set their own rules, fees, and programs. Some are faith-based, others are academic or specialist.',
        'You can choose any type of school, but spots at some schools (especially public ones) depend on where you live.'
      ],
      open: false
    },
    {
      question: 'What is a school zone and how can I find schools within my zone?',
      answer: [
        'A school zone is the geographic area around a school that defines which students have a guaranteed right to enrol.',
        'Every Victorian government school has a zone, and children who live in that zone are entitled to attend that school.',
        'You can use the official “Find My School” tool or our website to check your home’s school zone and see which schools are available to you.'
      ],
      open: false
    },
    {
      question: 'How do I enroll my child in school?',
      answer: [
        'To enrol your child, contact the school directly or visit the Department of Education website for online enrolment forms.',
        'You’ll need to provide proof of residence, birth certificate and immunisation records.'
      ],
      open: false
    },
    {
      question: 'Can I enrol my child in multiple schools simultaneously?',
      answer: [
        'No. Each child may only hold one active enrolment at a time. If you wish to transfer, you must complete the withdrawal process at the current school first.'
      ],
      open: false
    }
  ])
  
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
  