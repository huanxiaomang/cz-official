import { defHttp } from "@/utils/http/axios";


import { ErrorMessageMode } from "#/axios";
import { useUserStore } from "@/store/modules/user";
import { ProjectParams, ProjectResultModel } from "./model/projectModel";

enum Api {
  GetAll = "/project",
  CreateProj = "/project/create",
  UpdateProj = "/project/update",
  RemoveProj = "/project/remove",
}


export function getProjApi(
  mode: ErrorMessageMode = "modal",

) {

  return defHttp.get<ProjectResultModel>(
    {
      url: Api.GetAll,

    },
    {
      errorMessageMode: mode,
    },
  );
}

export function createProjApi(
  info: ProjectParams
) {

  return defHttp.post<ProjectResultModel>(
    {
      url: Api.CreateProj,
      data: {
        ...info
      }
    },
    {
      errorMessageMode: "none",
    },
  );
}

export function updateProjApi(
  id: number,
  info: ProjectParams
) {

  return defHttp.post<ProjectResultModel>(
    {
      url: Api.UpdateProj + `/${id}`,
      data: {
        ...info
      }
    },
    {
      errorMessageMode: "none",
    })
};

export function removeProjApi(
  id: number
)
{


  return defHttp.delete<ProjectResultModel>(
    {
      url: Api.RemoveProj + `/${id}`,
    },
    {
      errorMessageMode: "none",
    });
}

