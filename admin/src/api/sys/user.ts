import { defHttp } from "@/utils/http/axios";
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
} from "./model/userModel";

import { ErrorMessageMode } from "#/axios";
import { useUserStore } from "@/store/modules/user";

enum Api {
  Login = "/login",
  Logout = "/logout",
    GetUserInfo = "/getUserInfo",
    GetAllUser = "/all",
  GetPermCode = "/getPermCode",
    TestRetry = "/testRetry",
  SetUserRole = "/setUserRole",
}

/**
 * @description: user login api
 */
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

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  const userId = useUserStore().getUserInfo.userId;


  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo + `/${userId}`,  },
    { errorMessageMode: "none" },
  );
}

export function setUserRole(userId, role) {

    return defHttp.get<GetUserInfoModel>(
        {
            url: Api.SetUserRole + `/${userId}`,
            params: {
                role:role
            }
        },
        { errorMessageMode: "message" },
    );
}

export function getAllUser() {

    return defHttp.get<GetUserInfoModel[]>(
        { url: Api.GetAllUser },
        { errorMessageMode: "none" },
    );
}

export function getUserInfoById(userId:number) {


  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo + `/${userId}`, },
    { errorMessageMode: "none" },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return Promise.resolve();
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
