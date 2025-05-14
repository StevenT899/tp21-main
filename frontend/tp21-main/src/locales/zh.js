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
            title: '在维州成长：孩子的教育路径',
            description: '本页面将向您展示维多利亚州教育体系的关键阶段——从Prep到小学及其后的学习旅程，更好支持孩子的每一步发展。',
        }
    },
    journeyMap: {
        journey: {
            kangarooGuide: "你好！我是你的 SchoolMate 袋鼠，准备好了吗？我们一起探索孩子在维州的学习旅程吧！点击卡片可以看到更多信息。",
            tutorialHint: "点击每个阶段卡片查看详情，左右滑动查看更多"
        },
        cardFront: {
            checklistButton: "入学清单"
        },
        cardBack: {
            whatTheyLearn: "学习内容：",
            keyTiming: "关键时间点:",
            relatedQuestions: "相关问题"
        },
        stages: {
            early: {
                title: "幼儿教育阶段",
                age: "0-5岁",
                desc: "幼儿教育是在孩子正式入学前的重要启蒙阶段，包含托儿所、幼儿园及以游戏为基础的学习项目。\n  这通常是移民家庭孩子适应澳洲生活的第一步，有助于培养他们的社交能力、自信心和学校适应力。",
                whatTheyLearn: {
                    0: "游戏为基础的认知发展",
                    1: "早期沟通能力、基础识字与算数",
                    2: '独立自主性与情绪表达',
                },
                keyTiming: {
                    0: "3–4 岁：报名政府资助幼儿园（每周15小时）",
                    1: "4–5 岁：参加学前班（为Prep做准备）",
                    2: "某些幼儿园需提前1年注册"
                },
                kangarooTip: "每一次玩耍与探索，都是成长的第一步。伟大的旅程，就从这里悄悄开始。"
            },
            primary: {
                title: "小学阶段",
                age: "5-12岁",
                desc: "小学是澳洲正式义务教育的起点，通常从5岁的 Prep 年级开始，一直到6年级。\n 本地学生按居住地址被分配到对应的政府学校，公立学校免费。\n 这一阶段为孩子打下语言、数学、逻辑与社交的基础，是培养自学能力和团队协作的关键时期。",
                whatTheyLearn: {
                    0: "核心课程：英语、数学、科学、人文、健康与体育、艺术",
                    1: "重点培养：批判性思维、沟通能力、合作精神、文化理解",
                },
                keyTiming: {
                    0: "Prep 报名：需在前一年的年底前申请，通常7月截止",
                    1: "每学年分为四个学期",
                    2: "NAPLAN 全国统一评测：在3年级与5年级进行，评估阅读、写作、拼写与数学能力",
                    3: "6年级：开始接受中学过渡信息和升学建议"
                },
                kangarooTip: "背上书包，带着满满的好奇心，出发去发现更大的世界吧！"
            },
            secondary: {
                title: "中学阶段",
                age: "12-18岁",
                desc: "中学阶段帮助学生为未来升学、职业或生活做准备，分为初中（7–10年级）和高中（11–12年级）。\n 可以进入本区学校、精英中学或具有特殊项目的学校。\n 课程逐步从通识转向个人兴趣发展，是学生形成自我认同与职业方向的重要阶段。",
                whatTheyLearn: {
                    0: '7–10年级：广泛的通识课程，培养逻辑思维与数字素养',
                    1: '11–12年级：选择 VCE（大学路径）或 VCE VM（实践路径）课程',
                    2: '12年级：如申请大学，需参加ATAR评估',
                },
                keyTiming: {
                    0: '6年级：可申请精英中学或特长项目，报名时间集中在年中',
                    1: '10年级：开始职业规划与VCE课程选择',
                    2: '12年级：通过 VTAC 提交大学志愿（7月至9月）',
                },
                kangarooTip: "知识在前，梦想在心，我会一路陪你走向未来。"
            },
            tertiary: {
                title: "高等/职业教育阶段",
                age: "18岁以上",
                desc: "完成中学后，学生可以选择进入大学或TAFE职业教育。<br><strong>大学</strong>更注重学术研究和专业资格<br><strong>TAFE</strong>更注重实践技能、行业认证与就业导向。<br>两者都可以通向职业发展或继续深造。",
                whatTheyLearn: {
                    0: "大学： 学术课程、研究训练、专业文凭（如教育、工程、商科等）",
                    1: "TAFE： 实用技能训练、短期证书课程、学徒制"
                },
                keyTiming: {
                    0: "12年级学生通过 VTAC 同时申请大学和TAFE课程",
                    1: "某些专业（如艺术、护理、教育）需提前准备面试、作品集或额外测试",
                    2: "大部分课程在次年2–3月开学"
                },
                kangarooTip: "未来无限宽广，适合你的就是最好的。"
            },

        },
        checklist: {
            early: {
                title: "幼儿园/托儿所",
                items: [
                    "家长身份证或Medicare卡",
                    "儿童出生证明或其他身份文件",
                    "儿童健康和免疫接种状况证明",
                    "地址证明",
                    "关于您本人及其他父母、照护人或监护人的信息",
                    "可接送孩子的人员信息",
                    "与儿童照护或安全相关的法院命令或法律事宜",
                    "托儿补助金（Child Care Subsidy）申请（如符合条件）"
                ]
            },
            primary: {
                title: "公立小学",
                items: [
                    "家长身份证或Medicare卡",
                    "家长及紧急联系人信息",
                    "儿童出生证明或护照",
                    "儿童免疫接种记录",
                    "儿童健康信息（过敏或疾病情况）",
                    "与儿童照护或安全相关的法院命令或法律事宜",
                    "地址证明",
                    "报名申请表"
                ]
            },
            secondary: {
                title: "公立中学",
                items: [
                    "家长身份证或Medicare卡",
                    "家长及紧急联系人信息",
                    "学生出生证明或护照",
                    "学生免疫接种记录",
                    "学生健康信息（过敏或疾病情况）",
                    "与学生照护或安全相关的法院命令或法律事宜",
                    "地址证明",
                    "报名申请表"
                ]
            },
            tertiary: {
                title: "职业技术学院（TAFE）",
                items: [
                    "学生唯一识别码（Unique Student Identifier）",
                    "出生证明或护照",
                    "健康信息",
                    "在线评估*",
                    "申请表*"
                ]
            }
        },
        relatedQuestions: {
            early: {
                title: "幼儿阶段",
                q1: "有哪些类型的幼儿园项目？",
                q2: "我的孩子是否有资格每周享受15小时的免费三岁幼儿园？"
            },
            primary: {
                title: "小学阶段",
                q1: "什么是学区？我该如何查找属于我的学校？",
                q2: "什么是NAPLAN考试？",
                q3: "什么是语言项目？"
            },
            secondary: {
                title: "中学阶段",
                q1: "什么是VCE（维州高中学历）？",
                q2: "什么是ATAR（澳洲大学排名分数）？"
            },
            tertiary: {
                title: "高等教育阶段",
                q1: "我什么时候应该决定读TAFE还是大学？",
                q2: "职业教育和培训（VET）课程可以作为进入大学的途径吗？"
            }
        }
    },
    checklist: {
        title: "入学清单",
        instruction: "请勾选您已准备的项目：",
        reference: "参考与许可：",
        referenceById: {
            0: "https://www.vic.gov.au/how-enrol-kindergarten",
            1: "Enrolling in Foundation (Prep) {'|'} vic.gov.au (www.vic.gov.au)",
            2: "Moving from primary to secondary school {'|'} vic.gov.au (www.vic.gov.au)",
            3: "TAFE Victoria {'|'} vic.gov.au (www.vic.gov.au)",
        },
        exportWord: "导出为 Word",
        exportExcel: "导出为 Excel",
    },

    supportView: {
        Header: {
            title: '在维州成长：孩子的教育路径',
            description: '提出问题或浏览常见主题，了解维多利亚州的教育运作方式——从招生到课程设置。输入您的问题即可开始。',
        },

        Placeholder: '请输入您的问题...',
        searchButton: '搜索',
        tryAskingTitle: '你可能想问的',

        supportView: {
            tryAsking1: "什么是 NAPLAN？",
            tryAsking2: "ICSEA 是什么意思？为什么它很重要？",
            tryAsking3: "学校的报名截止时间是什么时候？",
            tryAsking4: "什么是独立学校"
        },
        frequentAskTitle: '常用问题',
    },
    articleDetailView: {
        button: {
            goBack: '< 返回'
        },
        refer: "参考与许可",
        adapt: "来源：",
        under: "来自",
        loading: '加载中...'
    },
    articles: {
        "1": {
            "topic": "维多利亚州的小学分为哪些类型？",
            "content": "在维州，家长可以选择以下几类小学：\\n政府学校（公立）：免费开放，任何孩子都可以就读。大多数孩子就读于离家最近的“指定邻里学校”（Designated Neighbourhood School）。\\n天主教学校：通常由教会资助，重视宗教价值观。一般需要缴纳一定学费，但比私立学校便宜。\\n独立学校（私立）：学校自主确定课程结构和学费，有些强调学术，有些重视艺术或体育等特色项目。\\n您可以自由选择适合自己家庭的学校类型。但对于公立学校，学区内的学生会优先被录取。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/types-schools"
        },
        "2": {
            "topic": "什么是单一性别学校？",
            "content": "单一性别学校是指只招收男生或只招收女生的学校。\\n这类学校的教学环境和方法可能根据性别进行调整，以适应特定性别学生的学习需求。\\n在维州，政府和私立学校系统中都可能存在单一性别学校。部分家庭选择这类学校，是因为他们认为这样可以让孩子更专注或更自在地学习。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.study.vic.gov.au/en/international-student-program/schools-and-programs/victorias-education-system"
        },
        "3": {
            "topic": "维多利亚州私立学校的学费是多少？",
            "content": "维多利亚州的私立学校根据地理位置、学校声誉、设施和课程重点的不同，收费差异较大。\\n学费可能从几千澳元到每年几万澳元不等。有些学校还会额外收取校服费、校外活动费或专项课程费。\\n建议家长直接联系学校，获取最新的学费信息。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-costs-and-fees"
        },
        "4": {
            "topic": "什么是社区语言学校？",
            "content": "社区语言学校是非营利性机构，主要教授学生的母语或家庭中常用的语言。它们帮助孩子保留文化认同感，并加强与家庭和社区的沟通。\\n这类学校通常在放学后或周末授课，课程涵盖超过45种语言。\\n维州政府支持着全州180多所社区语言学校，注册学生超过3.9万人。家长可自愿让孩子参加，很多学校由本地文化社团主办。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/community-language-schools"
        },
        "5": {
            "topic": "什么是特殊教育学校？",
            "content": "特殊教育学校为有残障或显著学习障碍的学生提供专门支持。这些学校会为学生量身定制学习计划，提供治疗服务和支持性学习环境。\\n维州设有多种类型的特殊学校，例如自闭症学校、智力障碍学校或身体障碍学校。部分普通学校也设有融合教育单元，为特殊学生提供额外的帮助。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.schoolbuildings.vic.gov.au/specialist-schools"
        },
        "6": {
            "topic": "什么是独立学校？",
            "content": "独立学校是由独立董事会管理的非政府学校。\\n它们拥有高度的自主权，可自行设定课程、收费标准和学校政策，常有明确的教学特色或宗教背景。\\n有的学校注重学术，有的强调艺术或科学等专项课程。\\n尽管私立学校的学费通常比其他学校更贵，但部分学校提供奖学金或助学金。\\n在维州，约有15%的学生就读于独立学校，这些学校的教学方式和价值观更加多元且灵活。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://is.vic.edu.au/independent-schools/"
        },
        "7": {
            "topic": "什么是学区？我如何查找自己学区内的学校？",
            "content": "学区（school zone） 是围绕某所学校划定的地理范围，居住在该区域的学生有权入读该校。\\n每一所维州政府学校（公办学校）都有一个学区，住在该范围内的孩子可优先入学。\\n您可以通过维州教育官网的 Find My School 工具或者本网站输入地址，查看自己属于哪个学区以及对应的学校。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-zones"
        },
        "8": {
            "topic": "什么是“指定邻里学校”（Designated Neighbourhood School）？",
            "content": "指定邻里学校（DNS） 是您住家地址所对应的政府学校，通常是直线距离最近的一所。\\n居住在该学区内的孩子有权入读该校，学校必须接收所有来自学区的学生，即使学位紧张。\\n您也可以申请其他学校，但学区外的申请不一定会被接收。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-zones"
        },
        "9": {
            "topic": "学区会随时间变化吗？",
            "content": "会的。随着新学校的开设、学生人口迁移或政策调整，学区划分可能会发生变化。\\n政府会调整学区，以确保教育资源公平分配。\\n建议家长在每年报名前重新确认所处学区信息。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-zones"
        },
        "10": {
            "topic": "什么是“非标准学区”？",
            "content": "非标准学区（non-standard catchment） 是指某些学校的招生区域不按照常规地理范围划定。 这通常适用于服务特定人群的学校，例如提供语言支持、特殊教育或专项课程的学校。\\n此类学校的录取更侧重学生是否符合特定资格条件，而不仅仅看住址。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-zones"
        },
        "11": {
            "topic": "学校的空余名额如何影响入学？",
            "content": "政府学校必须接收本学区内的所有学生，即使学校已接近满额。\\n但对于学区外的学生，学校只会在安置完本区学生后 若仍有空位才可能录取。\\n每所学校的空位情况每年不同，受欢迎的学校常常很快就满。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-zones; https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "12": {
            "topic": "我可以申请学区以外的学校吗？",
            "content": "可以。您可以申请任何一所政府学校，即使它不在您所属的学区范围内。\\n但学校会优先录取本学区的学生。学区外的申请只有在学校接受完本学区的学生后有空位时才会被考虑。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "13": {
            "topic": "我可以同时申请多所学校吗？",
            "content": "可以。您可以同时向多所学校提交申请。\\n每所学校可能要求填写单独的申请表，并提供地址证明等材料。\\n建议您仔细查阅各校的要求和截止日期。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "14": {
            "topic": "如果学校已满，我该怎么办？",
            "content": "如果学校已满，它仍然必须接收所有来自本学区的学生。\\n学区外的学生可能会被列入等候名单。\\n您可以直接联系学校了解最新情况，或考虑周边其他学校作为备选。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "15": {
            "topic": "如果我的住址属于多个学区怎么办？",
            "content": "如果您的住宅地址落在两个或多个学区范围内，您的孩子有权选择其中任何一所学校就读。\\n这种情况通常出现在学区边界或多个学区重叠的区域。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/school-zones"
        },
        "16": {
            "topic": "如何为孩子办理入学？",
            "content": "您可以联系学校索取入学申请表，或从维州教育部官网下载。\\n提交申请时需要填写表格，并附上地址证明、身份证明和疫苗接种记录等文件。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "17": {
            "topic": "入学申请截止日期是什么时候？",
            "content": "对于 Prep（小学第一年）入学申请，多数学校要求在第二学期结束前（通常是六月）提交。\\n不同学校的截止时间可能略有不同，建议提前咨询目标学校。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/starting-primary-school-victoria"
        },
        "18": {
            "topic": "入学的“100 分地址验证”指的是什么？",
            "content": "学校可能要求提供累计达 100 分的地址证明文件，如租赁合同、水电账单、银行信件等。\\n每类文件的分值不同，这是用于验证居住地址的真实性。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/guidance/address-verification"
        },
        "19": {
            "topic": "入学申请需要哪些材料？",
            "content": "可能需要提交的材料包括：\\n地址证明\\n孩子的出生证明或护照\\n疫苗接种记录\\n签证信息（如适用）",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "20": {
            "topic": "如果办理入学时出现延迟了怎么办？",
            "content": "若在办理入学过程中受阻，建议及时与学校保持沟通。\\n您也可以联系维州教育部获取建议，或同时考虑其他附近学校作为备选。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "21": {
            "topic": "如果孩子没有被学校录取怎么办？",
            "content": "无论学校是否已经满员，您的孩子始终有权入读学区内的指定学校。\\n如果您被学区外的学校拒绝，建议您可以选择学区学校，或继续申请有空位的其他学校。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "22": {
            "topic": "我的孩子可以同时入学多所学校吗？",
            "content": "不可以。虽然您可以为孩子可以申请多所学校，但孩子每次只能在一所学校注册入学。\\n一旦确认入学，其他学校的名额应主动放弃。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/enrolment/policy"
        },
        "23": {
            "topic": "什么是 ICSEA，它为什么重要？",
            "content": "ICSEA 是 “社区社会教育优势指数”（Index of Community Socio-Educational Advantage）的缩写，用来反映一所学校学生在教育方面的整体家庭背景优势。\\nICSEA会参考以下因素：\\n家长的学历\\n家长的职业类型\\n学校所在的位置（城市/偏远）\\n原住民学生的比例\\nICSEA分数通常在 500 到 1300 之间，1000 是全国平均水平。分数越高，表示学生群体整体教育资源越丰富；分数越低，表示相对教育劣势较大。\\nICSEA 有什么用？\\n它帮助家长了解学校学生的家庭背景水平，也可以在查看NAPLAN成绩时，更公平地对比不同学校的表现（因为背景相似的学校比较才有意义）。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://myschool.edu.au/media/1820/guide-to-understanding-icsea-values.pdf"
        },
        "24": {
            "topic": "维多利亚州的小学课程设置是怎样的？",
            "content": "维州小学课程结构基于“维州课程标准”（Victorian Curriculum），适用于所有公立学校和多数私立学校。该体系规定了 Prep（学前班）至 10 年级学生应掌握的学习内容。\\n小学阶段的核心课程包括：英语、数学、科学、健康与体育、人文学科、艺术和语言课程。\\n此外，课程还强调跨学科能力的培养，如批判性思维、跨文化理解和道德认知，帮助学生全面发展。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/starting-primary-school-victoria"
        },
        "25": {
            "topic": "什么是 NAPLAN 测试？",
            "content": "NAPLAN 是“全国读写算术评估计划”的简称，在澳大利亚所有学生在三、五、七和九年级的第二学期分别会进行一次测试，全国所有学生在相同年级都做相同测试。\\n该测试旨在评估学生在阅读、写作、拼写、语法和数学方面的基础能力发展情况。\\n学校和家长都能收到学生的成绩报告，从而了解孩子的学习情况，也帮助教师调整教学策略。\\nNAPLAN成绩不会影响学生成绩单，但能为家长和老师提供有效反馈，发现学生需要加强的领域。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.myschool.edu.au/naplan-explained"
        },
        "26": {
            "topic": "什么是 VCE（维州高中毕业证书）？",
            "content": "VCE（Victorian Certificate of Education）并不是一门单独的考试，而是维州高中生在11和12年级期间完成的一项学习计划，完成后可获得官方的高中毕业认证。\\nVCE是一个为期两年的课程体系。学生需要选修多个学术课程（如英语、数学、科学）或实践课程（如技术、商业、艺术等）。\\n学习期间，学生需完成学校布置的作业、测试、项目或实验等，并在部分科目中参加 12 年级期末统考（VCE External Exams）。\\n获得VCE的基本要求包括：\\n完成至少16个单元（units） 的课程\\n包括至少4个英语单元\\n通过课程的校内评估和最终考试（如适用）\\n完成VCE后，学生可以获得ATAR排名分数（用于申请大学），或选择VCE职业主修路径（VCE Vocational Major），更加注重职业技能与实践经验。\\n简而言之，VCE是一个毕业证书，不是一门考试，它是通过连续两年的学习、评估与考试获得的资格，能为学生开启大学、职业培训或就业等多种路径。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vic.gov.au/about-the-Victorian-Certificate-of-Education"
        },
        "27": {
            "topic": "什么是 ATAR？",
            "content": "ATAR（Australian Tertiary Admission Rank） 是澳大利亚的大学入学排名，不是一门考试，而是一个从0.00到99.95的分数，用来表示学生在VCE成绩中相比其他同届学生的排名情况。\\n例如ATAR为80.00，代表该学生的成绩优于维州80%的VCE考生。\\nATAR是在完成12年级后自动计算的，通常用于申请大学。它基于学生在VCE中最好的4门课程（必须包括英语）加上部分第5或第6门课程的成绩得出。\\n不需要单独申请 ATAR，完成VCE后系统会自动计算。\\n如果学生不打算升大学（比如选择TAFE或工作），则不需要关注 ATAR。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.vtac.edu.au/results-offers/atar-explained.html"
        },
        "28": {
            "topic": "我如何了解孩子的学习进度？",
            "content": "学校每学期至少提供一次正式的学习报告，说明孩子在各学科的表现是否达到年级要求。\\n此外，学校通常每年会安排两次家长会，您也可以随时申请与老师见面交流孩子的学习情况。\\n部分学校还会使用线上平台，定期更新学生作业和课堂表现。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/reporting-student-achievement/guidance/reporting-parents-and-carers-general-information"
        },
        "29": {
            "topic": "什么是 EAL，它为什么重要？",
            "content": "EAL 是“English as an Additional Language”的缩写，意思是“额外语言学习英语”。这个术语指的是那些在英语之外，还有其他母语的学生，尤其是来自移民或难民家庭的孩子。\\n在维州的学校里，EAL课程旨在帮助这些孩子提高英语水平，让他们更好地听懂课堂内容、表达自己的想法，并在学习中取得成功。EAL支持可能包括额外的英语课程、双语教师或专门的学习资料。\\nEAL支持非常重要，因为它能增强孩子的自信，帮助他们更好地学习，并全面参与学校生活。同时也有助于家长了解学校、融入澳洲的教育体系。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.schools.vic.gov.au/eal"
        },
        "30": {
            "topic": "什么是语言课程？",
            "content": "在维州的学校里，语言课程是一种系统的方式，让学生学习英语以外的语言。这些课程可以帮助孩子提高沟通能力，并了解不同文化。\\n语言课程主要分为几种类型：\\n独立语言课程：语言作为一门独立学科进行教学（最常见）。\\nCLIL 课程（内容与语言融合学习）：用目标语言教授如科学等其他课程内容。\\n双语课程：学生每周至少有450分钟的时间，在英语和另一种语言中双语学习。\\nVET/VCAL 应用语言课程：更注重实际生活和职场语言运用。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/languages-education/guidance/languages-data-and-research"
        },
        "31": {
            "topic": "EAL学生的学习进展是如何评估的？",
            "content": "在维州学校，EAL（英语为额外语言）学生的评估方式与英语母语学生不同。老师会使用EAL课程大纲来评估学生在听、说、读、写方面的英语进展。\\n老师会观察学生是否能够：\\n理解课堂指令\\n用英语与他人沟通\\n阅读和书写与课程相关的内容\\n学生的进展会被记录在一个名为EAL学习发展路径图的报告中，帮助老师为每位学生设计合适的教学计划。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www.schools.vic.gov.au/eal"
        },
        "32": {
            "topic": "哪些学校提供多语言支持课程？",
            "content": "维州大多数公立学校都开设了语言课程。2020年，约88.5%的学校提供语言课程，常见语言包括中文（普通话）、日语、意大利语、印尼语和Auslan（澳洲手语）等，覆盖15种语言。\\n有些学校还有双语课程或CLIL课程，另外，维州语言学校（VSL）也提供课后和远程学习服务，涵盖50多种语言。\\n您可以在本网站的主页、查看目标学校的网站或维州教育厅的官方信息，了解该校提供哪些语言。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/languages-education/guidance/languages-data-and-research"
        },
        "33": {
            "topic": "如何为孩子报名语言课程？",
            "content": "当您为孩子报名小学或中学时，可以直接询问学校是否有语言课程。很多学校会将语言学习安排在每周课程中。\\n如果学校没有您孩子感兴趣的语言，也可以考虑报名维州语言学校（VSL），它提供周末或线上语言课程，涵盖50多种语言。\\n您可以向学校咨询，或访问维州教育厅网站了解申请流程。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/languages-education/guidance/languages-data-and-research"
        },
        "34": {
            "topic": "EAL项目只为移民家庭的孩子设立吗？",
            "content": "不是。EAL项目面向所有在家使用非英语语言、在学习英语方面需要支持的学生，不论其是否为移民家庭。这也包括出生在澳洲但在家讲其他语言的孩子。",
            "licence": "CC BY 4.0 licence.",
            "reference": "https://www2.education.vic.gov.au/pal/languages-education/guidance/languages-data-and-research"
        }
    }
};