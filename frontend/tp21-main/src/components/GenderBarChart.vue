<template>
    <v-chart :option="chartOptions" autoresize style="height: 380px; width: 180px; margin: auto;" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    girls: Number,
    boys: Number
  })
  
  const total = computed(() => (props.girls || 0) + (props.boys || 0) || 1)
  
  const girlPercent = computed(() => ((props.girls / total.value) * 100).toFixed(0))
  const boyPercent = computed(() => ((props.boys / total.value) * 100).toFixed(0))
  
  const chartOptions = computed(() => ({
    tooltip: { show: false },
    legend: {
      data: ['Girl', 'Boy'],
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
    yAxis: { type: 'value', show: false },
    series: [
      {
        name: 'Girl',
        type: 'bar',
        stack: 'total',
        data: [props.girls],
        label: {
          show: true,
          position: 'inside',
          formatter: `{c|${girlPercent.value}%}`,
          rich: {
            c: {
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        },
        itemStyle: { color: '#c4b5fd' },
        barWidth: 40
      },
      {
        name: 'Boy',
        type: 'bar',
        stack: 'total',
        data: [props.boys],
        label: {
          show: true,
          position: 'inside',
          formatter: `{c|${boyPercent.value}%}`,
          rich: {
            c: {
              color: '#fff',
              fontWeight: 'bold'
            }
          }
        },
        itemStyle: { color: '#8b5cf6' },
        barWidth: 40
      }
    ]
  }))
  </script>
  