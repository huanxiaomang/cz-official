import type { AppRouteModule } from "@/router/types";

import { LAYOUT } from "@/router/constant";

const about: AppRouteModule = {
  path: "/project",
  name: "project",
  component: LAYOUT,
  redirect: "/project/index",
  meta: {
    hideChildrenInMenu: true,
    icon: "ion:grid-outline",
    title: "项目",
    orderNo: 100000,
  },
  children: [
    {
      path: "index",
      name: "projectPage",
      component: () => import("@/views/sys/project/index.vue"),
      meta: {
        title: "项目",
        icon: "ion:grid-outline",
        hideMenu: true,
      },
    },
  ],
};

export default about;
