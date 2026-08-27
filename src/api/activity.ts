import { defHttp } from "~/utils/http";
import { ActiInfo } from "#/data";
import { ErrorMessageMode } from "#/axios";

enum Api {
  GetAll = "/activity"
}

let activitiesRequest: Promise<ActiInfo[]> | null = null;

export function getActivitiesApi(
  mode: ErrorMessageMode = "modal",
) {
  if (!activitiesRequest) {
    activitiesRequest = defHttp.get<ActiInfo[]>(
      {
        url: Api.GetAll,
      },
      {
        isTransformResponse: true,
        errorMessageMode: mode,
        successMessageMode: "none",
      },
    ).catch((error) => {
      activitiesRequest = null;
      throw error;
    });
  }
  return activitiesRequest;
}
