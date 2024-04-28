import { defHttp } from "~/utils/http";
import { ErrorMessageMode } from "#/axios";


/**
 * @description: Project interface parameters
 */
export interface ProjectParams {
  title: string;
  content: string;
  stack: string;
  members: string;
}


/**
 * @description: Project interface return value
 */
export interface ProjectResultModel {
  id: number;
  title: string;
  content: string;
  stack: string;
  members: string;
  createdAt: string;
  updatedAt: string;
}



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
) {


  return defHttp.delete<ProjectResultModel>(
    {
      url: Api.RemoveProj + `/${id}`,
    },
    {
      errorMessageMode: "none",
    });
}

