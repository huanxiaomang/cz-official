import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { setupStore } from "~/store";
import { VueMasonryPlugin } from 'vue-masonry';
import { router } from './router';
import globalComponent from '~/components'
import 'virtual:svg-icons-register'
const app = createApp(App)
app.use(VueMasonryPlugin)
setupStore(app);

app.use(router).use(globalComponent)
app.mount('#app')
