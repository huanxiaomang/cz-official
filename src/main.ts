import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { VueMasonryPlugin } from 'vue-masonry';
const app = createApp(App)
app.use(VueMasonryPlugin)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.mount('#app')
