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

export enum RoleEnum {
  ADMIN = 'ADMIN',
  CZ_MEMBER = 'CZ_MEMBER',
  COMMON = 'COMMON',
}
