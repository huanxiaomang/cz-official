import { defHttp } from "~/utils/http";

export interface MessageParams {
  title: string;
  content: string;
}

export interface MessageResultModel {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}


import { ErrorMessageMode } from "#/axios";

enum Api {
  GetAll = "/message",
  CreateMsg = "/message/create",
  UpdateMsg = "/message/update",
  RemoveMsg = "/message/remove",
}


export function getMsgApi(
  mode: ErrorMessageMode = "modal",

) {

  return defHttp.get<MessageResultModel>(
    {
      url: Api.GetAll,

    },
    {
      errorMessageMode: mode,
    },
  );
}

export function createMsgApi(
  info: MessageParams
) {

  return defHttp.post<MessageResultModel>(
    {
      url: Api.CreateMsg,
      data: {
        ...info
      }
    },
    {
      errorMessageMode: "none",
    },
  );
}

export function updateMsgApi(
  id: number,
  info: MessageParams
) {

  return defHttp.post<MessageResultModel>(
    {
      url: Api.UpdateMsg + `/${id}`,
      data: {
        ...info
      }
    },
    {
      errorMessageMode: "none",
    })
};

export function removeMsgApi(
  id: number
) {


  return defHttp.delete<MessageResultModel>(
    {
      url: Api.RemoveMsg + `/${id}`,
    },
    {
      errorMessageMode: "none",
    });
}
