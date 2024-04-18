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
}

