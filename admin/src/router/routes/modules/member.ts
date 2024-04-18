import type { AppRouteModule } from "@/router/types";

import { LAYOUT } from "@/router/constant";

const about: AppRouteModule = {
    path: "/member",
    name: "member",
    component: LAYOUT,
    redirect: "/member/index",
    meta: {
        hideChildrenInMenu: true,
        icon: "tdesign:member",
        title: "成员",
        orderNo: 100000,
    },
    children: [
        {
            path: "index",
            name: "memberPage",
            component: () => import("@/views/sys/member/index.vue"),
            meta: {
                title: "成员",
                icon: "tdesign:member",
                hideMenu: true,
            },
        },
    ],
};

export default about;
