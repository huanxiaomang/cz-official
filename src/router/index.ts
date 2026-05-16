import { createRouter, createWebHistory } from 'vue-router/auto'
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //routes: constantRoute,
  // routes: [
  //   {
  //     path: '/blog/:id', // 动态路由参数
  //     name: 'BlogDetail',
  //     component: () => import('~/views/BlogDetail.vue')
  //   }
  // ]

})
