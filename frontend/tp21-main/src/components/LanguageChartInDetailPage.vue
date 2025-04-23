<template>
    <!-- Cultural Background Chart -->
    <v-chart
      :option="chartOptions"
      autoresize
      style="height: 200px; width: 100%; margin: auto;"
    />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Props for receiving data
  const props = defineProps({
    notStated: Number,
    englishBackground: Number,
    otherLanguagesBackground: Number
  })
  
  // Total students for percentage calculation
  const total = computed(() => props.notStated + props.englishBackground + props.otherLanguagesBackground || 1)
  
  // Calculate the percentage for each category
  const notStatedPercent = computed(() => (props.notStated / total.value) * 100)
  const englishBackgroundPercent = computed(() => (props.englishBackground / total.value) * 100)
  const otherLanguagesPercent = computed(() => (props.otherLanguagesBackground / total.value) * 100)
  
  // ECharts configuration options
  const chartOptions = computed(() => ({
    tooltip: { show: false }, // Disable tooltip on hover
    legend: {
      data: ['Not Stated', 'From English Background', 'From Other Languages Background'], // Legend labels
      bottom: 10,
      left: 'center',
      orient: 'horizontal',
      itemGap: 20
    },
    grid: {
      top: 10,
      bottom: 50, // Adjust bottom for legend
      left: 0,
      right: 0
    },
    xAxis: {
      type: 'value', // Change to value for horizontal bars
      show: false, // Hide X-axis
    },
    yAxis: {
      type: 'category', // Change to category for the background groups
      data: [''], // Only one category
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: true }
    },
    series: [
      {
        name: 'Not Stated',
        type: 'bar',
        stack: 'total', // Stack with other series
        data: [props.notStated], // Data for Not Stated
        label: {
          show: true,
          position: 'inside',
          formatter: `{c|${notStatedPercent.value.toFixed(0)}%}`, // Show percentage inside bar
          rich: {
            c: {
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        },
        itemStyle: {
          color: '#4B5563' // Dark gray
        },
        barWidth: 20 // Adjust the width to match the gender chart
      },
      {
        name: 'From English Background',
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
      },
      {
        name: 'From Other Languages Background',
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
      }
    ]
  }))
  </script>
  