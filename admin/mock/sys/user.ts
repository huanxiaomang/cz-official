import { MockMethod } from "vite-plugin-mock";
import {
  resultError,
  resultSuccess,
  getRequestToken,
  requestParams,
} from "../_util";

export function createFakeUserList() {
  return [
    {
      userId: "1",
      username: "huanxiaomang",
      email:"atri2022@163.com",
      avatar: "https://i1.hdslb.com/bfs/face/6bc5d59334e3430ebc019d4fecd463e4df028e8c.jpg@240w_240h_1c_1s_!web-avatar-nav.avif",
      description: "gegwgfr23rf3frewdv345refv456ytrgfv",
      password: "123456",
      token: "fakeToken1",
      github: 'https://github.com/huanxiaomang',
      role:"ADMIN"
    },

  ];
}
const fakeCodeList: any = {
  "1": ["1000", "3000", "5000"],

  "2": ["2000", "4000", "6000"],
};
export default [
  // mock user login
  {
    url: "/basic-api/login",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { email, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.email === email && password === item.password,
      );
      if (!checkUser) {
        return resultError("Incorrect account or password！");
      }

      return resultSuccess(checkUser);
    },
  },
  {
    url: "/basic-api/getUserInfo",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find(
        (item) => item.token === token,
      );
      if (!checkUser) {
        return resultError(
          "The corresponding user information was not obtained!",
        );
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: "/basic-api/getPermCode",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find(
        (item) => item.token === token,
      );
      if (!checkUser) {
        return resultError("Invalid token!");
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
  {
    url: "/basic-api/logout",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find(
        (item) => item.token === token,
      );
      if (!checkUser) {
        return resultError("Invalid token!");
      }
      return resultSuccess(undefined, { message: "Token has been destroyed" });
    },
  },
  {
    url: "/basic-api/testRetry",
    statusCode: 405,
    method: "get",
    response: () => {
      return resultError("Error!");
    },
  },
] as MockMethod[];
