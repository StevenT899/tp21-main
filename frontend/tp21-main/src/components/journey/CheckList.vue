<template>
    <div v-if="visible"
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 bg-gray-30 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button @click="close" class="absolute top-2 right-3 text-gray-600 hover:text-red-400 text-3xl cursor-pointer">
                &times;
            </button>
            <h2 class="text-xl font-semibold mb-4">{{ title }} {{ $t('checklist.title') }}</h2>
            <p class="text-gray-700 mb-4">{{ $t('checklist.instruction') }}</p>
            <ul class="text-left space-y-2">
                <li v-for="(item, index) in checklist" :key="index" class="flex items-center space-x-2">
                    <input type="checkbox" v-model="checkedItems[index]" class="accent-blue-500 cursor-pointer"
                        @click.stop />
                    <label @click="toggleItem(index)">{{ item }}</label>
                </li>
            </ul>
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
import { ref, watch } from 'vue';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import JSZipUtils from "jszip-utils";
import JSZip from "pizzip";
import ExcelJS from 'exceljs';
// import 'pizzip/utils/index.js';

const emit = defineEmits(['close']);
const checkedItems = ref([]);

const props = defineProps({
    visible: Boolean,
    title: String,
    checklist: Array
});

function toggleItem(index) {
    checkedItems.value[index] = !checkedItems.value[index];
}

watch(
    () => props.checklist,
    (newList) => { checkedItems.value = newList.map(() => false); },
    { immediate: true }
);

function close() {
    emit('close');
}

function exportToWord() {
    const titleToTemplateMap = {
        'For kinder/childcare': '/exportFiles/Early Childhood Education (0–5 years) Checklist - Eng.docx',
        'Government primary school': '/exportFiles/Primary School (5–12 years  Prep – Year 6) Checklist -Eng.docx',
        'Government secondary school': '/exportFiles/Secondary School (12–18 years  Year 7 – Year 12) Checklist -Eng.docx',
        'TAFE': '/exportFiles/TAFE (Post-Year 10  Vocational Pathway) Checklist -Eng.docx'
    };
    const templatePath = titleToTemplateMap[props.title]

    const allItemsWithStatus = props.checklist.map((item, index) => ({
        item,
        checked: checkedItems.value[index] === true,
    }));

    JSZipUtils.getBinaryContent(templatePath, function (error, content) {
        if (error) {
            console.error('Error to load file:', error);
            alert('Error to load file');
            return;
        }

        try {
            const zip = new JSZip(content);
            const doc = new Docxtemplater().loadZip(zip);

            doc.setData({ items: allItemsWithStatus });

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
        'For kinder/childcare': '/exportFiles/Early Childhood Education (0–5 years) Checklist -Eng.xlsx',
        'Government primary school': '/exportFiles/Primary School (5–12 years  Prep – Year 6) Checklist -Eng.xlsx',
        'Government secondary school': '/exportFiles/Secondary School (12–18 years  Year 7 – Year 12) Checklist -Eng.xlsx',
        'TAFE': '/exportFiles/TAFE (Post-Year 10  Vocational Pathway) Checklist -Eng.xlsx'
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
            row.getCell(2).value = item;      // Document
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
