import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { setupStore } from "~/store";
import { VueMasonryPlugin } from 'vue-masonry';
import { router } from './router';
import { globalComponents} from '~/components'
import 'virtual:svg-icons-register'
import { useGlobalComps } from './utils/withInstall';
const app = createApp(App)
app.use(VueMasonryPlugin)
setupStore(app);

app.use(router);
useGlobalComps(app, globalComponents);
app.mount('#app')
