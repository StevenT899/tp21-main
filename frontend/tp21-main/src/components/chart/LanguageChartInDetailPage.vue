<!-- /**
  LanguageBarChart.vue
 
  Description:
    Renders a vertical stacked bar chart showing student language background distribution 
    (English, non-English, and not stated) using ECharts, displayed in SchoolDetailView.

 / -->

<template>
  <!-- Cultural Background Chart -->
  <v-chart :option="chartOptions" autoresize style="height: 200px; width: 100%; margin: auto;" />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

// Props for receiving data
const props = defineProps({
  notStated: Number,
  englishBackground: Number,
  otherLanguagesBackground: Number
})

// Total students for percentage calculation
const total = computed(() => props.notStated + props.englishBackground + props.otherLanguagesBackground || 1)

// Calculate the percentage for each category
const notStatedPercent = computed(() => {
  let percent = (props.notStated / total.value) * 100
  return percent < 1 ? 1 : percent
})
const englishBackgroundPercent = computed(() => (props.englishBackground / total.value) * 100)
const otherLanguagesPercent = computed(() => (props.otherLanguagesBackground / total.value) * 100)

// ECharts configuration options
const chartOptions = computed(() => {
  const series = []

  // Add Not Stated series if not zero
  if (props.notStated > 0) {
    series.push({
      name: t('chart.labels.notStated'),
      type: 'bar',
      stack: 'total',
      data: [props.notStated],
      label: {
        show: true,
        position: 'outside', // Move label to the outside of the bar
        formatter: `{c|${notStatedPercent.value.toFixed(0)}%}`, // Show percentage inside label
        rich: {
          c: {
            color: '#000', // Set the label text color to black
            fontWeight: 'bold'
          }
        },
        offset: [-35, 0] // Move the label further left
      },
      itemStyle: {
        color: '#4B5563' // Dark gray color for the "Not Stated" section
      },
      barWidth: 20 // Adjust bar width if needed
    })
  }

  // Always add English Background series
  series.push({
    name: t('chart.labels.englishBackground'),
    type: 'bar',
    stack: 'total', // Stack with other series
    data: [props.englishBackground], // Data for English Background
    label: {
      show: true,
      position: 'inside',
      formatter: `{c|${englishBackgroundPercent.value.toFixed(0)}%}`, // Show percentage inside bar
      rich: {
        c: {
          color: '#fff',
          fontWeight: 'bold'
        }
      }
    },
    itemStyle: {
      color: '#34D399' // Green
    },
    barWidth: 20 // Same width as the gender chart
  })

  // Always add Other Languages Background series
  series.push({
    name: t('chart.labels.otherLanguagesBackground'),
    type: 'bar',
    stack: 'total', // Stack with other series
    data: [props.otherLanguagesBackground], // Data for Other Languages Background
    label: {
      show: true,
      position: 'inside',
      formatter: `{c|${otherLanguagesPercent.value.toFixed(0)}%}`, // Show percentage inside bar
      rich: {
        c: {
          color: '#fff',
          fontWeight: 'bold'
        }
      }
    },
    itemStyle: {
      color: '#10B981' // Darker green
    },
    barWidth: 20 // Same width as the gender chart
  })

  // Set the legend dynamically based on available series
  const legendData = [
    t('chart.labels.englishBackground'),
    t('chart.labels.otherLanguagesBackground')
  ];

  if (props.notStated > 0) {
    legendData.unshift(t('chart.labels.notStated'));
  }

  return {
    tooltip: { show: false }, // Disable tooltip on hover
    legend: {
      data: legendData, // Dynamically set the legend based on data availability
      bottom: 10,
      left: 'center',
      orient: 'horizontal',
      itemGap: 20
    },
    grid: {
      top: 0,
      bottom: 10, // Adjust bottom for legend
      left: 80,    // Align to left
      right: 80    // Align to right
    },
    xAxis: {
      type: 'value', // Change to value for horizontal bars
      show: false,   // Hide X-axis
      max: 100       // Set max value to ensure bars are comparable
    },
    yAxis: {
      type: 'category', // Change to category for the background groups
      data: [''], // Only one category
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: true }
    },
    series
  }
})
</script>