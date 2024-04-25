/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  email: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  createdAt: string;
  userId: string | number;
  username: string;
  avatar?: string;
  description?: string;
  role: string;
  email: string;
  background?: string;
  token: string;
  github?: string;
}
