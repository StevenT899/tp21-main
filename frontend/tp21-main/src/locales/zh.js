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
    homeView: {
        heroTitle: '为你的孩子找到合适的小学',
        heroDesc1: '探索、比较并了解维多利亚州的学校。我们帮助移民家庭自信地做出学校选择。',
        heroDesc2: '使用我们简单的地图工具搜索学校，了解他们的特色，并为你的孩子找到最适合的学校 —— 在学术、文化和实际方面。',
        heroStart: '选择一个选项开始吧！',
        exploreSchools: '探索学校',
        checkPrefix: '查看你的 {schoolZone}',
        schoolZone: '学区',
        searchPlaceholder: '输入郊区/邮编/学校名称',
        searchPlaceholder2: '输入地理位置',
        searchButton: '搜索',
        noResult: '未找到结果，请重试！'
    },
    helpSection: {
        title: '我们随时提供帮助',
        paragraph1: '学校不仅仅是学习知识的地方——它是孩子们成长和找到归属感的地方。每个孩子都应该在学校里感到安全、被关注和得到支持。',
        paragraph2: '我们希望这个工具能让您和孩子们的事情变得稍微轻松一些。',
        signature: '—NewBee Edu 团队'
    },
    MapShow: {
        filterSection: {
            schoolType: "学校类型",
            languageProgram: "语言课程",
            filter: "筛选",
            reset: "重置",
            all: "全部"
        },
        mapInstruction: "点击地图上的任何学校图标以预览关键信息并添加到比较列表中。",
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
            description: '你最多可以选择3所学校。看看它们如何进行对比。'
        },
        schoolCard: {
            removeButton: '移除学校',
            visitWebsite: '访问学校网站',
            schoolType: '学校类型',
            yearRange: '年级范围',
            languageProgram: '语言课程',
            none: '无',
            studentPerStaff: '每位教职员工对应的学生数',
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
        header: '已添加用于比较的学校 ({count}/3)',
        schoolInfo: {
            type: '类型: {type}',
            suburb: '郊区: {suburb}'
        },
        removeButton: '移除',
        removeAllButton: '全部移除',
        compareButton: '比较'
    },
    ModalBox:{
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
        schoolZone:{
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
        schoolZoneCheck: '学区检查',
        useLocation: '📍 使用位置',
        inSchoolZone: '这所学校在你的学区内',
        notInSchoolZone: '这所学校不在你的学区内',
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
        icseaInfo: '高于维多利亚州 {percentile}% 的小学',
    }
};