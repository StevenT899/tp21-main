<!-- /**
  GenderBarChartInDetailPage.vue
 
  Description:
    Renders a stacked bar chart showing the gender distribution of students (girls vs boys)
    using ECharts, displayed in SchoolDetailView.
 / -->

<template>
  <!-- Gender distribution chart using ECharts -->
  <v-chart :option="chartOptions" autoresize style="height: 200px; width: 100%; margin: auto;" />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Define props: girls and boys numbers
const props = defineProps({
  girls: Number,
  boys: Number
})

// Total number of students, fallback to 1 to avoid division by 0
const total = computed(() => (props.girls || 0) + (props.boys || 0) || 1)

// Calculate the percentage for girls and boys
const girlPercent = computed(() => ((props.girls / total.value) * 100).toFixed(0))
const boyPercent = computed(() => ((props.boys / total.value) * 100).toFixed(0))

// ECharts configuration options
const chartOptions = computed(() => ({
  tooltip: { show: false }, // Disable tooltip on hover
  legend: {
    data: [t('gender.girl'), t('gender.boy')], // Legend labels
    bottom: 10,
    left: 'center',
    orient: 'horizontal',
    itemGap: 20
  },
  grid: {
    top: 0,
    bottom: 10, // Adjust bottom for legend
    left: 80,
    right: 80
  },
  xAxis: {
    type: 'value', // Change to value for horizontal bars
    show: false, // Hide X-axis
  },
  yAxis: {
    type: 'category', // Change to category for the school names or categories
    data: [''], // Only one category
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { show: true }
  },
  series: [
    {
      name: t('gender.girl'),
      type: 'bar',
      stack: 'total', // Stack with 'Boy' series
      data: [props.girls], // Data for girls
      label: {
        show: true,
        position: 'inside',
        formatter: `{c|${girlPercent.value}%}`, // Show percentage inside bar
        rich: {
          c: {
            color: '#fff',
            fontWeight: 'bold'
          }
        }
      },
      itemStyle: {
        color: '#c4b5fd' // Light purple
      },
      barWidth: 20 // Adjust the width
    },
    {
      name: t('gender.boy'),
      type: 'bar',
      stack: 'total', // Stack with 'Girl' series
      data: [props.boys], // Data for boys
      label: {
        show: true,
        position: 'inside',
        formatter: `{c|${boyPercent.value}%}`, // Show percentage inside bar
        rich: {
          c: {
            color: '#fff',
            fontWeight: 'bold'
          }
        }
      },
      itemStyle: {
        color: '#8b5cf6' // Darker purple
      },
      barWidth: 20
    }
  ]
}))
</script>