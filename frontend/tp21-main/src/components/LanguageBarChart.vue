<template>
    <v-chart :option="chartOptions" autoresize style="height: 380px; width: 200px; margin: auto;" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    english: Number,
    notEnglish: Number,
    notStated: Number
  })
  
  const total = computed(() => {
    const e = props.english || 0
    const n = props.notEnglish || 0
    const ns = props.notStated || 0
    return e + n + ns || 1
  })
  
  const percent = (val) => ((val / total.value) * 100).toFixed(0) + '%'
  
  const chartOptions = computed(() => ({
    tooltip: { show: false },
    legend: {
      data: ['Other Languages', 'English', 'Not Stated'],
      bottom: 10,           
      left: 'center',
      orient: 'horizontal',
      itemGap: 20
    },
    grid: {
      top: 10,
      bottom: 100,          
      left: 0,
      right: 0
    },
    xAxis: {
      type: 'category',
      data: [''],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
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
  