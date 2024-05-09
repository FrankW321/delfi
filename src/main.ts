import './assets/main.css'
import './assets/custom.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import et from './locales/et'

import App from './App.vue'
import router from './router'
import store from './stores/modal'

const i18n = createI18n({
  locale: 'et',
  fallbackLocale: 'en',
  messages: {
    en,
    et
  }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.provide('i18n', i18n)

app.mount('#app')
