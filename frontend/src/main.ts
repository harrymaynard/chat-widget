import { createApp } from 'vue'
import App from '@/App.vue'

import '@/styles/styles.scss'

const app = createApp(App)

window.addEventListener('load', () => {
  console.log('App Loaded')
  app.mount('#app')
})
