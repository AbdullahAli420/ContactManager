import { createApp } from 'vue'
import App from './App.vue'

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

let app = createApp(App)
app.use(pinia)
app.mount('#app')
