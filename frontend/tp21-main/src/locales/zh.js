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
            title: "维州教育旅程图",
            subtitle: "从幼儿园到大学的完整教育路径",
            kangarooGuide: "你好！我是维州教育袋鼠。点击每张卡片查看详情，有任何问题也可以问我哦！",
            tutorialHint: "点击每个阶段卡片查看详情，左右滑动查看更多"
        },
        cardBack: {
            whatTheyLearn: "学习内容：",
            keyTiming: "关键时间点:"
        },
        stages: {
            early: {
                title: "幼儿教育阶段",
                age: "0-5岁",
                desc: "幼儿教育是在孩子正式入学前的重要启蒙阶段，包含托儿所、幼儿园及以游戏为基础的学习项目。\n  这通常是移民家庭孩子适应澳洲生活的第一步，有助于培养他们的社交能力、自信心和学校适应力。",
                whatTheyLearn: {
                    0: "游戏为基础的认知发展，早期沟通能力、基础识字与算数",
                    1: "独立自主性与情绪表达"
                },
                keyTiming: {
                    0: "3–4 岁：报名政府资助幼儿园（每周15小时）",
                    1: "4–5 岁：参加学前班（为Prep做准备）",
                    2: "某些幼儿园需提前1年注册"
                },
                kangarooTip: "Click to explore early childhood learning!"
            },
            primary: {
                title: "小学阶段",
                age: "5-12岁",
                desc: "小学是维州正规教育的起点。\n孩子通常在5岁开始上Prep年级，直至6年级毕业。\n本地学生可免费就读公立学校，且按住址划分学区。\n此阶段为学术技能、社交学习和情绪健康打下基础。",
                whatTheyLearn: {
                    0: "英语、数学、科学、人文学科、艺术、健康与体育",
                    1: "沟通能力、团队合作、责任感"
                },
                keyTiming: {
                    0: "Prep报名：需在前一年8月前提交申请",
                    1: "学年分为4个学期",
                    2: "NAPLAN：3年级与5年级进行，评估阅读、写作、拼写与数学",
                    3: "6年级：中学过渡信息通常在年中开始提供"
                },
                kangarooTip: "Click to explore early childhood learning!"
            },
            secondary: {
                title: "中学阶段",
                age: "12-18岁",
                desc: "中学阶段帮助学生为未来升学、职业或生活做准备，分为初中（7–10年级）和高中（11–12年级）。\n 可以进入本区学校、精英中学或具有特殊项目的学校。\n 课程逐步从通识转向个人兴趣发展，是学生形成自我认同与职业方向的重要阶段。",
                whatTheyLearn: {
                    0: "7–10年级：广泛的通识课程，培养逻辑思维与数字素养",
                    1: "11–12年级：选择 VCE（大学路径）或 VCE VM（实践路径）课程",
                    2: "12年级：如申请大学，需参加ATAR评估"
                },
                keyTiming: {
                    0: "6年级：可申请精英中学或特长项目，报名时间集中在年中",
                    1: "10年级：开始职业规划与VCE课程选择",
                    2: "12年级：通过 VTAC 提交大学志愿（7月至9月）"
                },
                kangarooTip: "Click to explore early childhood learning!"
            },
            tertiary: {
                title: "高等教育阶段",
                age: "18岁以上",
                desc: "完成中学后，学生可选择继续升学，包括大学或职业教育与培训（TAFE）。<br><strong>大学</strong>更注重理论和学位教育<br><strong>TAFE</strong>则偏重实践技能和就业导向<br>两种路径都可通往职业或更高层次的学习。",
                whatTheyLearn: {
                    0: "大学：学术知识、研究能力、专业资格",
                    1: "TAFE：实践技能、学徒项目、行业证书"
                },
                keyTiming: {
                    0: "12年级：通过VTAC申请大多数大学和TAFE课程",
                    1: "部分课程需提前准备（如艺术、医学）",
                    2: "课程通常在年初（2-3月）开始"
                },
                kangarooTip: "Click to explore early childhood learning!"
            }
        }
    }

};