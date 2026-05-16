import { defHttp } from "~/utils/http";
import { ActiInfo } from "#/data";
import { ErrorMessageMode } from "#/axios";

enum Api {
  GetAll = "/activity"
}

export function getActivitiesApi(
  mode: ErrorMessageMode = "modal",
) {
  return defHttp.get<{result: ActiInfo[]}>(
    {
      url: Api.GetAll,
    },
    {
      // 关键修改：添加这些选项
      isTransformResponse: true, // 允许响应转换
      errorMessageMode: mode,
      // 添加成功消息处理
      successMessageMode: "none", // 不显示成功消息
    },
  );
}
