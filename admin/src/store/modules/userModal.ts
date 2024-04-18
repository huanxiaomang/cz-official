

import { defineStore } from "pinia";

import { reactive, ref, toRefs } from "vue";


export const useShowingUserModal = defineStore("app-userModal", () => {
    const state = reactive({
        isShowingUserModal: false,
        showUserInfo: {},
        hasInstance: false
    });

    // 设置 showUserInfo 的 setter 方法
    const setShowUserInfo = (userInfo) => {
        state.showUserInfo = userInfo;
    };

    return {
        state
    };
});
