import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

// Register VueApexCharts globally
app.use(VueApexCharts)

app.mount('#app')