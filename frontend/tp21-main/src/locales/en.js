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
            englishBackground: "From English Background'",
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
                alreadyInCompare: 'is already in your compare list.',
                compareLimit: 'You can only compare up to 3 schools.'
            },
            success: {
                addedToCompare: 'added to compare!',
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
        mapInstruction: "Click on any school icon on the map to preview key info and add to compare.",
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
            description: 'You can select up to 3 schools. See how they compare side-by-side.'
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
            type: 'Type: {type}',
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
    }
};