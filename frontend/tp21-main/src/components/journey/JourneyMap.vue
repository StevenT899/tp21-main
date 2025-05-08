<template>
  <div class="journey-container" :class="{ 'zh': currentLanguage === 'zh' }">
    <!-- 语言切换按钮 -->
    <div class="language-toggle">
      <button 
        @click="changeLanguage('en')" 
        class="lang-btn" 
        :class="{ 'active': currentLanguage === 'en' }"
      >
        English
      </button>
      <button 
        @click="changeLanguage('zh')" 
        class="lang-btn" 
        :class="{ 'active': currentLanguage === 'zh' }"
      >
        中文
      </button>
    </div>
    
    <div class="journey-intro">
      <h2 class="journey-title">{{ translations[currentLanguage].title }}</h2>
      <p class="journey-subtitle">{{ translations[currentLanguage].subtitle }}</p>
      
      <!-- 袋鼠指导角色 -->
      <div class="kangaroo-guide" @click="toggleSpeech">
        <div class="kangaroo-image"></div>
      </div>
      
      <div class="speech-bubble" :class="{ 'active': speechActive }" ref="speechBubble">
        {{ currentSpeech }}
      </div>
      
      <div class="tutorial-hint">
        <i class="material-icons">touch_app</i>
        <span>{{ translations[currentLanguage].tutorial }}</span>
      </div>
    </div>
    
    <!-- 时间轴容器，带导航按钮 -->
    <div class="timeline-container">
      <div class="timeline-nav">
        <button 
          class="nav-button" 
          :disabled="isScrollStart" 
          @click="scrollTimeline(-1)"
        >
          <i class="material-icons">chevron_left</i>
        </button>
        <button 
          class="nav-button" 
          :disabled="isScrollEnd" 
          @click="scrollTimeline(1)"
        >
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
      
      <div 
        class="flat-timeline" 
        ref="timeline" 
        @scroll="checkScrollPosition"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
      >
        <!-- 教育阶段卡片 -->
        <div 
          v-for="(stage, index) in stages" 
          :key="index"
          class="flat-step"
          :class="stage.class"
          tabindex="0"
          :ref="'stage_' + index"
          @click="flipCard(index)"
          :style="{ animationDelay: index * 0.2 + 's' }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="card-container" :class="{ 'flipped': flippedCards[index] }">
            <!-- 卡片正面 -->
            <div class="card-front">
              <div class="flat-icon" aria-hidden="true" v-html="stage.icon"></div>
              <div class="flat-title">{{ translations[currentLanguage][stage.titleKey] }}</div>
              <div class="flat-age">{{ translations[currentLanguage][stage.ageKey] }}</div>
              <div class="flat-type">{{ translations[currentLanguage][stage.typeKey] }}</div>
              <div class="flat-desc">{{ translations[currentLanguage][stage.descKey] }}</div>
              
              <!-- 问题按钮 -->
              <button class="question-button" @click.stop="openQuestionModal(index)">
                <i class="material-icons">help_outline</i>{{ translations[currentLanguage].questions }}
              </button>
            </div>
            
            <!-- 卡片背面 -->
            <div class="card-back">
              <div class="flat-title">{{ translations[currentLanguage][stage.detailTitleKey] }}</div>
              
              <div class="detail-section">
                <div v-for="(detail, detailIndex) in stage.details" :key="detailIndex">
                  <div class="detail-title">
                    <i class="material-icons">{{ detail.icon }}</i>
                    {{ translations[currentLanguage][detail.titleKey] }}
                  </div>
                  <div class="detail-content" v-html="translations[currentLanguage][detail.contentKey]"></div>
                </div>
              </div>
              
              <button class="back-button" @click.stop="flipCard(index)">
                <i class="material-icons">arrow_back</i>{{ translations[currentLanguage].back }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 问题模态框 -->
    <div class="question-modal" :class="{ 'active': modalActive }">
      <div class="question-modal-content">
        <div class="question-modal-title">
          <i class="material-icons">help</i>
          <span ref="modalTitle">{{ currentModalTitle }}</span>
        </div>
        
        <div class="quick-questions">
          <div 
            v-for="(question, index) in currentQuestions" 
            :key="index"
            class="question-item"
            @click="showAnswer(question.answer)"
          >
            <div class="question-item-text">{{ question.question }}</div>
          </div>
        </div>
        
        <div 
          class="question-answer"
          :class="{ 'active': answerActive }"
          ref="answerContainer"
          v-html="currentAnswer"
        ></div>
        
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
      currentLanguage: 'zh',
      flippedCards: [false, false, false, false],
      speechActive: false,
      modalActive: false,
      answerActive: false,
      currentAnswer: '',
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      isScrollStart: true,
      isScrollEnd: false,
      currentSpeech: '',
      currentModalIndex: 0,
      
      // 教育阶段定义
      stages: [
        {
          class: 'early',
          titleKey: 'earlyTitle',
          ageKey: 'earlyAge',
          typeKey: 'earlyType',
          descKey: 'earlyDesc',
          detailTitleKey: 'earlyDetailTitle',
          kangarooTipKey: 'earlyKangaroo',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#38bdf8"/><rect x="12" y="20" width="16" height="10" rx="2" fill="#fff"/><rect x="16" y="24" width="4" height="6" rx="1" fill="#bae6fd"/><rect x="20" y="24" width="4" height="6" rx="1" fill="#bae6fd"/></svg>',
          details: [
            {
              icon: 'school',
              titleKey: 'earlyEducationType',
              contentKey: 'earlyEducationTypeContent'
            },
            {
              icon: 'schedule',
              titleKey: 'earlyKeyTimes',
              contentKey: 'earlyKeyTimesContent'
            },
            {
              icon: 'check_circle',
              titleKey: 'earlyNeedToKnow',
              contentKey: 'earlyNeedToKnowContent'
            }
          ]
        },
        {
          class: 'primary',
          titleKey: 'primaryTitle',
          ageKey: 'primaryAge',
          typeKey: 'primaryType',
          descKey: 'primaryDesc',
          detailTitleKey: 'primaryDetailTitle',
          kangarooTipKey: 'primaryKangaroo',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#fde047"/><rect x="12" y="18" width="16" height="12" rx="2" fill="#fff"/><rect x="16" y="22" width="8" height="4" rx="1" fill="#fef9c3"/></svg>',
          details: [
            {
              icon: 'book',
              titleKey: 'primaryCurriculum',
              contentKey: 'primaryCurriculumContent'
            },
            {
              icon: 'home',
              titleKey: 'primarySchoolTypes',
              contentKey: 'primarySchoolTypesContent'
            },
            {
              icon: 'event',
              titleKey: 'primaryKeyInfo',
              contentKey: 'primaryKeyInfoContent'
            }
          ]
        },
        {
          class: 'secondary',
          titleKey: 'secondaryTitle',
          ageKey: 'secondaryAge',
          typeKey: 'secondaryType',
          descKey: 'secondaryDesc',
          detailTitleKey: 'secondaryDetailTitle',
          kangarooTipKey: 'secondaryKangaroo',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#f472b6"/><rect x="12" y="16" width="16" height="14" rx="2" fill="#fff"/><rect x="16" y="22" width="8" height="6" rx="1" fill="#fce7f3"/></svg>',
          details: [
            {
              icon: 'layers',
              titleKey: 'secondaryStages',
              contentKey: 'secondaryStagesContent'
            },
            {
              icon: 'grade',
              titleKey: 'secondaryVCE',
              contentKey: 'secondaryVCEContent'
            },
            {
              icon: 'school',
              titleKey: 'secondarySchoolChoice',
              contentKey: 'secondarySchoolChoiceContent'
            }
          ]
        },
        {
          class: 'tertiary',
          titleKey: 'tertiaryTitle',
          ageKey: 'tertiaryAge',
          typeKey: 'tertiaryType',
          descKey: 'tertiaryDesc',
          detailTitleKey: 'tertiaryDetailTitle',
          kangarooTipKey: 'tertiaryKangaroo',
          icon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#818cf8"/><rect x="12" y="18" width="16" height="10" rx="2" fill="#fff"/><rect x="16" y="22" width="8" height="4" rx="1" fill="#e0e7ff"/></svg>',
          details: [
            {
              icon: 'account_balance',
              titleKey: 'tertiaryEducationTypes',
              contentKey: 'tertiaryEducationTypesContent'
            },
            {
              icon: 'monetization_on',
              titleKey: 'tertiaryFees',
              contentKey: 'tertiaryFeesContent'
            },
            {
              icon: 'explore',
              titleKey: 'tertiaryUniversities',
              contentKey: 'tertiaryUniversitiesContent'
            }
          ]
        }
      ],
      
      // 中英文翻译内容
      translations: {
        en: {
          title: "Victorian Education Journey Map",
          subtitle: "A Complete Education Journey from Kindergarten to University",
          tutorial: "Click on each stage card for details, swipe to see more",
          kangarooDefault: "Hello! I'm the Victorian Education Kangaroo. Click each card for details, or ask me if you have any questions!",
          earlyTitle: "Early Childhood Education",
          earlyAge: "Ages 0-5",
          earlyType: "Childcare, Kindergarten",
          earlyDesc: "Early learning and care for children aged 0-5, including childcare and kindergarten. Usually non-compulsory, but helps children adapt to school life.",
          primaryTitle: "Primary Education",
          primaryAge: "Ages 5-12",
          primaryType: "Primary School (Prep-Year 6)",
          primaryDesc: "Primary education usually starts at age 5 (Prep) and ends at age 12 (Year 6). It is compulsory education.",
          secondaryTitle: "Secondary Education",
          secondaryAge: "Ages 12-18",
          secondaryType: "Secondary School (Years 7-12)",
          secondaryDesc: "Secondary education is divided into junior (Years 7-10) and senior (Years 11-12) stages, preparing students for higher education or employment.",
          tertiaryTitle: "Higher/Vocational Education",
          tertiaryAge: "18+ years",
          tertiaryType: "TAFE, University, Vocational Training",
          tertiaryDesc: "After high school, students can choose TAFE, university, or vocational training to obtain higher education degrees or skill certificates.",
          questions: "I have questions",
          back: "Back",
          earlyKangaroo: "Early education is important! It's the foundation for your child's social and early learning skills.",
          primaryKangaroo: "In primary school, children learn basic skills and knowledge, and develop good study habits.",
          secondaryKangaroo: "Secondary school is a key period for developing personal interests and preparing for the future.",
          tertiaryKangaroo: "Higher education provides professional skills and knowledge as a foundation for career development.",
          // 详情页面内容
          earlyDetailTitle: "Early Childhood Education Details",
          earlyEducationType: "Education Types",
          earlyEducationTypeContent: "Includes Childcare Centers, Kindergartens, and Pre-schools, providing care and early learning for children.",
          earlyKeyTimes: "Key Timelines",
          earlyKeyTimesContent: "Ages 3-4: Kindergarten, 15 hours of free programs per week<br>Ages 4-5: Pre-school, preparation for primary school",
          earlyNeedToKnow: "Need to Know",
          earlyNeedToKnowContent: "Government subsidies available to reduce costs<br>Some areas require kindergarten registration 1 year in advance",
          
          primaryDetailTitle: "Primary Education Details",
          primaryCurriculum: "Curriculum",
          primaryCurriculumContent: "Victorian Curriculum includes English, Mathematics, Science, Arts, Physical Education, Humanities and Social Sciences, providing a solid foundation for students.",
          primarySchoolTypes: "School Types",
          primarySchoolTypesContent: "Public Schools: Free, enrollment based on zones<br>Private Schools: Fee-paying, requires application<br>Catholic Schools: Moderate fees",
          primaryKeyInfo: "Important Information",
          primaryKeyInfoContent: "Start date: Late January/Early February<br>School year divided into 4 terms<br>Public schools require proof of residence",
          
          secondaryDetailTitle: "Secondary Education Details",
          secondaryStages: "Stage Division",
          secondaryStagesContent: "Junior Secondary (Years 7-10): Broad subject-based education<br>Senior Secondary (Years 11-12): VCE/VCAL courses, preparation for university or workplace",
          secondaryVCE: "VCE and ATAR",
          secondaryVCEContent: "VCE: Victorian Certificate of Education, high school diploma<br>ATAR: Australian Tertiary Admission Rank, used for university applications, maximum score 99.95",
          secondarySchoolChoice: "School Selection Considerations",
          secondarySchoolChoiceContent: "Selective schools: Require entrance exams<br>School choice: May need to apply 1-2 years in advance<br>Private schools: Require interviews and entrance exams",
          
          tertiaryDetailTitle: "Higher Education Details",
          tertiaryEducationTypes: "Education Types",
          tertiaryEducationTypesContent: "Universities: Theory and research oriented, offering Bachelor's, Master's, and Doctoral degrees<br>TAFE: Vocational education and training, offering certificates, diplomas, and advanced diplomas",
          tertiaryFees: "Tuition Fees",
          tertiaryFeesContent: "HECS-HELP: Australian citizens' deferred payment plan<br>International students: Need to pay full tuition<br>Scholarships: Financial aid based on merit or need",
          tertiaryUniversities: "Major Universities in Victoria",
          tertiaryUniversitiesContent: "Monash University, University of Melbourne, Deakin University, Swinburne University of Technology, La Trobe University, RMIT University, etc.",
          
          // 模态框部分
          modalTitleEarly: "Early Childhood Education FAQs",
          modalTitlePrimary: "Primary Education FAQs",
          modalTitleSecondary: "Secondary Education FAQs",
          modalTitleTertiary: "Higher Education FAQs",
          
          // 其他文本
          clickForDetails: "Click for details",
          cardClickAction: "Click to flip"
        },
        zh: {
          title: "维多利亚州儿童长期教育路径图",
          subtitle: "从幼儿园到大学的完整教育旅程",
          tutorial: "点击各阶段卡片查看详情，左右滑动浏览更多",
          kangarooDefault: "你好！我是维州教育小袋鼠。点击每个卡片了解详情，或者有任何问题都可以问我！",
          earlyTitle: "幼儿教育",
          earlyAge: "0–5 岁",
          earlyType: "托儿所、幼儿园",
          earlyDesc: "为 0-5 岁儿童提供的早期学习和照护，包括托儿所和幼儿园。通常为非强制性，但有助于孩子适应学校生活。",
          primaryTitle: "小学阶段",
          primaryAge: "5–12 岁",
          primaryType: "小学（Prep–6年级）",
          primaryDesc: "小学阶段通常从5岁（Prep）开始，至12岁（6年级）结束。是强制性教育阶段。",
          secondaryTitle: "中学阶段",
          secondaryAge: "12–18 岁",
          secondaryType: "中学（7–12年级）",
          secondaryDesc: "中学阶段分为初中（7-10年级）和高中（11-12年级），为学生升学或就业做准备。",
          tertiaryTitle: "高等/职业教育",
          tertiaryAge: "18 岁以上",
          tertiaryType: "TAFE、大学、职业培训",
          tertiaryDesc: "高中毕业后可选择TAFE、大学或职业培训，获得高等学历或技能证书。",
          questions: "我有问题",
          back: "返回",
          earlyKangaroo: "幼儿教育阶段很重要哦！这是孩子社交和早期学习的基础。",
          primaryKangaroo: "在小学阶段，孩子将学习基本技能和知识，培养学习习惯。",
          secondaryKangaroo: "中学是孩子发展个人兴趣和为未来做准备的关键时期。",
          tertiaryKangaroo: "高等教育提供专业技能和知识，为职业生涯奠定基础。",
          // 详情页面内容
          earlyDetailTitle: "幼儿教育详情",
          earlyEducationType: "教育类型",
          earlyEducationTypeContent: "包括日托中心(Childcare)、幼儿园(Kindergarten)和学前班(Pre-school)，为孩子提供照顾和早期学习。",
          earlyKeyTimes: "关键时间点",
          earlyKeyTimesContent: "3-4岁：幼儿园，每周15小时免费课程<br>4-5岁：学前班，为小学做准备",
          earlyNeedToKnow: "需要了解",
          earlyNeedToKnowContent: "可申请政府补贴减轻费用<br>部分区域幼儿园需提前1年登记",
          
          primaryDetailTitle: "小学阶段详情",
          primaryCurriculum: "课程内容",
          primaryCurriculumContent: "维州课程包括英语、数学、科学、艺术、体育、人文与社会科学等核心学科，为学生打下坚实基础。",
          primarySchoolTypes: "学校类型",
          primarySchoolTypesContent: "公立学校：免费，按学区招生<br>私立学校：收费，需申请入学<br>天主教学校：中等收费",
          primaryKeyInfo: "重要信息",
          primaryKeyInfoContent: "入学时间：1月底/2月初<br>学年分为4个学期<br>公立学校需提供居住证明",
          
          secondaryDetailTitle: "中学阶段详情",
          secondaryStages: "阶段划分",
          secondaryStagesContent: "初中(7-10年级)：广泛学科基础教育<br>高中(11-12年级)：VCE/VCAL课程，为大学或职场做准备",
          secondaryVCE: "VCE与ATAR",
          secondaryVCEContent: "VCE：维多利亚教育证书，高中文凭<br>ATAR：澳大利亚高等教育排名，用于大学申请，满分99.95",
          secondarySchoolChoice: "选校考虑",
          secondarySchoolChoiceContent: "特长学校：需通过考试<br>择校：可能需提前1-2年申请<br>私立学校：需面试和入学考试",
          
          tertiaryDetailTitle: "高等教育详情",
          tertiaryEducationTypes: "教育类型",
          tertiaryEducationTypesContent: "大学：理论与研究导向，提供学士、硕士、博士学位<br>TAFE：职业教育与培训，提供证书、文凭和高级文凭",
          tertiaryFees: "学费支付",
          tertiaryFeesContent: "HECS-HELP：澳洲公民学费延迟支付计划<br>国际学生：需支付全额学费<br>奖学金：基于成绩或需求的资助",
          tertiaryUniversities: "维州主要大学",
          tertiaryUniversitiesContent: "蒙纳士大学、墨尔本大学、迪肯大学、斯威本科技大学、拉筹伯大学、皇家墨尔本理工大学等",
          
          // 模态框部分
          modalTitleEarly: "幼儿教育常见问题",
          modalTitlePrimary: "小学阶段常见问题",
          modalTitleSecondary: "中学阶段常见问题",
          modalTitleTertiary: "高等教育常见问题",
          
          // 其他文本
          clickForDetails: "点击查看详情",
          cardClickAction: "点击翻转"
        }
      },
      
      // 各阶段的问题
      stageQuestions: [
        // 幼儿教育问题
        [
          {
            question: "What type of education should my 3-year-old child attend?",
            questionZh: "我的孩子3岁，应该上哪种教育机构？",
            answer: "3-year-old children can begin attending Kindergarten. Victoria provides 15 hours of free early education programs per week for children aged 3-4. You can also choose a Childcare center, especially if you need full-day care.",
            answerZh: "3岁的孩子可以开始上幼儿园(Kindergarten)，维州为3-4岁儿童提供每周15小时的免费幼教课程。您也可以选择日托中心(Childcare)，特别是如果您需要全天照顾。"
          },
          {
            question: "How do I apply for kindergarten subsidies?",
            questionZh: "怎样申请幼儿园补贴？",
            answer: "You can apply for the Child Care Subsidy (CCS) through Centrelink. The amount of subsidy depends on family income, type of childcare service, and hours of use. Visit the Services Australia website (www.servicesaustralia.gov.au) for details and application process.",
            answerZh: "您可以通过Centrelink申请Child Care Subsidy(CCS)，补贴金额取决于家庭收入、托儿服务类型和使用时间。访问Services Australia网站(www.servicesaustralia.gov.au)了解详情和申请流程。"
          },
          {
            question: "How do I choose the right kindergarten for my child?",
            questionZh: "如何为孩子选择合适的幼儿园？",
            answer: "Consider location, teaching philosophy (such as Montessori, Reggio Emilia, etc.), teacher-to-child ratio, facilities, fees, and operating hours. It's recommended to visit in person and observe the environment, how teachers interact with children, and read parent reviews.",
            answerZh: "考虑地理位置、教学理念(如蒙特梭利、瑞吉欧等)、师生比例、设施、费用和运营时间。建议实地参观并观察环境、教师与孩子互动方式，并阅读家长评价。"
          }
        ],
        // 小学阶段问题
        [
          {
            question: "My child is 6 years old, what should I prepare now?",
            questionZh: "我的孩子6岁，现在该准备什么？",
            answer: "A 6-year-old child should enter Prep year (preparatory class) in primary school. You need to: 1) Choose a school and complete enrollment; 2) Purchase school uniforms and learning supplies; 3) Participate in school orientation activities; 4) Help your child develop basic skills such as dressing themselves, organizing their backpack, and recognizing their name.",
            answerZh: "6岁的孩子应该进入小学Prep年级(预备班)。您需要准备：1)选择学校并完成入学注册；2)购买校服和学习用品；3)参加学校组织的入学适应活动；4)帮助孩子培养基本技能如自己穿衣、整理书包、认识自己的名字等。"
          },
          {
            question: "How do I choose a primary school for my child?",
            questionZh: "如何为孩子选择小学？",
            answer: "Public schools usually enroll based on zones, and you need to provide proof of residence. Private or Catholic schools require early application and may have interviews or assessments. Consider factors including: school reputation, teaching quality, special programs, facilities, extracurricular activities, location, and community reviews. Many schools offer Open Days for parents to visit.",
            answerZh: "公立学校通常按照学区招生，您需要提供居住证明。私立或天主教学校需要提前申请并可能有面试或评估。考虑因素包括：学校声誉、教学质量、特色项目、设施、课外活动、地理位置和社区评价等。许多学校提供Open Day供家长参观。"
          },
          {
            question: "What is the assessment and reporting system in Victorian primary schools?",
            questionZh: "维州小学的评估和报告制度是怎样的？",
            answer: "Victorian primary schools conduct continuous assessments each term and issue two written academic reports per year (usually in June and December). Schools use an A-E five-level grading system and also arrange parent-teacher meetings. Students in Years 3 and 5 participate in the national NAPLAN test, which assesses reading, writing, language, and mathematics abilities.",
            answerZh: "维州小学每学期进行持续性评估，每年发放两次书面成绩报告(通常在6月和12月)。学校使用A-E五级评分制，也会安排家长教师面谈会。学生在3、5年级时需参加全国性NAPLAN测试，评估阅读、写作、语言和数学能力。"
          }
        ],
        // 中学阶段问题
        [
          {
            question: "What should I pay attention to during the transition from primary to secondary school?",
            questionZh: "从小学到中学的过渡需要注意什么？",
            answer: "The transition from primary to secondary school requires: 1) Selecting and applying for secondary schools early (usually during Years 5-6); 2) Participating in school transition activities; 3) Helping children adapt to multi-subject, multi-teacher learning modes; 4) Developing time management and organizational skills; 5) Paying attention to emotional changes, as puberty may bring adaptation challenges. Most public secondary schools coordinate transition activities with their feeder primary schools.",
            answerZh: "小学到中学的过渡需要：1)提前选择并申请中学(通常在5-6年级期间)；2)参加学校组织的过渡活动；3)帮助孩子适应多科目、多教师的学习模式；4)培养时间管理和组织能力；5)关注孩子的情绪变化，青春期可能带来适应挑战。大多数公立中学会与所属小学协调过渡活动。"
          },
          {
            question: "What are the differences between VCE and VCAL?",
            questionZh: "VCE和VCAL有什么区别？",
            answer: "VCE (Victorian Certificate of Education) is the mainstream high school program, primarily preparing for university, and results in an ATAR score used for university applications. VCAL (Victorian Certificate of Applied Learning) focuses more on vocational and practical skills, preparing for employment or vocational training. From 2023, VCAL will be integrated with VCE into a more flexible VCE system that includes vocational specialization courses.",
            answerZh: "VCE(维多利亚教育证书)是主流高中课程，主要为升大学做准备，完成后获得ATAR分数用于大学申请。VCAL(维多利亚应用学习证书)则更注重职业和实用技能，为就业或职业培训做准备。从2023年起，VCAL将与VCE整合为一个更灵活的VCE系统，包含职业专业课程。"
          },
          {
            question: "How can I help my child prepare for VCE exams?",
            questionZh: "如何帮助孩子准备高中VCE考试？",
            answer: "To help your child prepare for VCE: 1) Ensure a good study environment and regular routine; 2) Encourage creating detailed study plans; 3) Seek additional tutoring or join revision classes; 4) Practice with past exam papers; 5) Maintain good physical and mental health, provide emotional support; 6) Consider applying for special exam arrangements (if learning disabilities exist); 7) Encourage participation in school-provided study guidance and workshops.",
            answerZh: "帮助孩子准备VCE：1)确保良好的学习环境和规律作息；2)鼓励制定详细的学习计划；3)寻求额外辅导或参加复习班；4)使用历年试卷练习；5)保持良好的身心状态，提供情绪支持；6)考虑特殊考试安排申请(如有学习障碍)；7)鼓励参加学校提供的学习辅导和研讨会。"
          }
        ],
        // 高等教育问题
        [
          {
            question: "How do I apply to universities in Victoria?",
            questionZh: "如何申请维州的大学？",
            answer: "Applications to Victorian universities are primarily made through the VTAC (Victorian Tertiary Admissions Centre) unified platform. Steps: 1) Register an account on the VTAC website; 2) Select courses based on ATAR scores and interests; 3) Submit up to 8 preferences in order of priority; 4) Pay the application fee; 5) Wait for admission results; 6) Accept the offer and complete enrollment. International students can usually apply directly to universities or through education agents.",
            answerZh: "申请维州大学主要通过VTAC(维多利亚高等教育招生中心)统一平台进行。步骤：1)在VTAC网站注册账号；2)根据ATAR成绩和兴趣选择课程；3)按优先顺序提交最多8个志愿；4)支付申请费；5)等待录取结果；6)接受录取并完成入学注册。国际学生通常可直接向大学申请或通过教育代理。"
          },
          {
            question: "What are the differences between TAFE and university?",
            questionZh: "TAFE和大学有什么区别？",
            answer: "The main differences between TAFE (Technical and Further Education) and university are: 1) TAFE focuses on vocational skills training, while universities emphasize theory and research; 2) TAFE offers Certificates I-IV, Diplomas, and Advanced Diplomas, while universities offer Bachelor's, Master's, and Doctoral degrees; 3) TAFE courses are typically shorter (6 months to 2 years) and more practical; 4) TAFE tuition is generally lower than university; 5) Some TAFE courses can serve as pathways to university degrees, offering credit transfers.",
            answerZh: "TAFE(技术与继续教育)与大学的主要区别：1)TAFE注重职业技能培训，大学更侧重理论和研究；2)TAFE提供证书、文凭和高级文凭，大学提供学士、硕士和博士学位；3)TAFE课程通常更短(6个月至2年)，实践性更强；4)TAFE学费一般低于大学；5)某些TAFE课程可以作为大学学位的途径，提供学分转换。"
          },
          {
            question: "What financial assistance is available for higher education costs?",
            questionZh: "有哪些经济资助可以帮助支付高等教育费用？",
            answer: "Financial assistance options: 1) HECS-HELP: Australian citizens can defer payment of tuition fees, repaying through the tax system once their income reaches the threshold; 2) FEE-HELP: For full-fee students; 3) Various scholarships: Based on academic performance, economic needs, or special backgrounds; 4) Austudy/Youth Allowance: Eligible students can receive living allowances; 5) Part-time work: Student visas allow working 40 hours every two weeks; 6) University budget plans: Many universities offer installment payment options. International students can apply for specific international student scholarships.",
            answerZh: "经济资助选项：1)HECS-HELP：澳洲公民可延迟支付学费，待收入达到阈值后通过税收系统偿还；2)FEE-HELP：适用于自费学生；3)各类奖学金：基于学术成绩、经济需求或特殊背景；4)Austudy/Youth Allowance：符合条件的学生可获得生活补贴；5)兼职工作：学生签证允许每两周工作40小时；6)大学预算计划：许多大学提供分期付款选项。国际学生可申请特定的国际学生奖学金。"
          }
        ]
      ]
    };
  },
  methods: {
    changeLanguage(language) {
      this.currentLanguage = language;
      this.updateSpeechBubble();
    },
    
    toggleSpeech() {
      this.speechActive = !this.speechActive;
      if (this.speechActive) {
        this.currentSpeech = this.translations[this.currentLanguage].kangarooDefault;
      }
    },
    
    updateSpeechBubble(stageIndex) {
      if (stageIndex !== undefined) {
        this.currentSpeech = this.translations[this.currentLanguage][this.stages[stageIndex].kangarooTipKey];
      } else {
        this.currentSpeech = this.translations[this.currentLanguage].kangarooDefault;
      }
      this.speechActive = true;
      
      // 5秒后自动隐藏
      setTimeout(() => {
        this.speechActive = false;
      }, 5000);
    },
    
    flipCard(index) {
      if (!this.flippedCards[index]) {
        this.updateSpeechBubble(index);
      }
      this.flippedCards = this.flippedCards.map((value, i) => i === index ? !value : value);
    },
    
    openQuestionModal(index) {
      this.currentModalIndex = index;
      this.modalActive = true;
      this.answerActive = false;
      
      // 更新模态框的问题
      const modalTitleKeys = ['modalTitleEarly', 'modalTitlePrimary', 'modalTitleSecondary', 'modalTitleTertiary'];
      this.currentModalTitle = this.translations[this.currentLanguage][modalTitleKeys[index]];
      
      // 获取当前阶段的问题
      this.currentQuestions = this.stageQuestions[index].map(q => ({
        question: this.currentLanguage === 'en' ? q.question : q.questionZh,
        answer: this.currentLanguage === 'en' ? q.answer : q.answerZh
      }));
    },
    
    showAnswer(answer) {
      this.currentAnswer = answer;
      this.answerActive = true;
    },
    
    closeQuestionModal() {
      this.modalActive = false;
      this.answerActive = false;
      this.currentAnswer = '';
    },
    
    scrollTimeline(direction) {
      const timeline = this.$refs.timeline;
      if (!timeline) return;
      
      const cardWidth = 260 + 32; // 卡片宽度 + 间距
      const scrollAmount = direction * cardWidth * 2;
      
      timeline.scrollLeft += scrollAmount;
      this.checkScrollPosition();
    },
    
    checkScrollPosition() {
      const timeline = this.$refs.timeline;
      if (!timeline) return;
      
      this.isScrollStart = timeline.scrollLeft <= 10;
      this.isScrollEnd = timeline.scrollLeft + timeline.clientWidth >= timeline.scrollWidth - 10;
    },
    
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.type === 'mousedown' ? event.pageX : event.touches[0].pageX;
      this.scrollLeft = this.$refs.timeline.scrollLeft;
    },
    
    onDrag(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      
      const x = event.type === 'mousemove' ? event.pageX : event.touches[0].pageX;
      const walk = (x - this.startX) * 2; // 滚动速度倍增器
      this.$refs.timeline.scrollLeft = this.scrollLeft - walk;
      
      this.checkScrollPosition();
    },
    
    endDrag() {
      this.isDragging = false;
    }
  },
  
  computed: {
    currentModalTitle() {
      if (this.currentModalIndex < 0) return '';
      
      const modalTitleKeys = ['modalTitleEarly', 'modalTitlePrimary', 'modalTitleSecondary', 'modalTitleTertiary'];
      return this.translations[this.currentLanguage][modalTitleKeys[this.currentModalIndex]];
    },
    
    currentQuestions() {
      if (this.currentModalIndex < 0 || !this.stageQuestions[this.currentModalIndex]) {
        return [];
      }
      
      return this.stageQuestions[this.currentModalIndex].map(q => ({
        question: this.currentLanguage === 'en' ? q.question : q.questionZh,
        answer: this.currentLanguage === 'en' ? q.answer : q.answerZh
      }));
    }
  },
  
  mounted() {
    // 设置默认语言
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      this.currentLanguage = 'en';
    }
    
    // 设置默认提示语
    this.currentSpeech = this.translations[this.currentLanguage].kangarooDefault;
    
    // 监听窗口大小变化，更新卡片位置
    window.addEventListener('resize', this.checkScrollPosition);
    
    // 初始化滚动位置检查
    this.$nextTick(() => {
      this.checkScrollPosition();
    });
  },
  
  beforeUnmount() {
    // 移除事件监听
    window.removeEventListener('resize', this.checkScrollPosition);
  }
};
</script>

<style scoped>
/* 基本容器样式 */
.journey-container {
  max-width: 1100px;
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

.kangaroo-image {
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIj48ZGVmcz48L2RlZnM+PGc+PHJlY3QgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCI+PC9yZWN0PjxnPjxwYXRoIGZpbGw9IiM5MjYzMjQiIHN0cm9rZT0ibm9uZSIgZD0iTSAxNDkuNzggMzU1LjQzIEMgMTIzLjY4IDM1MS4xMiAxMDYuNzQgMzM3LjQ5IDEwMC43NiAzMTUuODggQyA5OS4wNiAzMDkuNDEgOTguNzQgMzA2LjI1IDk4LjcxIDI5Mi41MSBDIDU4Ljk4IDI2Mi4wOSA3NC4yNiAyMDYuMzEgODQuNDkgMTk1Ljc2IEMgOTAuNjEgMTU1LjU2IDEwMi4wNSAxMjUuNDYgMTIxLjY4IDEwMC41OSBDIDE0Ni4xNSA2OS4wMSAxODQgNTMuNzEgMjE5LjI0IDYwLjc2IEMgMjI5LjcxIDYyLjc4IDIzNy4xMSA2NS45NyAyNDMuOTEgNzEuMjggQyAyNTYuMzUgODEuMTQgMjYxLjY3IDkyLjgzIDI2Mi41NiAxMTAuMTQgQyAyNjMuMTkgMTIxLjg4IDI2MS41MSAxMzAuODkgMjU2LjQyIDE0My41NSBDIDI1Mi42NCAxNTMuMDcgMjQ2LjMxIDE2Mi45NSAyMzkuMTkgMTY5Ljk5IEwgMjM3LjA0IDE3Mi4xMiBMIDIzNS43NSAxNzkuNTUgQyAyMzQuOTQgMTg0LjAwIDIzNC4wNyAxODkuOTkgMjMzLjU5IDE5My43OSBDIDIzMi42MSAyMDEuNzQgMjMyLjQxIDIwNS43NSAyMzIuNTggMjExLjQ0IEwgMjMyLjgwIDIxOC42NiBMIDIzNS40MiAyMjUuMDcgQyAyMzYuODYgMjI4LjUxIDIzOS4xMCAyMzQuNzkgMjQwLjM0IDIzOS4wNyBDIDI0Ni4yOCAyNTguMjUgMjQ2LjUzIDI2NS4xOSAyNDEuODcgMjc5LjIwIEMgMjM5LjI3IDI4Ni45MCAyMzMuODEgMjk2LjM1IDIyOS44NCAzMDEuMjIgQyAyMTYuMjMgMzE3Ljk5IDE5MC44NSAzMzcuMzAgMTc1LjEwIDM0Ni4yNSBDIDE3MC4wOCAzNDkuMTggMTU1LjYzIDM1NS4zNSAxNTIuODkgMzU1LjgzIEMgMTUwLjI5IDM1Ni4zMSAxNTYuMzcgMzY3LjAwIDE0OS43OCAzNTUuNDMgeiI+PC9wYXRoPjxlbGxpcHNlIGZpbGw9IiNmMmYyZTYiIHN0cm9rZT0ibm9uZSIgY3g9IjE3NS43NSIgY3k9IjI1MC4wMSIgcng9IjM4LjU0IiByeT0iNjUuMjciPjwvZWxsaXBzZT48ZWxsaXBzZSBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIGN4PSIxNzMuNDgiIGN5PSIxMjAuMDEiIHJ4PSIyOS44MSIgcnk9IjQwLjEiPjwvZWxsaXBzZT48cGF0aCBmaWxsPSIjZjJmMmU2IiBzdHJva2U9Im5vbmUiIGQ9Ik0gMTc5LjY3IDE0OS43NiBDIDE2NS4wNiAxNDQuMzUgMTU4LjEyIDEyMy4zOCAxNjQuNTUgMTAzLjU5IEMgMTY2LjY3IDk3LjA5IDE3MS4zNiA4OS44MiAxNzUuNTkgODUuNTYgQyAxOTEuNjUgNjkuMzkgMjE0Ljk3IDgyLjI0IDIxNS45OCAxMDcuOTQgQyAyMTYuNDAgMTE5LjU1IDIxNS4zMiAxMjQuNjkgMjExLjg0IDEzMi4wNiBDIDIwOC41MCAxMzkuMDYgMjAzLjM5IDE0NC44MiAxOTcuNjIgMTQ4LjA2IEMgMTkxLjM2IDE1MS42MCAxODUuOTMgMTUyLjE0IDE3OS42NyAxNDkuNzYgeiI+PC9wYXRoPjxlbGxpcHNlIGZpbGw9IiMxNzEzMTMiIHN0cm9rZT0ibm9uZSIgY3g9IjE2NC43NSIgY3k9IjEyMC4wMSIgcng9IjcuMyIgcnk9IjcuMyI+PC9lbGxpcHNlPjxlbGxpcHNlIGZpbGw9IiMxNzEzMTMiIHN0cm9rZT0ibm9uZSIgY3g9IjE5NC43NSIgY3k9IjEyMC4wMSIgcng9IjcuMyIgcnk9IjcuMyI+PC9lbGxpcHNlPjxwYXRoIGZpbGw9IiNmMmYyZTYiIHN0cm9rZT0ibm9uZSIgZD0iTSAxMzAuNjQgMTI0LjM5IEMgMTE1LjEyIDExOS43MSAxMDguMzAgOTYuMzYgMTE1Ljk1IDczLjc2IEMgMTE5Ljg0IDYyLjU3IDEyNi44NCA1NC43OCAxMzIuODUgNTUuMjkgQyAxNDUuODMgNTYuMzQgMTY4LjI4IDg1LjE0IDE2Ni40MCAxMDAuNzEgQyAxNjUuNTEgMTA3Ljk3IDE0OS44MSAxMzAuMzUgMTMwLjY0IDEyNC4zOSB6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE3MTMxMyIgc3Ryb2tlPSJub25lIiBkPSJNIDE1Mi4zMiAxMzcuNzggQyAxNDQuNDYgMTM1LjgyIDE0NC43NCAxMzYuODQgMTUyLjc2IDE0MC4xMyBDIDE1Ny40MyAxNDIuMTQgMTk3LjczIDE0My4zOCAxOTcuODMgMTQwLjA5IEMgMTk3Ljg5IDEzNy45OCAxODkuNzYgMTM3LjM1IDE3OS41NSAxMzguMDEgQyAxNzMuMzEgMTM4LjQwIDE1NS41MSAxMzguODAgMTUyLjMyIDEzNy43OCB6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=') no-repeat center center;
  background-size: contain;
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
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

.kangaroo-guide:hover + .speech-bubble,
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  animation: pulse 2s infinite;
}

.tutorial-hint i {
  margin-right: 8px;
  font-size: 1.2rem;
}

@keyframes pulse {
  0% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0.8; transform: scale(1); }
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  transition: all 0.5s ease;
}

.flat-timeline::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 连接线 */
.flat-timeline::before {
  content: '';
  position: absolute;
  left: 0; right: 0;
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
  height: 400px; /* 增加一点高度 */
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
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.flat-step:nth-child(1) { animation-delay: 0.1s; }
.flat-step:nth-child(2) { animation-delay: 0.3s; }
.flat-step:nth-child(3) { animation-delay: 0.5s; }
.flat-step:nth-child(4) { animation-delay: 0.7s; }

.flat-step::after {
  content: attr(data-after, "点击查看详情");
  position: absolute;
  bottom: 40px; /* 调整位置，为问题按钮腾出空间 */
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

.flat-step:hover, .flat-step:focus {
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

.card-front, .card-back {
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  background: rgba(255,255,255,0.7);
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
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
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
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
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
  from { opacity: 0; }
  to { opacity: 1; }
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
.early   { background: #e0f2fe; }
.primary { background: #fef9c3; }
.secondary { background: #fce7f3; }
.tertiary { background: #e0e7ff; }

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
  .card-front, .card-back {
    padding: 1.2rem 0.8rem 1rem 0.8rem;
  }
}
</style>
