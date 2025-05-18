<!-- /**
  JourneyMap.vue

  Description:
    Renders a horizontally scrollable educational journey map with interactive cards representing each stage of learning.
    Each card provides key information about age ranges, milestones, and what children learn at that stage.
    Includes kangaroo guide tips, stage-specific checklists, and related Q&A popup modals.

  Key Features:
    - Scrollable timeline with four key education stages: early, primary, secondary, tertiary
    - Interactive cards with front/back flipping animations showing milestone and learning info
    - Animated kangaroo guide with context-sensitive speech bubbles
    - Buttons to open checklists and related questions (both in modal overlays)
    - Timeline navigation via buttons or drag/swipe
    - Auto-scroll to timeline on first load, with restore logic when returning from question detail
    - Responsive design with bilingual support via vue-i18n
 / -->
 
<template>
  <div class="journey-container">
    <div class="journey-intro">
      <!-- tap hint -->
      <div class="tutorial-hint">
        <img src="@/assets/images/tap.png" alt="tap icon" class="w-half h-auto" />
        <span>{{ $t('journeyMap.journey.tutorialHint') }}</span>
      </div>
      <!-- Kangaroo guide -->
      <div class="kangaroo-guide" @click="toggleSpeech">
        <img src="@/assets/images/kangaroo.png" alt="kangaroo photo" class="width: 110px; height: 100px;" />
        <div class="speech-bubble" :class="{ 'active': speechActive }">{{ currentSpeech }}</div>
      </div>
    </div>

    <!-- Timeline with navigation -->
    <div class="timeline-container">
      <!-- nav-button -->
      <button
        class="nav-button absolute left-0 top-1/3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="isScrollStart" @click="scrollTimeline(-1)">
        <span class="w-2 h-2 border-t-2 border-l-2 border-gray-500 rotate-[-45deg]"></span>
      </button>
      <button
        class="nav-button absolute right-0 top-1/3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="isScrollEnd" @click="scrollTimeline(1)">
        <span class="w-2 h-2 border-t-2 border-l-2 border-gray-500 rotate-[135deg]"></span>
      </button>

      <div class="flat-timeline" ref="timeline" @scroll="checkScrollPosition" @mousedown="startDrag" @mousemove="onDrag"
        @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag">
        <div v-for="(stage, index) in stages" :key="index"
          :class="['flat-step', stage.class, { 'animate-in': !isRestoredFromArticle }]" @click="flipCard(index)"
          :style="getAnimationStyle(index)">

          <div class="step-number">{{ index + 1 }}</div>
          <div class="card-container" :class="{ 'flipped': flippedCards[index] }">

            <!-- card front -->
            <div class="card-front" :class="{ 'non-interactive': flippedCards[index] }">
              <div class="icons-container">
                <div class="icon-wrapper" v-for="(icon, i) in (Array.isArray(stage.icon) ? stage.icon : [stage.icon])"
                  :key="i">
                  <div class="flat-icon" :class="stage.class">
                    <img :src="icon" :alt="stage.title + ' icon'" class="svg-icon" />
                  </div>
                </div>
              </div>
              <div class="flat-title mt-1">{{ stage.title }}</div>
              <div class="flat-age">{{ stage.age }}</div>
              <div class="flat-desc" v-html="stage.desc"></div>
              <!-- Checklist -->
              <button class="back-button" @click="openChecklist(stage.class); $event.stopPropagation()">
                {{ $t('journeyMap.cardFront.checklistButton') }}</button>
            </div>

            <!-- card back -->
            <div class="card-back">
              <div>
                <strong>{{ $t('journeyMap.cardBack.whatTheyLearn') }}</strong>
                <ul>
                  <li v-for="(detail, idx) in stage.whatTheyLearn" :key="idx">{{ detail }}</li>
                </ul>

                <strong>{{ $t('journeyMap.cardBack.keyTiming') }}</strong>
                <ul>
                  <li v-for="(detail, idx) in stage.keyTiming" :key="idx">{{ detail }}</li>
                </ul>
              </div>
              <button class="question-button" @click.stop="openRelatedQuestions(index)">
                {{ $t('journeyMap.cardBack.relatedQuestions') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CheckList :visible="showChecklist" :id="schoolTypeId" :title="currentTitle" :checklist="currentChecklist"
    @close="closeChecklist" />
  <QuestionList :visible="showQuestionList" :title="questionTitle" :questions="questionList"
    @close="showQuestionList = false" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import kinderIcon from '@/assets/images/kinder.svg'
import primaryIcon from '@/assets/images/primary.svg'
import secondaryIcon from '@/assets/images/secondary.svg'
import vocationalIcon from '@/assets/images/vocational.svg'
import higherIcon from '@/assets/images/higher.svg'
import '../../assets/journey.css'
import CheckList from './CheckList.vue'
import QuestionList from './QuestionList.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const route = useRoute()
const { t } = useI18n()

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

// Kangaroo speech defaults
const kangarooDefault = computed(() => t('journeyMap.journey.kangarooGuide'))

const isRestoredFromArticle = ref(false)

const getAnimationStyle = (index) =>
  !isRestoredFromArticle.value ? { animationDelay: `${index * 0.2}s` } : {}

// Methods
const toggleSpeech = () => {
  speechActive.value = !speechActive.value
  if (speechActive.value) {
    currentSpeech.value = kangarooDefault
  }
}

function updateSpeechBubble(idx) {
  const tip = stages.value[idx]?.kangarooTip
  currentSpeech.value = tip || kangarooDefault
  speechActive.value = true
}

const flipCard = (index) => {
  updateSpeechBubble(index)
  flippedCards.value[index] = !flippedCards.value[index]
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
  isRestoredFromArticle.value = route.query.from === 'questionList'
  currentSpeech.value = kangarooDefault
  toggleSpeech()
  window.addEventListener('resize', checkScrollPosition)

  const smoothScrollTo = (targetY, duration) => {
    const startY = window.scrollY || document.documentElement.scrollTop;
    const distance = targetY - startY;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };
  // ✅ 仅首次进入页面时才执行平滑滚动
  if (!isRestoredFromArticle.value) {
    smoothScrollTo(230, 500)
  }
  checkScrollPosition()

  // ✅ 如果是从文章详情页返回，恢复弹窗
  if (isRestoredFromArticle.value && route.query.title) {
    questionTitle.value = route.query.title
    const stage = stages.value.find(
      stage => t(`journeyMap.relatedQuestions.${stage.class}.title`) === route.query.title
    )
    if (stage) {
      openRelatedQuestions(stages.value.indexOf(stage))
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScrollPosition)
})

// Education stages
const stages = computed(() => [
  {
    class: 'early',
    title: t('journeyMap.stages.early.title'),
    age: t('journeyMap.stages.early.age'),
    desc: t('journeyMap.stages.early.desc'),
    icon: kinderIcon,
    whatTheyLearn: [
      t('journeyMap.stages.early.whatTheyLearn.0'),
      t('journeyMap.stages.early.whatTheyLearn.1'),
      t('journeyMap.stages.early.whatTheyLearn.2'),
    ],
    keyTiming: [
      t('journeyMap.stages.early.keyTiming.0'),
      t('journeyMap.stages.early.keyTiming.1'),
      t('journeyMap.stages.early.keyTiming.2'),
    ],
    kangarooTip: t('journeyMap.stages.early.kangarooTip'),
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
    kangarooTip: t('journeyMap.stages.primary.kangarooTip'),
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
    kangarooTip: t('journeyMap.stages.secondary.kangarooTip'),
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
    kangarooTip: t('journeyMap.stages.tertiary.kangarooTip'),
  }
])

// QuestionList
const showQuestionList = ref(false)
const questionList = ref([])
const questionTitle = ref('')

function openRelatedQuestions(index) {
  const stage = stages.value[index]
  if (!stage) return
  const type = stage.class

  if (type === 'early') {
    questionTitle.value = t('journeyMap.relatedQuestions.early.title');
    questionList.value = [
      { title: t('journeyMap.relatedQuestions.early.q1'), id: 35 },
      { title: t('journeyMap.relatedQuestions.early.q2'), id: 36 }
    ];
  } else if (type === 'primary') {
    questionTitle.value = t('journeyMap.relatedQuestions.primary.title');
    questionList.value = [
      { title: t('journeyMap.relatedQuestions.primary.q1'), id: 7 },
      { title: t('journeyMap.relatedQuestions.primary.q2'), id: 25 },
      { title: t('journeyMap.relatedQuestions.primary.q3'), id: 30 }
    ];
  } else if (type === 'secondary') {
    questionTitle.value = t('journeyMap.relatedQuestions.secondary.title');
    questionList.value = [
      { title: t('journeyMap.relatedQuestions.secondary.q1'), id: 26 },
      { title: t('journeyMap.relatedQuestions.secondary.q2'), id: 27 }
    ];
  } else if (type === 'tertiary') {
    questionTitle.value = t('journeyMap.relatedQuestions.tertiary.title');
    questionList.value = [
      { title: t('journeyMap.relatedQuestions.tertiary.q1'), id: 37 },
      { title: t('journeyMap.relatedQuestions.tertiary.q2'), id: 38 }
    ];
  }

  showQuestionList.value = true;
}


// CheckList
const showChecklist = ref(false);
const currentChecklist = ref([]);
const currentTitle = ref('');
const schoolTypeId = ref();

function openChecklist(type) {
  if (type === 'early') {
    schoolTypeId.value = 0;
    currentTitle.value = t('journeyMap.checklist.early.title');
    currentChecklist.value = [
      t('journeyMap.checklist.early.items.0'),
      t('journeyMap.checklist.early.items.1'),
      t('journeyMap.checklist.early.items.2'),
      t('journeyMap.checklist.early.items.3'),
      t('journeyMap.checklist.early.items.4'),
      t('journeyMap.checklist.early.items.5'),
      t('journeyMap.checklist.early.items.6'),
      t('journeyMap.checklist.early.items.7'),
    ];
  } else if (type === 'primary') {
    schoolTypeId.value = 1;
    currentTitle.value = t('journeyMap.checklist.primary.title');
    currentChecklist.value = [
      t('journeyMap.checklist.primary.items.0'),
      t('journeyMap.checklist.primary.items.1'),
      t('journeyMap.checklist.primary.items.2'),
      t('journeyMap.checklist.primary.items.3'),
      t('journeyMap.checklist.primary.items.4'),
      t('journeyMap.checklist.primary.items.5'),
      t('journeyMap.checklist.primary.items.6'),
      t('journeyMap.checklist.primary.items.7'),
    ];
  } else if (type === 'secondary') {
    schoolTypeId.value = 2;
    currentTitle.value = t('journeyMap.checklist.secondary.title');
    currentChecklist.value = [
      t('journeyMap.checklist.secondary.items.0'),
      t('journeyMap.checklist.secondary.items.1'),
      t('journeyMap.checklist.secondary.items.2'),
      t('journeyMap.checklist.secondary.items.3'),
      t('journeyMap.checklist.secondary.items.4'),
      t('journeyMap.checklist.secondary.items.5'),
      t('journeyMap.checklist.secondary.items.6'),
      t('journeyMap.checklist.secondary.items.7'),
    ];
  } else if (type === 'tertiary') {
    schoolTypeId.value = 3;
    currentTitle.value = t('journeyMap.checklist.tertiary.title');
    currentChecklist.value = [
      t('journeyMap.checklist.tertiary.items.0'),
      t('journeyMap.checklist.tertiary.items.1'),
      t('journeyMap.checklist.tertiary.items.2'),
      t('journeyMap.checklist.tertiary.items.3'),
      t('journeyMap.checklist.tertiary.items.4'),
    ];
  }
  showChecklist.value = true;
}

function closeChecklist() {
  showChecklist.value = false;
}
</script>
