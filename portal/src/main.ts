import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PortalApp from '@/PortalApp.vue'
import router from '@/router/Router'

import '@/styles/styles.scss'

const app = createApp(PortalApp)
const pinia = createPinia()

app.use(pinia)
app.use(router)

window.addEventListener('load', () => {
  app.mount('#app')
})
