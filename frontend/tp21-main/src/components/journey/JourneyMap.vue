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
            <div class="card-front">
              <img :src="stage.icon" :alt="stage.title + ' icon'" class="flat-icon" />
              <div class="flat-title">{{ stage.title }}</div>
              <div class="flat-age">{{ stage.age }}</div>
              <div class="flat-desc">{{ stage.desc }}</div>
              <button class="question-button">Enrolment Checklist</button>
            </div>

            <div class="card-back">
              <div>
                <strong>What they learn:</strong>
                <ul>
                  <li v-for="(detail, idx) in stage.whatTheyLearn" :key="idx">
                    {{ detail }}
                  </li>
                </ul>
                <strong>Key timing:</strong>
                <ul>
                  <li v-for="(detail, idx) in stage.keyTiming" :key="idx">
                    {{ detail }}
                  </li>
                </ul>
              </div>
              <button class="back-button" @click.stop="flipCard(index)">
                Related questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import kinderIcon from '@/assets/images/kinder.svg'
import primaryIcon from '@/assets/images/primary.svg'
import secondaryIcon from '@/assets/images/secondary.svg'
import vocationalIcon from '@/assets/images/vocational.svg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    icon: vocationalIcon,
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

<style scoped>
ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}

.w-half {
  width: 15%;
}

/* 基本容器样式 */
.journey-container {
  max-width: 1300px;
  margin: 40px auto;
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.04);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.journey-intro {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.journey-title {
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.journey-subtitle {
  color: #64748b;
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

/* 袋鼠角色和对话框 */
.kangaroo-guide {
  position: absolute;
  bottom: 10px;
  left: 20px;
  width: 80px;
  height: 100px;
  z-index: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.kangaroo-guide:hover {
  transform: translateY(-5px);
}

.speech-bubble {
  position: absolute;
  left: 100px;
  bottom: 60px;
  max-width: 220px;
  background: #fff;
  border: 2px solid #2563eb;
  border-radius: 16px;
  padding: 10px 15px;
  font-size: 0.9rem;
  color: #334155;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 100;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  left: -10px;
  bottom: 15px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #2563eb;
}

.kangaroo-guide:hover+.speech-bubble,
.speech-bubble.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.tutorial-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.1rem 6rem;
  margin: 1rem auto;
  max-width: 550px;
  color: #64748b;
  font-size: 0.9rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  animation: pulse 2s infinite;
  height: 60px;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.02);
  }

  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

.timeline-container {
  position: relative;
  margin: 2rem 0 1rem 0;
  padding: 1rem 0;
}

.timeline-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-button {
  background: #e2e8f0;
  color: #2563eb;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.nav-button:hover {
  background: #2563eb;
  color: #fff;
  transform: scale(1.05);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.flat-timeline {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  position: relative;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 1rem 0.5rem;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  transition: all 0.5s ease;
}

.flat-timeline::-webkit-scrollbar {
  display: none;
}

/* 连接线 */
.flat-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  height: 4px;
  background: #e2e8f0;
  z-index: 0;
  border-radius: 4px;
}

/* 卡片样式 */
.flat-step {
  flex: 0 0 300px;
  width: 260px;
  height: 550px;
  border-radius: 16px;
  display: flex;
  align-items: stretch;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.04);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 2.5px solid transparent;
  perspective: 1000px;
  z-index: 1;
  animation: cardFadeIn 0.8s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes cardFadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.flat-step:hover,
.flat-step:focus {
  box-shadow: 0 8px 24px 0 rgba(37, 99, 235, 0.15);
  border-color: #2563eb;
  z-index: 2;
  transform: translateY(-8px);
}

/* 卡片内外部容器，用于翻转效果 */
.card-container {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card-container.flipped {
  transform: rotateY(180deg);
}

.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem 1.2rem 1rem;
}

.card-front {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem 1.2rem 1rem;
  background: inherit;
}

.card-back {
  transform: rotateY(180deg);
  background: inherit;
}

.card-back li {
  line-height: 1.2;
  margin-bottom: 0.3rem;
}

.flat-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.step-number {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 28px;
  height: 28px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.flat-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 0.4em;
  text-align: center;
  width: 100%;
  padding: 0 0.5rem;
  margin-left: auto;
  margin-right: auto;
}

.flat-age {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 0.3em;
  text-align: center;
  width: 100%;
  padding: 0 0.5rem;
  margin-left: auto;
  margin-right: auto;
}

.flat-type {
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 0.7em;
  text-align: center;
  width: 100%;
  padding: 0 0.5rem;
  margin-left: auto;
  margin-right: auto;
}

.flat-desc {
  white-space: pre-line;
  font-size: 0.9rem;
  color: #334155;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 0.7em 1em;
  margin: 1em auto 0;
  height: 260px;
  text-align: left;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.03);
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* 问题按钮 */
.question-button {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 5;
}

.question-button:hover {
  background: #e2e8f0;
  color: #2563eb;
}

/* 详情内容样式 */
.detail-section {
  width: 90%;
  text-align: left;
  overflow-y: auto;
  max-height: 230px;
  margin: 0 auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.detail-section::-webkit-scrollbar {
  width: 6px;
}

.detail-section::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.detail-section::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 6px;
  border: 2px solid #f1f5f9;
}

.detail-title {
  font-weight: 600;
  margin: 0.5rem 0;
  color: #1e40af;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.detail-title i {
  margin-right: 6px;
  font-size: 1.1rem;
}

.detail-content {
  font-size: 0.92rem;
  color: #475569;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.back-button {
  margin-top: auto;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

/* 扁平色块 */
.early {
  background: #e0f2fe;
}

.primary {
  background: #fef9c3;
}

.secondary {
  background: #fce7f3;
}

.tertiary {
  background: #e0e7ff;
}

/* 响应式 */
@media (max-width: 900px) {
  .flat-timeline {
    gap: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .flat-step {
    flex: 0 0 240px;
    width: 240px;
    height: 390px;
  }

  .kangaroo-guide {
    width: 60px;
    height: 90px;
  }

  .speech-bubble {
    left: 80px;
    max-width: 180px;
    font-size: 0.85rem;
  }

  .flat-desc {
    font-size: 0.85rem;
    height: 75px;
  }

  .detail-content {
    font-size: 0.9rem;
  }

  .flat-title {
    font-size: 1.1rem;
  }

  .flat-age {
    font-size: 0.95rem;
  }

  .flat-type {
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .journey-container {
    padding: 1.5rem 0.5rem;
  }

  .timeline-container {
    margin: 1rem 0;
  }

  .flat-timeline {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    overflow-x: visible;
  }

  .flat-timeline::before {
    display: none;
  }

  .flat-step {
    width: 90%;
    max-width: 320px;
    flex: none;
    height: 370px;
  }

  .flat-desc {
    width: 95%;
    height: 70px;
    margin-top: 0.5em;
  }

  .timeline-nav {
    display: none;
  }

  .speech-bubble {
    left: 70px;
    bottom: 50px;
    max-width: 160px;
  }

  .card-front,
  .card-back {
    padding: 1.2rem 0.8rem 1rem 0.8rem;
  }
}
</style>
