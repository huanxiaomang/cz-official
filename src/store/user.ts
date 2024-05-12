import { ErrorMessageMode } from "#/axios";
import { RoleEnum, UserInfo } from "#/data";
import { isArray } from "lodash-es";
import { defineStore } from "pinia";
import { h } from "vue";
import { GetUserInfoModel, LoginParams, RegisterParams, UpdateParams, doLogout, getUserInfo, loginApi, registerApi, updateUserInfoApi } from "~/api/user";
import { useMessage } from "~/hooks/web/useMessage";


interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}


export const useUserStore = defineStore({
  id: "app-user",
  persist: true,
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(state): UserInfo | {} {
      return state.userInfo || {};
    },
    getToken(state): string | undefined {
      return state.token;
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ""; // for null or undefined value
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;

      this.lastUpdateTime = new Date().getTime();
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = "";
      this.roleList = [];
      this.sessionTimeout = false;
    },

    async updateUserInfo(
      params:UpdateParams
    ): Promise<GetUserInfoModel | null>{
      try {
        const data = await updateUserInfoApi(params);
        const { token } = data;

        // save token
        this.setToken(token);
        this.setUserInfo(data);

        return this.userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async register(
      params: RegisterParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode ='message', ...loginParams } = params;
        const data = await registerApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        this.setUserInfo(data);

        return this.userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode = 'message', ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        this.setUserInfo(data);

        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      }

      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();


      const roles = [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ];
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        this.setRoleList([]);
      }
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log("注销Token失败");
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      if (goLogin) {
        // 直接回登陆页
      }
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: "warning",
        title: () => h("span", `登出`),
        content: () => h("span", `确定要退出登录吗? `),
        onOk: async () => {
          // 主动登出，不带redirect地址
          await this.logout(true);
        },
      });
    },
  },
});
