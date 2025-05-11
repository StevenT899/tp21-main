<template>
  <div class="journey-container">
    <div class="journey-intro">
      <h2 class="journey-title">{{ $t('journeyMap.journey.title') }}</h2>
      <p class="journey-subtitle">{{ $t('journeyMap.journey.subtitle') }}</p>

      <!-- Kangaroo guide -->
      <div class="kangaroo-guide" @click="toggleSpeech">
        <img src="@/assets/images/kangaroo.png" alt="kangaroo photo" class="w-full h-auto" />
      </div>
      <div class="speech-bubble" :class="{ 'active': speechActive }">
        {{ currentSpeech }}
      </div>

      <div class="tutorial-hint">
        <img src="@/assets/images/tap.png" alt="tap icon" class="w-half h-auto" />
        <span>{{ $t('journeyMap.journey.tutorialHint') }}</span>
      </div>
    </div>

    <!-- Timeline with navigation -->
    <div class="timeline-container">
      <div class="timeline-nav flex space-x-2">
        <button
          class="nav-button w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="isScrollStart" @click="scrollTimeline(-1)">
          <span class="w-2 h-2 border-t-2 border-l-2 border-gray-500 rotate-[-45deg]"></span>
        </button>
        <button
          class="nav-button w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="isScrollEnd" @click="scrollTimeline(1)">
          <span class="w-2 h-2 border-t-2 border-l-2 border-gray-500 rotate-[135deg]"></span>
        </button>
      </div>

      <div class="flat-timeline" ref="timeline" @scroll="checkScrollPosition" @mousedown="startDrag" @mousemove="onDrag"
        @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag">
        <div v-for="(stage, index) in stages" :key="index" class="flat-step" :class="stage.class" tabindex="0"
          @click="flipCard(index)" :style="{ animationDelay: index * 0.2 + 's' }">

          <div class="step-number">{{ index + 1 }}</div>
          <div class="card-container" :class="{ 'flipped': flippedCards[index] }">

            <!-- card front -->
            <div class="card-front">
              <div class="icons-container">
                <img v-for="(icon, i) in (Array.isArray(stage.icon) ? stage.icon : [stage.icon])" :key="i" :src="icon"
                  :alt="stage.title + ' icon'" class="flat-icon" />
              </div>
              <div class="flat-title">{{ stage.title }}</div>
              <div class="flat-age">{{ stage.age }}</div>
              <div class="flat-desc" v-html="stage.desc"></div>
              <!-- Checklist -->
              <button class="question-button" @click="openChecklist(stage.class); $event.stopPropagation()">Enrolment Checklist</button>
            </div>

            <!-- card back -->
            <div class="card-back">
              <div>
                <strong>What they learn:</strong>
                <ul>
                  <li v-for="(detail, idx) in stage.whatTheyLearn" :key="idx">{{ detail }}</li>
                </ul>

                <strong>Key timing:</strong>
                <ul>
                  <li v-for="(detail, idx) in stage.keyTiming" :key="idx">{{ detail }}</li>
                </ul>
              </div>
              <button class="back-button" @click="openRelatedQuestions(index); $event.stopPropagation()">
                Related questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CheckList :visible="showChecklist" :title="currentTitle" :checklist="currentChecklist" @close="closeChecklist" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import kinderIcon from '@/assets/images/kinder.svg'
import primaryIcon from '@/assets/images/primary.svg'
import secondaryIcon from '@/assets/images/secondary.svg'
import vocationalIcon from '@/assets/images/vocational.svg'
import higherIcon from '@/assets/images/higher.svg'
import '../../assets/journey.css'
import CheckList from './CheckList.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function openRelatedQuestions(index) {
  // 这里可以添加逻辑来设置与相关问题相关的数据
  // 例如，设置一个新的弹窗内容
  // 目前仅做示例，弹出一个简单的提示
  console.log(`打开与第 ${index + 1} 个阶段相关的问题`);
}

// CheckList
const showChecklist = ref(false);
const currentChecklist = ref([]);
const currentTitle = ref('');

function openChecklist(type) {
  if (type === 'early') {
    currentTitle.value = 'University';
    currentChecklist.value = [
      'Application form',
      'Academic transcripts',
      'ID/passport',
      'Personal statement',
      'Letters of recommendation',
    ];
  } else if (type === 'primary') {
    currentTitle.value = 'TAFE';
    currentChecklist.value = [
      'Application form',
      'Proof of age',
      'Resume (if needed)',
      'Previous qualifications',
    ];
  } else if (type === 'secondary') {
    currentTitle.value = 'TAFE';
    currentChecklist.value = [
      'Application form',
      'Proof of age',
      'Resume (if needed)',
      'Previous qualifications',
    ];
  } else if (type === 'tertiary') {
    currentTitle.value = 'TAFE';
    currentChecklist.value = [
      'Application form',
      'Proof of age',
      'Resume (if needed)',
      'Previous qualifications',
    ];
  }
  showChecklist.value = true;
}

function closeChecklist() {
  showChecklist.value = false;
}


// Kangaroo speech defaults
const kangarooDefault = t('journeyMap.journey.kangarooGuide')

// Education stages
const stages = [
  {
    class: 'early',
    title: t('journeyMap.stages.early.title'),
    age: t('journeyMap.stages.early.age'),
    desc: t('journeyMap.stages.early.desc'),
    icon: kinderIcon,
    whatTheyLearn: [
      t('journeyMap.stages.early.whatTheyLearn.0'),
      t('journeyMap.stages.early.whatTheyLearn.1'),
    ],
    keyTiming: [
      t('journeyMap.stages.early.keyTiming.0'),
      t('journeyMap.stages.early.keyTiming.1'),
      t('journeyMap.stages.early.keyTiming.2'),
    ],
  },
  {
    class: 'primary',
    title: t('journeyMap.stages.primary.title'),
    age: t('journeyMap.stages.primary.age'),
    desc: t('journeyMap.stages.primary.desc'),
    icon: primaryIcon,
    whatTheyLearn: [
      t('journeyMap.stages.primary.whatTheyLearn.0'),
      t('journeyMap.stages.primary.whatTheyLearn.1'),
    ],
    keyTiming: [
      t('journeyMap.stages.primary.keyTiming.0'),
      t('journeyMap.stages.primary.keyTiming.1'),
      t('journeyMap.stages.primary.keyTiming.2'),
      t('journeyMap.stages.primary.keyTiming.3'),
    ],
  },
  {
    class: 'secondary',
    title: t('journeyMap.stages.secondary.title'),
    age: t('journeyMap.stages.secondary.age'),
    desc: t('journeyMap.stages.secondary.desc'),
    icon: secondaryIcon,
    whatTheyLearn: [
      t('journeyMap.stages.secondary.whatTheyLearn.0'),
      t('journeyMap.stages.secondary.whatTheyLearn.1'),
      t('journeyMap.stages.secondary.whatTheyLearn.2'),
    ],
    keyTiming: [
      t('journeyMap.stages.secondary.keyTiming.0'),
      t('journeyMap.stages.secondary.keyTiming.1'),
      t('journeyMap.stages.secondary.keyTiming.2'),
    ],
  },
  {
    class: 'tertiary',
    title: t('journeyMap.stages.tertiary.title'),
    age: t('journeyMap.stages.tertiary.age'),
    desc: t('journeyMap.stages.tertiary.desc'),
    icon: [higherIcon, vocationalIcon],
    whatTheyLearn: [
      t('journeyMap.stages.tertiary.whatTheyLearn.0'),
      t('journeyMap.stages.tertiary.whatTheyLearn.1'),
    ],
    keyTiming: [
      t('journeyMap.stages.tertiary.keyTiming.0'),
      t('journeyMap.stages.tertiary.keyTiming.1'),
      t('journeyMap.stages.tertiary.keyTiming.2'),
    ],
  }
]

// UI state
const flippedCards = ref([false, false, false, false])
const speechActive = ref(false)
const currentSpeech = ref('')
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const isScrollStart = ref(true)
const isScrollEnd = ref(false)
const timeline = ref(null)

// Methods
const toggleSpeech = () => {
  speechActive.value = !speechActive.value
  if (speechActive.value) {
    currentSpeech.value = kangarooDefault
    setTimeout(() => { speechActive.value = false }, 5000)
  }
}

const updateSpeechBubble = (idx) => {
  currentSpeech.value = stages[idx].kangarooTip || kangarooDefault
  speechActive.value = true
  setTimeout(() => { speechActive.value = false }, 5000)
}

const flipCard = (index) => {
  if (!flippedCards.value[index]) updateSpeechBubble(index)
  flippedCards.value = flippedCards.value.map((v, i) => i === index ? !v : false)
}


// scrolling section
const scrollTimeline = (dir) => {
  const w = 292
  timeline.value.scrollLeft += dir * w * 2
  checkScrollPosition()
}
const checkScrollPosition = () => {
  isScrollStart.value = timeline.value.scrollLeft <= 10
  isScrollEnd.value = timeline.value.scrollLeft + timeline.value.clientWidth >= timeline.value.scrollWidth - 10
}
const startDrag = (e) => {
  isDragging.value = true
  startX.value = e.pageX || e.touches[0].pageX
  scrollLeft.value = timeline.value.scrollLeft
}
const onDrag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const x = e.pageX || e.touches[0].pageX
  timeline.value.scrollLeft = scrollLeft.value - (x - startX.value) * 2
  checkScrollPosition()
}
const endDrag = () => {
  isDragging.value = false
}


// Lifecycle hooks
onMounted(() => {
  currentSpeech.value = kangarooDefault
  window.addEventListener('resize', checkScrollPosition)
  checkScrollPosition()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScrollPosition)
})
</script>
