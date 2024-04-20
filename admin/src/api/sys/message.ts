import { defHttp } from "@/utils/http/axios";


import { ErrorMessageMode } from "#/axios";
import { useUserStore } from "@/store/modules/user";
import { MessageParams, MessageResultModel } from "./model/msgModel";

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

