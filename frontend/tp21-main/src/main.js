import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

import VueECharts from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const app = createApp(App)
app.component('v-chart', VueECharts)
app.use(router)
app.mount('#app')
