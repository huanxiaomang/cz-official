import { defHttp } from "~/utils/http";
import { useUserStore } from "~/store/user";
import { ErrorMessageMode } from "#/axios";
import { UserInfo } from "#/data";
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  major: string;
  grade: number;
}

export interface UpdateParams {
  username: string;
  avatar: string;
  github: string;
  background: string;
  description: string;
  major: string;
  grade: number;
  badge: string;
}

export interface SendVerificationCodeParams {
  email: string;
  type: string;
}

export interface VerifyCodeParams {
  email: string;
  code: string;
  type: string;
}

export interface ResetPasswordParams {
  email: string;
  code: string;
  newPassword: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface LoginResultModel extends GetUserInfoModel {
  token: string;
}

export interface GetUserInfoModel extends UserInfo {

}

enum Api {
  Login = "/login",
  Register = "/register",
  Logout = "/logout",
  GetUserInfo = "/getUserInfo",
  GetAllUser = "/all",
  SetUserRole = "/setUserRole",
  updateUserInfo = "/updateUserInfo",
  SendResetCode = "/send-reset-code",
  VerifyCode = "/verify-code",
  ResetPassword = "/reset-password",
}

export function registerApi(
  params: RegisterParams,
  mode: ErrorMessageMode = "modal",
) {

  return defHttp.post<LoginResultModel>(
    {
      url: Api.Register,
      data: params

    },
    {
      errorMessageMode: mode,
    },
  );
}

export function loginApi(
  params: LoginParams,
  mode: ErrorMessageMode = "modal",
) {

  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data: params

    },
    {
      errorMessageMode: mode,
    },
  );
}

export function updateUserInfoApi(
  params: UpdateParams,
  mode: ErrorMessageMode = "modal",

) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.updateUserInfo,
      data: params

    },
    {
      errorMessageMode: mode,
    },
  );
}


export function getUserInfo() {
  const userStore = useUserStore();
  const userInfo = userStore.getUserInfo as UserInfo;
  const userId = userInfo.userId;

  // 验证userId是否有效
  if (!userId || userId === '0' || userId === 'undefined' || userId === 'null') {
    throw new Error('Invalid user ID. Please login again.');
  }

  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo + `/${userId}`, },
  );
}

export function setUserRole(userId: number, role: string) {

  return defHttp.get<GetUserInfoModel>(
    {
      url: Api.SetUserRole + `/${userId}`,
      params: {
        role: role
      }
    },
    { errorMessageMode: "message" },
  );
}

export function getAllUser() {

  return defHttp.get<GetUserInfoModel[]>(
    { url: Api.GetAllUser },
  );
}

export function getUserInfoById(userId: string) {


  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo + `/${userId}`, },
  );
}

export function doLogout() {
  return new Promise((resolve) => {
    resolve(useUserStore().setToken(undefined));
  });
}

export function sendVerificationCodeApi(
  params: SendVerificationCodeParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<{ message: string }>(
    {
      url: Api.SendResetCode,
      data: params
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function verifyCodeApi(
  params: VerifyCodeParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<{ valid: boolean; message: string }>(
    {
      url: Api.VerifyCode,
      data: params
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function resetPasswordApi(
  params: ResetPasswordParams,
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.post<{ message: string }>(
    {
      url: Api.ResetPassword,
      data: params
    },
    {
      errorMessageMode: mode,
    },
  );
}
