<template>
  <div class="journey-container">
    <div class="journey-intro">
      <h2 class="journey-title">Victorian Education Journey Map</h2>
      <p class="journey-subtitle">A Complete Education Journey from Kindergarten to University</p>

      <!-- Kangaroo guide -->
      <div class="kangaroo-guide" @click="toggleSpeech">
        <img src="@/assets/images/kangaroo.png" alt="kangaroo photo" class="w-full h-auto" />
      </div>
      <div class="speech-bubble" :class="{ 'active': speechActive }">
        {{ currentSpeech }}
      </div>

      <div class="tutorial-hint">
        <i class="material-icons">touch_app</i>
        <span>Click on each stage card for details, swipe to see more</span>
      </div>
    </div>

    <!-- Timeline with navigation -->
    <div class="timeline-container">
      <div class="timeline-nav">
        <button class="nav-button" :disabled="isScrollStart" @click="scrollTimeline(-1)">
          <i class="material-icons">chevron_left</i>
        </button>
        <button class="nav-button" :disabled="isScrollEnd" @click="scrollTimeline(1)">
          <i class="material-icons">chevron_right</i>
        </button>
      </div>

      <div class="flat-timeline" ref="timeline" @scroll="checkScrollPosition" @mousedown="startDrag" @mousemove="onDrag"
        @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag">
        <div v-for="(stage, index) in stages" :key="index" class="flat-step" :class="stage.class" tabindex="0"
          @click="flipCard(index)" :style="{ animationDelay: index * 0.2 + 's' }">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="card-container" :class="{ 'flipped': flippedCards[index] }">
            <div class="card-front">
              <div class="flat-icon" v-html="stage.icon"></div>
              <div class="flat-title">{{ stage.title }}</div>
              <div class="flat-age">{{ stage.age }}</div>
              <div class="flat-type">{{ stage.type }}</div>
              <div class="flat-desc">{{ stage.desc }}</div>

              <button class="question-button" @click.stop="openQuestionModal(index)">
                <i class="material-icons">help_outline</i> I have questions
              </button>
            </div>

            <div class="card-back">
              <div class="flat-title">{{ stage.detailTitle }}</div>
              <div class="detail-section">
                <div v-for="(detail, dIdx) in stage.details" :key="dIdx">
                  <div class="detail-title">
                    <i class="material-icons">{{ detail.icon }}</i>
                    {{ detail.title }}
                  </div>
                  <div class="detail-content" v-html="detail.content"></div>
                </div>
              </div>
              <button class="back-button" @click.stop="flipCard(index)">
                <i class="material-icons">arrow_back</i> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Question modal -->
    <div class="question-modal" :class="{ 'active': modalActive }">
      <div class="question-modal-content">
        <div class="question-modal-title">
          <i class="material-icons">help</i>
          <span>{{ modalTitles[currentModalIndex] }}</span>
        </div>
        <div class="quick-questions">
          <div v-for="(q, qIdx) in currentQuestions" :key="qIdx" class="question-item" @click="showAnswer(q.answer)">
            <div class="question-item-text">{{ q.question }}</div>
          </div>
        </div>
        <div class="question-answer" :class="{ 'active': answerActive }">
          {{ currentAnswer }}
        </div>
        <button class="modal-close" @click="closeQuestionModal">×</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VictorianEducationJourneyMap',
  data() {
    return {
      // Kangaroo speech defaults
      kangarooDefault: "Hello! I'm the Victorian Education Kangaroo. Click each card for details, or ask me any questions!",
      modalTitles: [
        'Early Childhood Education FAQs',
        'Primary Education FAQs',
        'Secondary Education FAQs',
        'Higher Education FAQs'
      ],

      // Education stages
      stages: [
        {
          class: 'early',
          title: 'Early Childhood Education',
          age: 'Ages 0-5',
          type: 'Childcare, Kindergarten',
          desc: 'Early learning and care for children aged 0-5, including childcare and kindergarten. Usually non-compulsory, but helps children adapt to school life.',
          detailTitle: 'Early Childhood Education Details',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#38bdf8"/><rect x="12" y="20" width="16" height="10" rx="2" fill="#fff"/><rect x="16" y="24" width="4" height="6" rx="1" fill="#bae6fd"/><rect x="20" y="24" width="4" height="6" rx="1" fill="#bae6fd"/></svg>',
          details: [
            { icon: 'school', title: 'Education Types', content: 'Includes Childcare Centers, Kindergartens, and Pre-schools, providing care and early learning for children.' },
            { icon: 'schedule', title: 'Key Timelines', content: 'Ages 3-4: Kindergarten, 15 hours of free programs per week; Ages 4-5: Pre-school, preparation for primary school' },
            { icon: 'check_circle', title: 'Need to Know', content: 'Government subsidies available to reduce costs; Some areas require kindergarten registration 1 year in advance' }
          ]
        },
        {
          class: 'primary',
          title: 'Primary Education',
          age: 'Ages 5-12',
          type: 'Primary School (Prep-Year 6)',
          desc: 'Primary education usually starts at age 5 (Prep) and ends at age 12 (Year 6). It is compulsory education.',
          detailTitle: 'Primary Education Details',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#fde047"/><rect x="12" y="18" width="16" height="12" rx="2" fill="#fff"/><rect x="16" y="22" width="8" height="4" rx="1" fill="#fef9c3"/></svg>',
          details: [
            { icon: 'book', title: 'Curriculum', content: 'Victorian Curriculum includes English, Mathematics, Science, Arts, Physical Education, Humanities and Social Sciences.' },
            { icon: 'home', title: 'School Types', content: 'Public: Free zonal enrollment; Private: Fee-paying; Catholic: Moderate fees.' },
            { icon: 'event', title: 'Important Information', content: 'Start: Late Jan/Early Feb; Year divided into 4 terms; Proof of residence required for public schools.' }
          ]
        },
        {
          class: 'secondary',
          title: 'Secondary Education',
          age: 'Ages 12-18',
          type: 'Secondary School (Years 7-12)',
          desc: 'Divided into junior (7-10) and senior (11-12) stages, preparing for higher education or employment.',
          detailTitle: 'Secondary Education Details',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#f472b6"/><rect x="12" y="16" width="16" height="14" rx="2" fill="#fff"/><rect x="16" y="22" width="8" height="6" rx="1" fill="#fce7f3"/></svg>',
          details: [
            { icon: 'layers', title: 'Stage Division', content: 'Junior (7-10): Broad subjects; Senior (11-12): VCE/VCAL courses.' },
            { icon: 'grade', title: 'VCE & ATAR', content: 'VCE: Victorian Certificate of Education; ATAR: Australian Tertiary Admission Rank (max 99.95)' },
            { icon: 'school', title: 'Selection Considerations', content: 'Selective schools need exams; Apply 1-2 years ahead; Private requires interviews.' }
          ]
        },
        {
          class: 'tertiary',
          title: 'Higher/Vocational Education',
          age: '18+ years',
          type: 'TAFE, University, Vocational Training',
          desc: 'TAFE, university or vocational training for degrees or certificates.',
          detailTitle: 'Higher Education Details',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#818cf8"/><rect x="12" y="18" width="16" height="10" rx="2" fill="#fff"/><rect x="16" y="22" width="8" height="4" rx="1" fill="#e0e7ff"/></svg>',
          details: [
            { icon: 'account_balance', title: 'Education Types', content: 'Universities: Degrees; TAFE: Certificates & diplomas.' },
            { icon: 'monetization_on', title: 'Tuition Fees', content: 'HECS-HELP for citizens; Full fee for internationals; Scholarships available.' },
            { icon: 'explore', title: 'Major Universities', content: 'Monash, Melbourne, Deakin, Swinburne, La Trobe, RMIT, etc.' }
          ]
        }
      ],

      // Questions
      stageQuestions: [
        [
          { question: 'What type of education should my 3-year-old child attend?', answer: '3-year-olds can begin Kindergarten with 15 free hours/week; Childcare centers also an option.' },
          { question: 'How do I apply for kindergarten subsidies?', answer: 'Apply via Centrelink for CCS; amount based on income, service type, hours.' },
          { question: 'How do I choose the right kindergarten?', answer: 'Consider location, pedagogies, ratios, fees; visit and read reviews.' }
        ],
        [
          { question: 'My child is 6 years old, what should I prepare now?', answer: 'Enroll in Prep, get uniforms, supplies, attend orientation, build self-care skills.' },
          { question: 'How do I choose a primary school?', answer: 'Public uses zonal enrolment; private requires applications and interviews; consider reputation and programs.' },
          { question: 'What is assessment/reporting?', answer: 'Continuous assessments; two reports/year; NAPLAN in Years 3 & 5; parent-teacher meetings.' }
        ],
        [
          { question: 'Transition tips primary to secondary?', answer: 'Apply early, attend transition events, develop organization and emotional support.' },
          { question: 'Differences between VCE and VCAL?', answer: 'VCE for uni (ATAR); VCAL vocational focus; integrated into flexible VCE from 2023.' },
          { question: 'How to prepare for VCE exams?', answer: 'Study plans, past papers, health support, tutoring, workshops.' }
        ],
        [
          { question: 'How to apply to universities?', answer: 'Use VTAC, submit up to 8 preferences, pay fee, accept offer; internationals via agents or direct.' },
          { question: 'TAFE vs university?', answer: 'TAFE vocational certificates diplomas; uni degrees; shorter TAFE courses; credit pathways.' },
          { question: 'Financial assistance?', answer: 'HECS-HELP, FEE-HELP, scholarships, Austudy, part-time work, budget plans.' }
        ]
      ],

      // UI state
      flippedCards: [false, false, false, false],
      speechActive: false,
      modalActive: false,
      answerActive: false,
      currentSpeech: '',
      currentModalIndex: 0,
      currentQuestions: [],
      currentAnswer: '',
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      isScrollStart: true,
      isScrollEnd: false
    };
  },
  methods: {
    toggleSpeech() {
      this.speechActive = !this.speechActive;
      if (this.speechActive) {
        this.currentSpeech = this.kangarooDefault;
        setTimeout(() => { this.speechActive = false; }, 5000);
      }
    },
    updateSpeechBubble(idx) {
      this.currentSpeech = this.stages[idx].kangarooTip || this.kangarooDefault;
      this.speechActive = true;
      setTimeout(() => { this.speechActive = false; }, 5000);
    },
    flipCard(index) {
      if (!this.flippedCards[index]) this.updateSpeechBubble(index);
      this.flippedCards = this.flippedCards.map((v, i) => i === index ? !v : false);
    },
    openQuestionModal(index) {
      this.currentModalIndex = index;
      this.modalActive = true;
      this.answerActive = false;
      this.currentQuestions = this.stageQuestions[index];
    },
    showAnswer(ans) { this.currentAnswer = ans; this.answerActive = true; },
    closeQuestionModal() { this.modalActive = false; this.answerActive = false; this.currentAnswer = ''; },
    scrollTimeline(dir) { const t = this.$refs.timeline, w = 292; t.scrollLeft += dir * w * 2; this.checkScrollPosition(); },
    checkScrollPosition() { const t = this.$refs.timeline; this.isScrollStart = t.scrollLeft <= 10; this.isScrollEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 10; },
    startDrag(e) { this.isDragging = true; this.startX = e.pageX || e.touches[0].pageX; this.scrollLeft = this.$refs.timeline.scrollLeft; },
    onDrag(e) { if (!this.isDragging) return; e.preventDefault(); const x = e.pageX || e.touches[0].pageX; this.$refs.timeline.scrollLeft = this.scrollLeft - (x - this.startX) * 2; this.checkScrollPosition(); },
    endDrag() { this.isDragging = false; }
  },
  mounted() {
    this.currentSpeech = this.kangarooDefault;
    window.addEventListener('resize', this.checkScrollPosition);
    this.$nextTick(this.checkScrollPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScrollPosition);
  }
};
</script>

<style scoped>
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

/* 语言切换按钮 */
.language-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  z-index: 100;
}

.lang-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.lang-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.lang-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
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
  padding: 0.7rem 1rem;
  margin: 1rem auto;
  max-width: 400px;
  color: #64748b;
  font-size: 0.9rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  animation: pulse 2s infinite;
}

.tutorial-hint i {
  margin-right: 8px;
  font-size: 1.2rem;
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

/* 时间轴容器和导航控制 */
.timeline-container {
  position: relative;
  margin: 2rem 0 1rem 0;
  padding: 2rem 0;
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

.nav-button i {
  font-size: 1.5rem;
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
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  transition: all 0.5s ease;
}

.flat-timeline::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
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
  flex: 0 0 260px;
  width: 260px;
  height: 400px;
  /* 增加一点高度 */
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

.flat-step:nth-child(1) {
  animation-delay: 0.1s;
}

.flat-step:nth-child(2) {
  animation-delay: 0.3s;
}

.flat-step:nth-child(3) {
  animation-delay: 0.5s;
}

.flat-step:nth-child(4) {
  animation-delay: 0.7s;
}

.flat-step::after {
  content: attr(data-after, "点击查看详情");
  position: absolute;
  bottom: 40px;
  /* 调整位置，为问题按钮腾出空间 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #94a3b8;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.flat-step:hover::after {
  opacity: 1;
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

.card-front,
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
  padding: 1.5rem 1rem 1.2rem 1rem;
}

.card-front {
  background: inherit;
}

.card-back {
  transform: rotateY(180deg);
  background: inherit;
}

.flat-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
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
  font-size: 0.9rem;
  color: #334155;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 0.7em 1em;
  margin: 0.6em auto 0;
  height: 80px;
  width: 90%;
  overflow-y: auto;
  text-align: center;
  box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.03);
  line-height: 1.4;
  display: flex;
  align-items: center;
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

.question-button i {
  margin-right: 5px;
  font-size: 1rem;
}

.question-button:hover {
  background: #e2e8f0;
  color: #2563eb;
}

/* 问题模态框 */
.question-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.question-modal.active {
  opacity: 1;
  pointer-events: auto;
}

.question-modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.question-modal.active .question-modal-content {
  transform: translateY(0);
}

.question-modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.question-modal-title i {
  margin-right: 8px;
  font-size: 1.3rem;
}

.quick-questions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.question-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.question-item:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  transform: translateX(5px);
}

.question-item-text {
  font-size: 0.95rem;
  color: #334155;
}

.question-answer {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.5;
  display: none;
}

.question-answer.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: #1e40af;
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

.back-button i {
  margin-right: 5px;
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
@media (max-width: 1100px) {
  .timeline-container {
    padding: 1rem 0;
  }

  .flat-timeline {
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
}

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
