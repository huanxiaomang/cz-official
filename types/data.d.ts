export interface UserInfo {
  userId: string;
  role: string;
  username: string;
  avatar?: string;
  description?: string;
  email: string;
  background?: string;
  github?: string;
  major: string;
  grade: number;
  badge?: string;
  score: string;
  createdAt: string;
}

export interface MsgInfo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjInfo {
  id: number;
  title: string;
  content: string;
  stack: string;
  members: string;
  createdAt: string;
  updatedAt: string;
}

export  interface ActiInfo {
  id: number;
  intro: string;
  detail: string;
  sdate: string;
  edate: string;
  joiners: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}


export enum RoleEnum {
  ADMIN = 'ADMIN',
  CZ_MEMBER = 'CZ_MEMBER',
  COMMON = 'COMMON',
}
