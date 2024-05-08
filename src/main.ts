import './assets/main.css'
import './assets/custom.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores/modal'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
