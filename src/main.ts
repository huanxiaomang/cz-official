import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { setupStore } from "~/store";
import { VueMasonryPlugin } from 'vue-masonry';
import { router } from './router';
import { globalComponents} from '~/components'
import 'virtual:svg-icons-register'
import { useGlobalComps } from './utils/components';

const SEO_BY_PATH: Record<string, { title: string; description: string }> = {
  '/': {
    title: '创智工作室 | 包容、多元、创新、精进',
    description: '创智工作室官网，展示团队成员、项目实践、通知动态、蓝桥成果与技术讨论内容。',
  },
  '/member': {
    title: '成员介绍 | 创智工作室',
    description: '查看创智工作室成员信息，了解团队方向、年级分布、技术标签与联系方式。',
  },
  '/project': {
    title: '项目展示 | 创智工作室',
    description: '浏览创智工作室项目实践，了解团队在前后端、工程化与产品实现上的成果。',
  },
  '/notify': {
    title: '通知公告 | 创智工作室',
    description: '查看创智工作室最新通知、活动安排与站内动态。',
  },
  '/achievement': {
    title: '成果荣誉 | 创智工作室',
    description: '查看创智工作室学科竞赛、荣誉奖学金与综合荣誉，了解团队积累与成员成就表现。',
  },
  '/comment': {
    title: '创智讨论区 | 创智工作室',
    description: '进入创智工作室的创智讨论区，交流题解、经验与技术思考。',
  },
  '/login': {
    title: '账号登录 | 创智工作室',
    description: '登录创智工作室账号，继续访问个人资料、讨论区和成员内容。',
  },
  '/register': {
    title: '账号注册 | 创智工作室',
    description: '注册创智工作室账号，加入站内互动与个人信息管理。',
  },
  '/forgotPassword': {
    title: '找回密码 | 创智工作室',
    description: '通过邮箱验证重置创智工作室账号密码。',
  },
  '/updateInfo': {
    title: '修改资料 | 创智工作室',
    description: '更新创智工作室账号的头像、背景、个人简介与联系方式。',
  },
};

function applySeo(path: string) {
  const seo = SEO_BY_PATH[path] ?? SEO_BY_PATH['/'];

  document.title = seo.title;

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.setAttribute('name', 'description');
    document.head.appendChild(description);
  }
  description.setAttribute('content', seo.description);
}

router.afterEach((to) => {
  applySeo(to.path);
});

applySeo(window.location.pathname);

const app = createApp(App)
app.use(Antd)
app.use(VueMasonryPlugin)
setupStore(app);

app.use(router);
useGlobalComps(app, globalComponents);
app.mount('#app')

