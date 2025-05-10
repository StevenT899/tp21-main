export default {
    nav: {
        home: '首页',
        compare: '对比',
        journey: '旅程',
        support: '支持',
        english: 'English',
        chinese: '中文'
    },
    footer: {
        acknowledgment: "NewBee Edu 认可我们工作所在土地的传统所有者。我们承认他们与这片土地的精神和文化联系，并向过去、现在和未来的长辈们表示敬意。"
    },
    schoolTypes: {
        Catholic: "天主教学校",
        Government: "公立学校",
        Independent: "私立学校"
    },
    schoolTypesSchool: {
        Catholic: "天主教学校",
        Government: "公立学校",
        Independent: "私立学校"
    },
    languages: {
        "Chinese": "中文",
        "Japanese": "日语",
        "Indonesian": "印尼语",
        "Auslan": "澳大利亚手语",
        "Spanish": "西班牙语",
        "Italian": "意大利语",
        "French": "法语",
        "German": "德语",
        "Aboriginal Languages": "原住民语言",
        "Korean": "韩语",
        "Greek": "希腊语",
        "Vietnamese": "越南语",
        "Hindi": "印地语",
        "Macedonian": "马其顿语",
        "Turkish": "土耳其语"
    },
    chart: {
        labels: {
            notStated: "未声明",
            englishBackground: "英语背景",
            otherLanguagesBackground: "其他语言背景"
        },
        languages: {
            notStated: "未说明",
            english: "英语背景",
            otherLanguages: "其他语言背景"
        }
    },
    gender: {
        girl: "女生",
        boy: "男生"
    },
    messages: {
        toast: {
            error: {
                invalidSchoolData: '学校数据无效，无法添加到比较。',
                noSchoolSelected: '请先选择一所学校。',
                schoolNotFound: '未找到这所学校。',
                alreadyAdded: '这所学校已被添加。',
                fetchFailed: '获取学校数据失败。'
            },
            warning: {
                alreadyInCompare: '已在您的比较列表中。',
                compareLimit: '您最多只能比较3所学校。'
            },
            success: {
                addedToCompare: '已添加到比较！',
                schoolAdded: '学校添加成功！',
                removedFromCompare: '已成功从比较列表中移除。',
                allSchoolsRemoved: '所有学校已从比较列表中移除。'
            }
        },
        school: {
            na: '暂缺',
            none: '无'
        }
    },
    homeView: {
        heroTitle: '为你的孩子找到合适的小学',
        heroDesc1: '探索、比较并了解维多利亚州的学校。我们帮助移民家庭自信地做出学校选择。',
        heroDesc2: '使用我们简单的地图工具搜索学校，了解它们提供的课程，并找到最适合您孩子的学校 —— 无论是从学术上、文化上还是实际需求上。',
        heroStart: '选择一个选项开始吧！',
        exploreSchools: '探索学校',
        suburb: '郊区',
        school: '学校',
        checkPrefix: '查看你的 {schoolZone}',
        schoolZone: '学区',
        searchPlaceholder: '输入郊区/邮编/学校名称',
        searchPlaceholder2: '输入一个地址',
        searchButton: '搜索',
        noResult: '未找到有效结果，请搜索其他位置'
    },
    helpSection: {
        title: '我们随时提供帮助',
        paragraph1: '学校不仅仅是学术场所，它是孩子们成长和归属的地方。每个孩子都应该在学校中感到安全、被关注和被支持。我们希望这个工具能帮助您和您的孩子让这一切变得更容易。',
        paragraph2: '我们希望这个工具能让您和孩子们的事情变得稍微轻松一些。',
        signature: '—NewBee Edu 团队'
    },
    MapShow: {
        filterSection: {
            schoolType: "学校类型",
            languageProgram: "语言课程",
            schoolTypes: {
                Catholic: "天主教学校",
                Government: "公立学校",
                Independent: "私立学校"
            },
            languages: {
                "Chinese": "中文",
                "Japanese": "日语",
                "Indonesian": "印尼语",
                "Auslan": "澳大利亚手语",
                "Spanish": "西班牙语",
                "Italian": "意大利语",
                "French": "法语",
                "German": "德语",
                "Aboriginal Languages": "原住民语言",
                "Korean": "韩语",
                "Greek": "希腊语",
                "Vietnamese": "越南语",
                "Hindi": "印地语",
                "Macedonian": "马其顿语",
                "Turkish": "土耳其语"
            },
            filter: "筛选",
            reset: "重置",
            all: "全部"
        },
        mapInstruction1: "点击地图上的任何",
        mapInstruction2: "学校图标以预览关键信息，包括",
        mapInstruction3: "并添加到比较列表中。",
        mapInstruction4: "语言课程",
        mapInstruction5: "学校区域的划定范围适用于2026年入学年份",
        schoolPopup: {
            viewDetails: "查看详情",
            addToCompare: "添加到比较",
            schoolTypeLabel: "学校",
            isInCompareList: "已在比较列表中"
        },
        toast: {
            success: "成功消息",
            error: "错误消息"
        }
    },
    MapZShow: {
        filterSection: {
            schoolType: "学校类型",
            languageProgram: "语言课程",
            filter: "筛选",
            reset: "重置",
            all: "全部"
        },
        mapInstruction: "点击地图上的学校图标预览信息并添加到比较列表",
        schoolPopup: {
            viewDetails: "查看详情",
            addToCompare: "添加到比较",
            schoolTypeLabel: "学校",
            isInCompareList: "已在比较列表中"
        },
        toast: {
            success: "成功",
            error: "错误",
            locationSuccess: "位置更新成功",
            locationError: "获取位置失败"
        },
        mapControls: {
            getLocation: "获取当前位置"
        }
    },
    compareView: {
        pageHeader: {
            title: '比较你选择的学校',
            description: '你最多可以选择3所学校，横向对比他们之间的区别。',
            description2: '学校数据基于官方的数据集反映了2024年的情况'
        },
        schoolCard: {
            removeButton: '移除学校',
            visitWebsite: '访问学校网站',
            schoolType: '学校类型',
            yearRange: '年级范围',
            languageProgram: '语言课程',
            none: '无',
            studentPerStaff: '每名教学人员对应的学生数',
            icsea: '社区社会教育优势指数 (ICSEA)',
            icseaTooltip: 'ICSEA反映了学生的社会教育背景。平均值为1000。分数越高表示优势越大。',
            enrolments: '招生人数',
            totalEnrolment: '总招生人数:',
            searchToAdd: '搜索以添加学校',
            searchPlaceholder: '输入学校名称 ',
            addToCompare: '添加到比较'
        },
        confirmationModal: {
            title: '移除学校',
            message: '你确定要从比较中移除这所学校吗？',
            remove: '移除',
            cancel: '取消'
        },
        toast: {
            success: '成功消息（你可以自定义此内容）',
            warning: '警告消息（你可以自定义此内容）'
        },
        languageProgram: {
            title: '什么是语言课程？',
            description: '政府小学的语言课程为学生提供了学习英语以外语言的机会。这些课程有助于学生发展语言技能，支持文化多样性。',
            readMore: '了解更多'
        },
        icseaModal: {
            title: '什么是 ICSEA？',
            description: 'ICSEA 是一个反映学校学生家庭平均教育和收入背景的数值。它有助于提供背景信息，但并不是衡量学校“好坏”的分数。',
            readMore: '了解更多'
        },
    },
    CompareSideBar: {
        header: '已添加的学校 ({count}/3)',
        schoolInfo: {
            type: '类型: {type}',
            suburb: '郊区: {suburb}'
        },
        removeButton: '移除',
        removeAllButton: '全部移除',
        compareButton: '比较'
    },
    ModalBox: {
        languageProgram: {
            title: '什么是语言课程？',
            description: '政府小学的语言课程为学生提供了学习英语以外语言的机会。这些课程有助于学生发展语言技能，支持文化多样性。',
            readMore: '了解更多'
        },
        icseaModal: {
            title: '什么是 ICSEA？',
            description: 'ICSEA 是一个反映学校学生家庭平均教育和收入背景的数值。它有助于提供背景信息，但并不是衡量学校“好坏”的分数。',
            readMore: '了解更多'
        },
        schoolZone: {
            title: '什么是学区？',
            description: '学区是政府设置的区域，根据你的地址决定你的孩子可以上哪所当地的学校。',
            readMore: '了解更多'
        }
    },
    SchoolDetail: {
        loading: '加载中...',
        visitSchoolWebsite: '访问学校网站',
        addToCompare: '添加到比较',
        schoolType: '学校类型',
        yearRange: '年级范围',
        schoolZoneCheck: '检查学区',
        useLocation: '📍 使用位置',
        inSchoolZone: '这所学校在你的学区内',
        notInSchoolZone: '这所学校不在你的学区内',
        SchoolZoneError: '错误，无法查看地理位置',
        languageProgram: {
            title: '语言课程',
            modal: {
                title: '什么是语言课程？',
                description: '政府小学的语言课程为学生提供了学习英语以外语言的机会。这些课程有助于学生发展语言技能，支持文化多样性。',
                readMore: '了解更多'
            },
            noLanguages: '无',
            studentCulturalBackground: '学生文化背景',
            studentCulturalBackgroundDesc: '的学生来自非英语语言背景'
        },
        staffAndEnrolment: {
            schoolStaff: '学校教职工',
            teachingStaff: '教学人员',
            nonTeachingStaff: '非教学人员',
            studentEnrolment: '学生注册情况',
            totalEnrolment: '总注册人数',
            studentPerTeachingStaff: '每名教学人员对应的学生数'
        },
        icseaModal: {
            title: '什么是 ICSEA？',
            description: 'ICSEA 是一个反映学校学生家庭平均教育和收入背景的数值。它有助于提供背景信息，但并不是衡量学校“好坏”的分数。',
            readMore: '了解更多'
        },
        icseaTitle: "社区社会教育优势指数 (ICSEA)",
        icseaInfo: '高于维多利亚州 {percentile}% 的小学',
    },
    journeyView: {
        pageHeader: {
            title: '孩子在维州的教育旅程图',
            description: 'Not sure what lies ahead in your child\'s school years? This page shows you the key stages in Victoria\'s education system — from Prep to primary and beyond — so you can feel more prepared to support your child every step of the way.',
        }
    },
    journeyMap: {
        journey: {
            title: "Victorian Education Journey Map",
            subtitle: "A Complete Education Journey from Kindergarten to University",
            kangarooGuide: "Hello! I'm the Victorian Education Kangaroo. Click each card for details, or ask me any questions!",
            tutorialHint: "Click on each stage card for details, swipe to see more"
        },
        stages: {
            early: {
                title: "Early Childhood Education",
                age: "Ages 0-5",
                type: "Childcare, Kindergarten",
                desc: "Early learning and care for children aged 0-5, including childcare and kindergarten. Usually non-compulsory, but helps children adapt to school life.",
                detailTitle: "Early Childhood Education Details",
                details: [
                    {
                        icon: "school",
                        title: "Education Types",
                        content: "Includes Childcare Centers, Kindergartens, and Pre-schools, providing care and early learning for children."
                    },
                    {
                        icon: "schedule",
                        title: "Key Timelines",
                        content: "Ages 3-4: Kindergarten, 15 hours of free programs per week; Ages 4-5: Pre-school, preparation for primary school"
                    },
                    {
                        icon: "check_circle",
                        title: "Need to Know",
                        content: "Government subsidies available to reduce costs; Some areas require kindergarten registration 1 year in advance"
                    }
                ]
            },
            primary: {
                title: "Primary Education",
                age: "Ages 5-12",
                type: "Primary School (Prep-Year 6)",
                desc: "Primary education usually starts at age 5 (Prep) and ends at age 12 (Year 6). It is compulsory education.",
                detailTitle: "Primary Education Details",
                details: [
                    {
                        icon: "book",
                        title: "Curriculum",
                        content: "Victorian Curriculum includes English, Mathematics, Science, Arts, Physical Education, Humanities and Social Sciences."
                    },
                    {
                        icon: "home",
                        title: "School Types",
                        content: "Public: Free zonal enrollment; Private: Fee-paying; Catholic: Moderate fees."
                    },
                    {
                        icon: "event",
                        title: "Important Information",
                        content: "Start: Late Jan/Early Feb; Year divided into 4 terms; Proof of residence required for public schools."
                    }
                ]
            },
            secondary: {
                title: "Secondary Education",
                age: "Ages 12-18",
                type: "Secondary School (Years 7-12)",
                desc: "Divided into junior (7-10) and senior (11-12) stages, preparing for higher education or employment.",
                detailTitle: "Secondary Education Details",
                details: [
                    {
                        icon: "layers",
                        title: "Stage Division",
                        content: "Junior (7-10): Broad subjects; Senior (11-12): VCE/VCAL courses."
                    },
                    {
                        icon: "grade",
                        title: "VCE & ATAR",
                        content: "VCE: Victorian Certificate of Education; ATAR: Australian Tertiary Admission Rank (max 99.95)"
                    },
                    {
                        icon: "school",
                        title: "Selection Considerations",
                        content: "Selective schools need exams; Apply 1-2 years ahead; Private requires interviews."
                    }
                ]
            },
            tertiary: {
                title: "Higher/Vocational Education",
                age: "18+ years",
                type: "TAFE, University, Vocational Training",
                desc: "TAFE, university or vocational training for degrees or certificates.",
                detailTitle: "Higher Education Details",
                details: [
                    {
                        icon: "account_balance",
                        title: "Education Types",
                        content: "Universities: Degrees; TAFE: Certificates & diplomas."
                    },
                    {
                        icon: "monetization_on",
                        title: "Tuition Fees",
                        content: "HECS-HELP for citizens; Full fee for internationals; Scholarships available."
                    },
                    {
                        icon: "explore",
                        title: "Major Universities",
                        content: "Monash, Melbourne, Deakin, Swinburne, La Trobe, RMIT, etc."
                    }
                ]
            }
        },
        questions: {
            modalTitles: [
                "Early Childhood Education FAQs",
                "Primary Education FAQs",
                "Secondary Education FAQs",
                "Higher Education FAQs"
            ],
            early: [
                { question: "What type of education should my 3-year-old child attend?", answer: "3-year-olds can begin Kindergarten with 15 free hours/week; Childcare centers also an option." },
                { question: "How do I apply for kindergarten subsidies?", answer: "Apply via Centrelink for CCS; amount based on income, service type, hours." },
                { question: "How do I choose the right kindergarten?", answer: "Consider location, pedagogies, ratios, fees; visit and read reviews." }
            ],
            primary: [
                { question: "My child is 6 years old, what should I prepare now?", answer: "Enroll in Prep, get uniforms, supplies, attend orientation, build self-care skills." },
                { question: "How do I choose a primary school?", answer: "Public uses zonal enrolment; private requires applications and interviews; consider reputation and programs." },
                { question: "What is assessment/reporting?", answer: "Continuous assessments; two reports/year; NAPLAN in Years 3 & 5; parent-teacher meetings." }
            ],
            secondary: [
                { question: "Transition tips primary to secondary?", answer: "Apply early, attend transition events, develop organization and emotional support." },
                { question: "Differences between VCE and VCAL?", answer: "VCE for uni (ATAR); VCAL vocational focus; integrated into flexible VCE from 2023." },
                { question: "How to prepare for VCE exams?", answer: "Study plans, past papers, health support, tutoring, workshops." }
            ],
            tertiary: [
                { question: "How to apply to universities?", answer: "Use VTAC, submit up to 8 preferences, pay fee, accept offer; internationals via agents or direct." },
                { question: "TAFE vs university?", answer: "TAFE vocational certificates diplomas; uni degrees; shorter TAFE courses; credit pathways." },
                { question: "Financial assistance?", answer: "HECS-HELP, FEE-HELP, scholarships, Austudy, part-time work, budget plans." }
            ]
        }
    },
};