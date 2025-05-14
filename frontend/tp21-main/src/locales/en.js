
import SearchingSupport from "@/views/SearchingSupport.vue";

import FrequentAsk from "@/components/FrequentAsk.vue";


export default {
    nav: {
        home: 'Home',
        compare: 'Compare',
        journey: 'Journey',
        support: 'Support',
        english: 'English',
        chinese: '中文'
    },
    footer: {
        acknowledgment: "NewBee Edu acknowledges the Traditional Owners of the lands on which we work. We recognize their spiritual and cultural connection to country and we pay our respects to Elders past, present and emerging."
    },
    schoolTypes: {
        Catholic: "Catholic",
        Government: "Government",
        Independent: "Independent"
    },
    schoolTypesSchool: {
        Catholic: "Catholic School",
        Government: "Government School",
        Independent: "Independent School"
    },
    languages: {
        "Chinese": "Chinese",
        "Japanese": "Japanese",
        "Indonesian": "Indonesian",
        "Auslan": "Auslan",
        "Spanish": "Spanish",
        "Italian": "Italian",
        "French": "French",
        "German": "German",
        "Aboriginal Languages": "Aboriginal Languages",
        "Korean": "Korean",
        "Greek": "Greek",
        "Vietnamese": "Vietnamese",
        "Hindi": "Hindi",
        "Macedonian": "Macedonian",
        "Turkish": "Turkish"
    },
    chart: {
        labels: {
            notStated: "Not Stated",
            englishBackground: "From English Background",
            otherLanguagesBackground: "From Other Languages Background"
        },
        languages: {
            notStated: "Not Stated",
            english: "English",
            otherLanguages: "Other Languages"
        }
    },
    gender: {
        girl: "Girl",
        boy: "Boy"
    },
    messages: {
        toast: {
            error: {
                invalidSchoolData: 'Invalid school data. Cannot add to compare.',

                noSchoolSelected: 'Please select a school first.',
                schoolNotFound: 'This school is not found.',
                alreadyAdded: 'This school has already been added.',
                fetchFailed: 'Failed to fetch school data.'

            },
            warning: {
                alreadyInCompare: 'Already in your compare list.',
                compareLimit: 'You can only compare up to 3 schools.'
            },
            success: {
                addedToCompare: 'Added to compare!',
                schoolAdded: 'School added successfully!',
                removedFromCompare: 'Removed from your compare list successfully.',
                allSchoolsRemoved: 'All schools have been removed from your compare list.'
            }
        },
        school: {
            na: 'N/A',
            none: 'None'
        }
    },
    homeView: {
        heroTitle: 'Find the Right Primary School for Your Child',
        heroDesc1: 'Explore, compare, and understand Victorian schools. We help migrant families make confident school choices.',
        heroDesc2: 'Use our simple map tool to search schools, see what they offer, and find the best fit for your child — academically, culturally, and practically.',
        heroStart: 'Choose an option to get started!',
        exploreSchools: 'Explore schools',
        suburb: 'Suburb',
        school: 'School',
        checkPrefix: 'Check your {schoolZone}',
        schoolZone: 'school zone',
        searchPlaceholder: 'Enter suburb/ postcode/ school name',
        searchPlaceholder2: 'Enter an address',
        searchButton: 'Search',
        noResult: 'No result found. Please try search for another one!'
    },
    helpSection: {
        title: 'WE ARE HERE TO HELP',
        paragraph1: "School is more than academics — it's where children grow and belong. Every child deserves to feel safe, seen, and supported at school. We hope this tool makes it just a little easier — for you, and for them.",
        signature: '— NewBee Edu Team'
    },
    MapShow: {
        filterSection: {
            schoolType: "School Type",
            languageProgram: "Language Program",
            schoolTypes: {
                Catholic: "Catholic",
                Government: "Government",
                Independent: "Independent"
            },
            languages: {
                "Chinese": "Chinese",
                "Japanese": "Japanese",
                "Indonesian": "Indonesian",
                "Auslan": "Auslan",
                "Spanish": "Spanish",
                "Italian": "Italian",
                "French": "French",
                "German": "German",
                "Aboriginal Languages": "Aboriginal Languages",
                "Korean": "Korean",
                "Greek": "Greek",
                "Vietnamese": "Vietnamese",
                "Hindi": "Hindi",
                "Macedonian": "Macedonian",
                "Turkish": "Turkish"
            },
            filter: "Filter",
            reset: "Reset",
            all: "ALL"
        },
        mapInstruction1: "Click on any ",
        mapInstruction2: "icon on the map to preview key info including",
        mapInstruction3: "and add to compare.",
        mapInstruction4: "Language Program",
        mapInstruction5: "School zone boundaries apply to the 2026 intake year.",
        schoolPopup: {
            viewDetails: "View details",
            addToCompare: "Add to compare",
            schoolTypeLabel: "school",
            isInCompareList: "Already in compare list"
        },
        toast: {
            success: "Success message",
            error: "Error message"
        }
    },
    MapZShow: {
        filterSection: {
            schoolType: "School Type",
            languageProgram: "Language Program",
            filter: "Filter",
            reset: "Reset",
            all: "ALL"
        },
        mapInstruction: "Click on any school icon on the map to preview key info and add to compare.",
        schoolPopup: {
            viewDetails: "View details",
            addToCompare: "Add to compare",
            schoolTypeLabel: "school",
            isInCompareList: "Already in compare list"
        },
        toast: {
            success: "Success",
            error: "Error",
            locationSuccess: "Location updated successfully",
            locationError: "Failed to get location"
        },
        mapControls: {
            getLocation: "Get Current Location"
        }
    },
    compareView: {
        pageHeader: {
            title: 'COMPARE YOUR SELECTED SCHOOLS',
            description: 'You can select up to 3 schools. See how they compare side-by-side.',
            description2: 'School data reflects the status as of 2024, based on official datasets.'

        },
        schoolCard: {
            removeButton: 'Remove School',
            visitWebsite: 'Visit school website',
            schoolType: 'School Type',
            yearRange: 'Year Range',
            languageProgram: 'Language Program',
            none: 'None',
            studentPerStaff: 'Student Per Teaching Staff',
            icsea: 'Index of Community Socio-Educational Advantage (ICSEA)',
            icseaTooltip: 'ICSEA reflects the socio-educational background of students. The average is 1000. Higher scores indicate greater advantage.',
            enrolments: 'Enrolments',
            totalEnrolment: 'Total enrolment:',
            searchToAdd: 'Search To Add A School',
            searchPlaceholder: 'Enter school name ',
            addToCompare: 'Add to compare'
        },
        confirmationModal: {
            title: 'Remove School',
            message: 'Are you sure you want to remove this school from the comparison?',
            remove: 'Remove',
            cancel: 'Cancel'
        },
        toast: {
            success: 'Success message (you can customize this)',
            warning: 'Warning message (you can customize this)'
        },
        languageProgram: {
            title: 'What is a Language Program?',
            description: 'A language program in government primary schools offers students the opportunity to learn a language other than English. These programs help students develop language skills, support cultural diversity.',
            readMore: 'Read More'
        },
        icseaModal: {
            title: 'What is an ICSEA?',
            description: "ICSEA is a number that shows the average education and income background of families at a school. It helps give context, but it's not a score of how “good” a school is.",
            readMore: 'Read More'
        },
    },
    CompareSideBar: {
        header: 'Added List ({count}/3)',
        schoolInfo: {
            type: '{type}',
            suburb: 'Suburb: {suburb}'
        },
        removeButton: 'Remove',
        removeAllButton: 'Remove All',
        compareButton: 'Compare'
    },
    ModalBox: {
        languageProgram: {
            title: 'What is a Language Program?',
            description: 'A language program in government primary schools offers students the opportunity to learn a language other than English. These programs help students develop language skills, support cultural diversity.',
            readMore: 'Read More'
        },
        icseaModal: {
            title: 'What is an ICSEA?',
            description: "ICSEA is a number that shows the average education and income background of families at a school. It helps give context, but it's not a score of how “good” a school is.",
            readMore: 'Read More'
        },
        schoolZone: {
            title: 'What is a school zone?',
            description: 'School zones are government-set areas that decide which local school your child can attend based on your address.',
            readMore: 'Read More'
        }
    },
    SchoolDetail: {
        loading: 'Loading...',
        visitSchoolWebsite: 'Visit school website',
        addToCompare: 'Add to compare',
        schoolType: 'School Type',
        yearRange: 'Year Range',
        schoolZoneCheck: 'School Zone Check',
        useLocation: '📍 Use Location',
        inSchoolZone: 'This school is in your school zone',
        notInSchoolZone: 'This school is not in your school zone',
        SchoolZoneError: 'Error, unable to check location',
        languageProgram: {
            title: 'Language Program',
            modal: {
                title: 'What is a Language Program?',
                description: 'A language program in government primary schools offers students the opportunity to learn a language other than English. These programs help students develop language skills, support cultural diversity.',
                readMore: 'Read More'
            },
            noLanguages: 'None',
            studentCulturalBackground: 'Student Cultural Background',
            studentCulturalBackgroundDesc: 'of students at the school are from language backgrounds other than English'
        },
        staffAndEnrolment: {
            schoolStaff: 'School Staff',
            teachingStaff: 'Teaching staff',
            nonTeachingStaff: 'Non-teaching staff',
            studentEnrolment: 'Student Enrolment',
            totalEnrolment: 'Total Enrolment',
            studentPerTeachingStaff: 'Student per teaching staff'
        },
        icseaModal: {
            title: 'What is an ICSEA?',
            description: "ICSEA is a number that shows the average education and income background of families at a school. It helps give context, but it's not a score of how “good” a school is.",
            readMore: 'Read More'
        },
        icseaTitle: "Index of Community Socio-Educational Advantage (ICSEA)",
        icseaInfo: 'Higher than {percentile}% of primary schools in Victoria',
    },
    journeyView: {
        pageHeader: {
            title: 'YOUR CHILD\'S EDUCATIONAL JOURNEY IN VICTORIA',
            description: 'Not sure what lies ahead in your child\'s school years? This page shows you the key stages in Victoria\'s education system — from Prep to primary and beyond — so you can feel more prepared to support your child every step of the way.',
        }
    },
    journeyMap: {
        journey: {
            kangarooGuide: "G'day! I'm your SchoolMate Kangaroo. Let's hop through the stages of school life in Victoria, one step at a time. Now try clicking a card for more details.",
            tutorialHint: "Click on each stage card for details, swipe to see more"
        },
        cardFront: {
            checklistButton: "Enrolment checklist"
        },
        cardBack: {
            whatTheyLearn: "What they learn:",
            keyTiming: "Key timing:",
            relatedQuestions: "Related questions"
        },
        stages: {
            early: {
                title: "Early Childhood Care",
                age: "Ages 0-5",
                desc: "Early childhood education supports your child's development before formal school begins.\n It includes childcare, kindergarten and play-based learning programs-often the first step in settling into Australian life.\n Starting early can help your child build confidence, social skills, and get ready for primary school.",

                whatTheyLearn: {
                    0: 'Play-based learning, communication',
                    1: 'Early literacy and numeracy',
                    2: 'Social development, emotional regulation, independence',
                },
                keyTiming: {
                    0: 'Age 3-4: Enrol in funded kindergarten (15 hours/week)',
                    1: 'Age 4-5: Attend preschool (Prep readiness)',
                    2: 'Some kindergartens require registration 1 year in advance'
                },
                kangarooTip: "Big journeys start small — play, explore, and grow with every step."
            },
            primary: {
                title: "Primary School",
                age: "Ages 5-12",
                desc: "Primary school marks the start of formal education in Victoria.\n Children usually begin at age 5 (in Prep) and continue to Year 6.\n Government schools are free for local students and zoned by address.\n This stage lays the foundation for academic skills, social learning and emotional wellbeing.",
                whatTheyLearn: {
                    0: 'English, Mathematics, Science, Humanities, Arts, Health & PE',
                    1: 'Communication, teamwork, responsibility',
                },
                keyTiming: {
                    0: 'Prep enrolment: Apply the year before (by August)',
                    1: 'School year divided into 4 terms',
                    2: 'NAPLAN: Conducted in Years 3 and 5, assessing reading, writing, spelling and numeracy',
                    3: 'Grade 6: Transition information for secondary school usually begins mid-year'
                },
                kangarooTip: "It's time for big backpacks and even bigger curiosity!"
            },
            secondary: {
                title: "Secondary School",
                age: "Ages 12-18",
                desc: "Secondary school prepares students for life after school-whether that's further study, training, or work.\n It begins in Year 7 (around age 12) and continues to Year 12.\n Students can attend local schools, selective schools or schools with specific programs.",
                whatTheyLearn: {
                    0: 'Years 7-10: Broad subjects, critical thinking, digital skills',
                    1: 'Years 11-12: VCE or VCE VM (focus on exams or practical skills)',
                    2: 'Students may sit the ATAR for university entry',
                },
                keyTiming: {
                    0: 'Applications for selective schools usually open in Year 6',
                    1: 'Year 10: Career planning and subject selection for VCE',
                    2: 'Year 12: Apply for university via VTAC (July-September)',
                },
                kangarooTip: "Lots to learn, lots to dream — I'll hop beside you."
            },
            tertiary: {
                title: "Teriary Education",
                age: "18+ years",
                desc: "After secondary school, students can continue their education through university or vocational training (TAFE).<br><strong>University</strong> focuses on theory and degrees <br><strong>TAFE</strong> is more practical and job-oriented.<br> Both paths can lead to careers or further study.",
                whatTheyLearn: {
                    0: 'University: Academic knowledge, research, professional qualifications',
                    1: 'TAFE: Practical skills, apprenticeships, industry certificates',
                },
                keyTiming: {
                    0: 'Year 12: Apply via VTAC for most university and TAFE courses',
                    1: 'Some courses require early preparation (e.g., art, medicine)',
                    2: 'Study starts early in the year (Feb-March)',
                },
                kangarooTip: "The future's wide open — take the leap that's right for you."
            }
        },
        checklist: {
            early: {
                title: "For kinder/childcare",
                items: [
                    "Parent ID or Medicare card",
                    "Child's Birth certificate or other identity documents",
                    "Child's Medical health and immunisation status",
                    "Proof of address",
                    "Information about yourself and any other parents, carers or guardians",
                    "Details of people who can collect your child",
                    "Details of any parenting orders or legal matters to do with the care or safety of your child.",
                    "Child Care Subsidy application (if eligible)"
                ]
            },
            primary: {
                title: "Government primary school",
                items: [
                    "Parent ID or Medicare card",
                    "Parent and emergency contact details",
                    "Child's birth certificate or passport",
                    "Child's immunisation history statement",
                    "Child's health information (allergies or illnesses)",
                    "Details of any parenting orders or legal matters to do with the care or safety of your child",
                    "Proof of address",
                    "Application form"
                ]
            },
            secondary: {
                title: "Government secondary school",
                items: [
                    "Parent ID or Medicare card",
                    "Parent and emergency contact details",
                    "Child's birth certificate or passport",
                    "Child's immunisation history statement",
                    "Child's health information (allergies or illnesses)",
                    "Details of any parenting orders or legal matters to do with the care or safety of your child",
                    "Proof of address",
                    "Application form"
                ]
            },
            tertiary: {
                title: "TAFE",
                items: [
                    "Unique Student Identifier",
                    "Birth certificate or passport",
                    "Health information",
                    "Online assessment*",
                    "Application form*"
                ]
            }
        },
        relatedQuestions: {
            early: {
                title: "Early Childhood",
                q1: "What types of kindergarten programs are available?",
                q2: "Is my child eligible for 15 hours of free Three-Year-Old Kinder per week?"
            },
            primary: {
                title: "Primary School",
                q1: "What is a school zone and how can I find schools within my zone?",
                q2: "What is NAPLAN?",
                q3: "What is a language program?"
            },
            secondary: {
                title: "Secondary School",
                q1: "What is the VCE (Victorian Certificate of Education)?",
                q2: "What is the ATAR?"
            },
            tertiary: {
                title: "Tertiary Education",
                q1: "When should I decide whether to go to TAFE or university?",
                q2: "Can I use a VET course as a pathway to university?"
            }
        },
    },



    supportView: {
        Header: {
            title: 'Find answers about schooling in Victoria',
            description: 'Ask a question or browse common topics to learn how education works in Victoria — from enrolment to curriculum and beyond. Type in your question to start.',
        },

        Placeholder: 'What do you need to know?',
        searchButton: 'Search',
        tryAskingTitle: 'Try asking',

        supportView: {
            tryAsking1: "What is NAPLAN?",
            tryAsking2: "What does ICSEA mean and why is it important?",
            tryAsking3: "What are the school enrollment deadlines?",
            tryAsking4: "What is an independent school?"
        },
        frequentAskTitle: 'Frequently Asked Questions',
        frequentAsk1: 'What types of primary schools are available in Victoria?',
       
        toast: {
            warning: 'Search query is empty, please enter your question.'
        },

    },


   


    checklist: {
        title: "Enrolment Checklist",
        instruction: "Tick the items you've prepared:",
        reference: "Reference and licence:",
        referenceById: {
            0: "https://www.vic.gov.au/how-enrol-kindergarten",
            1: "Enrolling in Foundation (Prep) {'|'} vic.gov.au (www.vic.gov.au)",
            2: "Moving from primary to secondary school {'|'} vic.gov.au (www.vic.gov.au)",
            3: "TAFE Victoria {'|'} vic.gov.au (www.vic.gov.au)",
        },
        exportWord: "Export to Word",
        exportExcel: "Export to Excel",
    },
    articleDetailView: {
        button: {
            goBack: '< Back'
        },
        refer: "Reference and Licence:",
        adapt: "Adapted from:",
        under: "Under",
        loading: 'Loading...'
    },
    searchingSupport: {
        button: {
            goBack: '< Back',
            prevPage: 'Previous',
            nextPage: 'Next',
            goTop: 'Top'
        },
        search: {
            resultsFor: 'Search results for',
            displaying: 'Displaying',
            of: 'of',
            results: 'results',
            loadingResults: 'Loading results...'
        },
        pagination: {
            page: 'Page'
        },
        loading: 'Loading...'
    },
    frequentAsk: {
        faqs: [
            {
                question: 'What types of primary schools are available in Victoria?',
                answer: [
                    'Victoria has several types of primary schools:',
                    '• Government (Public) Schools: Free to attend, open to everyone. Most students go to their local school, known as a Designated Neighbourhood School.',
                    '• Catholic Schools: Faith-based schools often connected to local churches. Families usually pay fees, but lower than private schools.',
                    '• Independent (Private) Schools: These schools set their own rules, fees, and programs. Some are faith-based, others are academic or specialist.',
                    'You can choose any type of school, but spots at some schools (especially public ones) depend on where you live.'
                ]
            },
            {
                question: 'What is a school zone and how can I find schools within my zone?',
                answer: [
                    'A school zone is the geographic area around a school that defines which students have a guaranteed right to enrol.',
                    'Every Victorian government school has a zone, and children who live in that zone are entitled to attend that school.',
                    'You can use the official “Find My School” tool or our website to check your home’s school zone and see which schools are available to you.'
                ]
            },
            {
                question: 'How do I enroll my child in school?',
                answer: [
                    'Contact the school directly to request an enrolment form or download it from the Department of Education website.',
                    'You’ll need to fill out the form and provide documents like proof of address, ID, and immunisation history.'
                ]
            },
            {
                question: 'Can I enrol my child in multiple schools simultaneously?',
                answer: [
                    'No. While you can apply to multiple schools, your child can only enrol in one school at a time.',
                    'Once accepted and confirmed, other offers should be declined.'
                ]
            }
        ]
    },
};