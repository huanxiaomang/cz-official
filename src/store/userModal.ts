

import { UserInfo } from "#/data";
import { defineStore } from "pinia";

import { reactive} from "vue";

interface showingUserModalState {
    isShowingUserModal: boolean,
    showUserInfo: UserInfo,
    hasInstance: boolean
}

export const useShowingUserModal = defineStore("app-userModal", () => {
  const state = reactive<showingUserModalState>({
        isShowingUserModal: false,
          showUserInfo: {
            createdAt: '',
            email: '',
            grade: 0,
            major: '',
            role: '',
            score: '',
            userId: '0',
            username: '',
        },
        hasInstance: false
    });

    return {
        state
    };
});
