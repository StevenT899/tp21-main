<template>
    <!-- Vertical stacked bar chart displaying language background data -->
    <v-chart
      :option="chartOptions"
      autoresize
      style="height: 380px; width: 200px; margin: auto;"
    />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Define props passed into the component for language data
  const props = defineProps({
    english: Number,       // Number of students from English background
    notEnglish: Number,    // Number of students from other language backgrounds
    notStated: Number      // Number of students whose background is not stated
  })
  
  // Compute the total number of students, fallback to 1 to avoid division by zero
  const total = computed(() => {
    const e = props.english || 0
    const n = props.notEnglish || 0
    const ns = props.notStated || 0
    return e + n + ns || 1
  })
  
  // Function to format values as percentage strings
  const percent = (val) => ((val / total.value) * 100).toFixed(0) + '%'
  
  // Computed chart options for ECharts
  const chartOptions = computed(() => ({
    tooltip: { show: false }, // Disable tooltip popup on hover
    legend: {
      data: ['Other Languages', 'English', 'Not Stated'], // Legend labels
      bottom: 10,            // Position legend near the bottom
      left: 'center',
      orient: 'horizontal',  // Horizontal legend
      itemGap: 20            // Space between legend items
    },
    grid: {
      top: 10,
      bottom: 100,           // Extra space for the legend at the bottom
      left: 0,
      right: 0
    },
    xAxis: {
      type: 'category',
      data: [''],            // Single bar
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'value',
      show: false            // Hide Y-axis
    },
    series: [
      {
        name: 'Not Stated',
        type: 'bar',
        stack: 'total',      // Stack all bars vertically
        data: [props.notStated],
        label: {
          show: true,
          position: 'inside',
          formatter: percent(props.notStated), // Show percentage inside bar
          color: '#fff',
          fontWeight: 'bold'
        },
        itemStyle: {
          color: '#a3a3a3'  
        },
        barWidth: 50
      },
      {
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
          color: '#86efac' 
        },
        barWidth: 50
      },
      {
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
          color: '#15803d'   
        },
        barWidth: 50
      }
    ]
  }))
  </script>
  