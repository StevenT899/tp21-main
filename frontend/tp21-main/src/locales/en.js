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
        paragraph1: 'School is more than academics — it’s where children grow and belong. Every child deserves to feel safe, seen, and supported at school. We hope this tool makes it just a little easier — for you, and for them.',
        signature: '—NewBee Edu Team'
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
            description: 'ICSEA is a number that shows the average education and income background of families at a school. It helps give context, but it’s not a score of how “good” a school is.',
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
            description: 'ICSEA is a number that shows the average education and income background of families at a school. It helps give context, but it’s not a score of how “good” a school is.',
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
            description: 'ICSEA is a number that shows the average education and income background of families at a school. It helps give context, but it’s not a score of how “good” a school is.',
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
            title: "Victorian Education Journey Map",
            subtitle: "A Complete Education Journey from Kindergarten to University",
            kangarooGuide: "Hello! I'm the Victorian Education Kangaroo. Click each card for details, or ask me any questions!",
            tutorialHint: "Click on each stage card for details, swipe to see more"
        },
        stages: {
            early: {
                title: "Early Childhood Care",
                age: "Ages 0-5",
                desc: "Early childhood education supports your child's development before formal school begins.\n It includes childcare, kindergarten and play-based learning programs-often the first step in settling into Australian life.\n Starting early can help your child build confidence, social skills, and get ready for primary school.",
                
                whatTheyLearn: {
                    0:'Play-based learning, communication, early literacy and numeracy',
                    1:'Social development, emotional regulation, independence',
                },
                keyTiming: {
                    0:'Age 3-4: Enrol in funded kindergarten (15 hours/week)',
                    1:'Age 4-5: Attend preschool (Prep readiness)',
                    2:'Some kindergartens require registration 1 year in advance'
                },
            },
            primary: {
                title: "Primary School",
                age: "Ages 5-12",
                desc: "Primary school marks the start of formal education in Victoria.\n Children usually begin at age 5 (in Prep) and continue to Year 6.\n Government schools are free for local students and zoned by address.\n This stage lays the foundation for academic skills, social learning and emotional wellbeing.",
                whatTheyLearn: {
                    0:'English, Mathematics, Science, Humanities, Arts, Health & PE',
                    1:'Communication, teamwork, responsibility',
                },
                keyTiming: {
                    0:'Prep enrolment: Apply the year before (by August)',
                    1:'School year divided into 4 terms',
                    2:'NAPLAN: Conducted in Years 3 and 5, assessing reading, writing, spelling and numeracy',
                    3:'Grade 6: Transition information for secondary school usually begins mid-year'
                },
            },
            secondary: {
                title: "Secondary School",
                age: "Ages 12-18",
                desc: "Secondary school prepares students for life after school-whether that's further study, training, or work.\n It begins in Year 7 (around age 12) and continues to Year 12.\n Students can attend local schools, selective schools or schools with specific programs.",
                whatTheyLearn: {
                    0:'Years 7-10: Broad subjects, critical thinking, digital skills',
                    1:'Years 11-12: VCE or VCE VM (focus on exams or practical skills)',
                    2:'Students may sit the ATAR for university entry',
                },
                keyTiming: {
                    0:'Applications for selective schools usually open in Year 6',
                    1:'Year 10: Career planning and subject selection for VCE',
                    2:'Year 12: Apply for university via VTAC (July-September)',
                },
            },
            tertiary: {
                title: "Teriary Education",
                age: "18+ years",
                desc: "After secondary school, students can continue their education through university or vocational training (TAFE).<br><strong>University</strong> focuses on theory and degrees <br><strong>TAFE</strong> is more practical and job-oriented.<br> Both paths can lead to careers or further study.",
                whatTheyLearn: {
                    0:'University: Academic knowledge, research, professional qualifications',
                    1:'TAFE: Practical skills, apprenticeships, industry certificates',
                },
                keyTiming: {
                    0:'Year 12: Apply via VTAC for most university and TAFE courses',
                    1:'Some courses require early preparation (e.g., art, medicine)',
                    2:'Study starts early in the year (Feb-March)',
                },
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