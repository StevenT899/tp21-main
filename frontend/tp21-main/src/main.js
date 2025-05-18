/**
 * main.js
 *
 * Description:
 *   Initializes the Vue 3 application, sets up global plugins and components,
 *   and mounts the root App component to the DOM.
 *
 * Key Features:
 *   - Registers ECharts (with bar chart and canvas renderer support) via `vue-echarts`
 *   - Applies global styles from `main.css`
 *   - Configures Vue Router and Vue I18n for navigation and localization
 *   - Mounts the app to the HTML element with ID `#app`
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

import VueECharts from 'vue-echarts'
import i18n from './utils/i18n';

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
app.use(i18n);
app.mount('#app')