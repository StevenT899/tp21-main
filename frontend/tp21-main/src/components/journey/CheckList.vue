<!-- /**
  CheckList.vue

  Description:
    Renders a modal checklist interface for users to track their preparation status across education stages.
    Provides export functions for Word and Excel formats using preloaded templates, supports bilingual templates.

  Key Features:
    - Dynamically rendered modal with checklist items based on props
    - Checklist status (ticked/unticked) is stored in sessionStorage for persistence
    - Displays clickable reference and explanation links depending on stage
    - Supports export to Word (.docx) and Excel (.xlsx) using pre-designed templates
    - Bilingual support through i18n translation system
    - Emits 'close' event when modal is dismissed
 / -->
 
<template>
    <div v-if="visible"
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button @click="close"
                class="absolute top-2 right-3 text-gray-600 hover:text-red-400 text-3xl cursor-pointer">
                &times;
            </button>
            <h2 class="text-xl font-semibold mb-4">{{ title }} {{ $t('checklist.title') }}</h2>
            <p class="text-gray-700 mb-4">{{ $t('checklist.instruction') }}</p>
            <!-- checklist -->
            <ul class="text-left space-y-2">
                <li v-for="(item, index) in checklist" :key="index" class="flex items-center space-x-2">
                    <input type="checkbox" v-model="checkedItems[index]" class="accent-blue-500 cursor-pointer"
                        @click.stop />
                    <label @click="toggleItem(index)">{{ item }}</label>
                </li>
            </ul>
            <p :class="['text-gray-700 mt-4 text-sm', props.id === 3 ? 'cursor-pointer hover:underline' : '']"
                @click="handleExplainClick">
                {{ explainText }}
            </p>
            <p class="text-gray-700 mt-4">{{ $t('checklist.reference') }}</p>
            <p class="text-blue-900 mb-4 text-sm cursor-pointer hover:underline" @click="handleReferenceClick">{{
                referenceText }}</p>

            <!-- export features -->
            <button @click="exportToWord"
                class="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-5/6 cursor-pointer block mx-auto">
                {{ $t('checklist.exportWord') }}
            </button>
            <button @click="exportToExcel"
                class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 w-5/6 cursor-pointer block mx-auto">
                {{ $t('checklist.exportExcel') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import JSZipUtils from "jszip-utils";
import JSZip from "pizzip";
import ExcelJS from 'exceljs';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['close']);
const checkedItems = ref([]);


// Explain
const explainText = computed(() => t(`checklist.explainById.${props.id}`))
const explainMap = {
    3: "https://www.vic.gov.au/find-my-local-tafe",
}
const handleExplainClick = () => {
    const url = explainMap[props.id]
    if (url) {
        window.open(url, '_blank')
    }
}

// reference
const referenceText = computed(() => t(`checklist.referenceById.${props.id}`))
const referenceMap = {
    0: "https://www.vic.gov.au/how-enrol-kindergarten",
    1: "https://www.vic.gov.au/enrolling-foundation-prep#rpl-skip-links",
    2: "https://www.vic.gov.au/moving-primary-secondary-school-information-parents-and-carers#moving-to-a-non-government-secondary-school-or-registering-for-home-schooling",
    3: "https://www.vic.gov.au/tafe",
}

const handleReferenceClick = () => {
    const url = referenceMap[props.id]
    if (url) {
        window.open(url, '_blank')
    }
}


const props = defineProps({
    visible: Boolean,
    id: [Number, String],
    title: String,
    checklist: Array,
});

function toggleItem(index) {
    checkedItems.value[index] = !checkedItems.value[index];
}


const storageKey = computed(() => `checklist-${props.id}`);
watch(() => props.checklist, (newList) => {
    const saved = sessionStorage.getItem(storageKey.value);
    if (saved) {
        checkedItems.value = JSON.parse(saved);
    } else {
        checkedItems.value = newList.map(() => false);
    }
}, { immediate: true });

watch(checkedItems, (newVal) => {
    sessionStorage.setItem(storageKey.value, JSON.stringify(newVal));
}, { deep: true });


function close() {
    emit('close');
}

function exportToWord() {
    const titleToTemplateMap = {
        'For kinder/childcare': '/exportFiles/eng/Early Childhood Education (0–5 years) Checklist - Eng.docx',
        'Government primary school': '/exportFiles/eng/Primary School (5–12 years  Prep – Year 6) Checklist - Eng.docx',
        'Government secondary school': '/exportFiles/eng/Secondary School (12–18 years  Year 7 – Year 12) Checklist - Eng.docx',
        'TAFE': '/exportFiles/eng/TAFE (Post-Year 10  Vocational Pathway) Checklist - Eng.docx',
        '幼儿园/托儿所': '/exportFiles/zh/Early Childhood Education (0–5 years) Checklist - CHN.docx',
        '公立小学': '/exportFiles/zh/Primary School (5–12 years  Prep – Year 6) Checklist - CHN.docx',
        '公立中学': '/exportFiles/zh/Secondary School (12–18 years  Year 7 – Year 12) Checklist - CHN.docx',
        '职业技术学院（TAFE）': '/exportFiles/zh/TAFE (Post-Year 10  Vocational Pathway) Checklist - CHN.docx'
    };
    const templatePath = titleToTemplateMap[props.title];
    if (!templatePath) {
        alert('Template not found for this title');
        return;
    }

    const itemsObject = {};
    checkedItems.value.forEach((checked, index) => {
        itemsObject[`item${index}`] = { checked };
    });

    JSZipUtils.getBinaryContent(templatePath, function (error, content) {
        if (error) {
            console.error('Error to load file:', error);
            alert('Error to load file');
            return;
        }

        try {
            const zip = new JSZip(content);
            const doc = new Docxtemplater().loadZip(zip);

            doc.setData(itemsObject);

            doc.render();

            const out = doc.getZip().generate({
                type: 'blob',
                mimeType:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            saveAs(out, `${props.title}-checklist.docx`);
        } catch (e) {
            console.error('Export Error:', e);
        }
    });
}

async function exportToExcel() {
    const titleToTemplateMap = {
        'For kinder/childcare': '/exportFiles/eng/Early Childhood Education (0–5 years) Checklist - Eng.xlsx',
        'Government primary school': '/exportFiles/eng/Primary School (5–12 years  Prep – Year 6) Checklist - Eng.xlsx',
        'Government secondary school': '/exportFiles/eng/Secondary School (12–18 years  Year 7 – Year 12) Checklist - Eng.xlsx',
        'TAFE': '/exportFiles/eng/TAFE (Post-Year 10  Vocational Pathway) Checklist - Eng.xlsx',
        '幼儿园/托儿所': '/exportFiles/zh/Early Childhood Education (0–5 years) Checklist - CHN.xlsx',
        '公立小学': '/exportFiles/zh/Primary School (5–12 years  Prep – Year 6) Checklist - CHN.xlsx',
        '公立中学': '/exportFiles/zh/Secondary School (12–18 years  Year 7 – Year 12) Checklist - CHN.xlsx',
        '职业技术学院（TAFE）': '/exportFiles/zh/TAFE (Post-Year 10  Vocational Pathway) Checklist - CHN.xlsx'
    };

    const templatePath = titleToTemplateMap[props.title];
    if (!templatePath) {
        alert('Excel template not found for this title');
        return;
    }

    try {
        const response = await fetch(templatePath);
        const buffer = await response.arrayBuffer();

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        const sheet = workbook.getWorksheet(1);

        props.checklist.forEach((item, index) => {
            const row = sheet.getRow(index + 4);
            row.getCell(1).value = checkedItems.value[index] ? '√' : ' '; // Status
            // row.getCell(2).value = item;      // Document
            row.commit();
        });

        const blob = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([blob]), `${props.title}-checklist.xlsx`);
    } catch (e) {
        console.error('Excel export error:', e);
        alert('Failed to export Excel file');
    }
}

</script>

<style scoped>
input[type='checkbox'] {
    transform: scale(1.1);
}
</style>
