import type { AppRouteModule } from "@/router/types";

import { LAYOUT } from "@/router/constant";

const about: AppRouteModule = {
    path: "/message",
    name: "message",
    component: LAYOUT,
    redirect: "/message/index",
    meta: {
        hideChildrenInMenu: true,
        icon: "fe:notice-active",
        title: "通知",
        orderNo: 100000,
    },
    children: [
        {
            path: "index",
            name: "messagePage",
            component: () => import("@/views/sys/message/index.vue"),
            meta: {
                title: "通知",
                icon: "fe:notice-active",
                hideMenu: true,
            },
        },
    ],
};

export default about;
