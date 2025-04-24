<template>
    <!-- Vertical stacked bar chart showing language background data -->
    <v-chart
      :option="chartOptions"
      autoresize
      style="height: 380px; width: 180px; margin: auto;"
    />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Props: number of students by language background
  const props = defineProps({
    english: Number,       // Students from English-speaking background
    notEnglish: Number,    // Students from non-English-speaking backgrounds
    notStated: Number      // Students with unspecified background
  })
  
  // Compute total number of students, fallback to 1 to prevent divide-by-zero
  const total = computed(() => {
    const e = props.english || 0
    const n = props.notEnglish || 0
    const ns = props.notStated || 0
    return e + n + ns || 1
  })
  
  // Utility: format a number as a percentage of the total
  const percent = (val) => ((val / total.value) * 100).toFixed(0) + '%'
  
  // Dynamically generate chart options based on available (non-zero) data
  const chartOptions = computed(() => {
    const series = []       // Chart series
    const legendData = []   // Legend labels
  
    // Include 'Not Stated' if value > 0
    if (props.notStated > 0) {
      series.push({
        name: 'Not Stated',
        type: 'bar',
        stack: 'total',
        data: [props.notStated],
        label: {
          show: true,
          position: 'inside',
          formatter: percent(props.notStated),
          color: '#fff',
          fontWeight: 'bold'
        },
        itemStyle: {
          color: '#a3a3a3'  // Gray color
        },
        barWidth: 50
      })
      legendData.push('Not Stated')
    }
  
    // Include 'English' if value > 0
    if (props.english > 0) {
      series.push({
        name: 'English',
        type: 'bar',
        stack: 'total',
        data: [props.english],
        label: {
          show: true,
          position: 'inside',
          formatter: percent(props.english),
          color: '#fff',
          fontWeight: 'bold'
        },
        itemStyle: {
          color: '#86efac'  // Light green
        },
        barWidth: 50
      })
      legendData.push('English')
    }
  
    // Include 'Other Languages' if value > 0
    if (props.notEnglish > 0) {
      series.push({
        name: 'Other Languages',
        type: 'bar',
        stack: 'total',
        data: [props.notEnglish],
        label: {
          show: true,
          position: 'inside',
          formatter: percent(props.notEnglish),
          color: '#fff',
          fontWeight: 'bold'
        },
        itemStyle: {
          color: '#15803d'  // Dark green
        },
        barWidth: 50
      })
      legendData.push('Other Languages')
    }
  
    return {
      tooltip: { show: false },  // Disable hover tooltips
      legend: {
        data: legendData,        // Only show legend items with non-zero data
        bottom: 10,
        left: 'center',
        orient: 'horizontal',
        itemGap: 20
      },
      grid: {
        top: 10,
        bottom: 100,             // Leave space for legend
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: [''],              // Only one bar
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false }
      },
      yAxis: {
        type: 'value',
        show: false,
                 // Hide vertical axis
      },
      series
    }
  })
  </script>
  