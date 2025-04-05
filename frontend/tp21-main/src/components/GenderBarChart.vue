<template>
    <!-- Gender distribution chart using ECharts -->
    <v-chart
      :option="chartOptions"
      autoresize
      style="height: 380px; width: 180px; margin: auto;"
    />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
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
      data: ['Girl', 'Boy'], // Legend labels
      bottom: 10,
      left: 'center',
      orient: 'horizontal',
      itemGap: 20
    },
    grid: {
      top: 10,
      bottom: 100, // Leave space for legend
      left: 0,
      right: 0
    },
    xAxis: {
      type: 'category',
      data: [''], // Only one stacked bar
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'value',
      show: false // Hide Y-axis
    },
    series: [
      {
        name: 'Girl',
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
        barWidth: 40
      },
      {
        name: 'Boy',
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
        barWidth: 40
      }
    ]
  }))
  </script>
  