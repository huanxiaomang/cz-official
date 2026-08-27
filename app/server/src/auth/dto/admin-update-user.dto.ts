import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { MEMBER_TYPES } from '../../common/member-profile';

export default class AdminUpdateUserDto {
  @IsOptional()
  @IsString({ message: '角色格式不正确' })
  role?: string;

  @IsOptional()
  @IsIn(MEMBER_TYPES, { message: '成员身份格式不正确' })
  memberType?: string;

  @IsOptional()
  @IsInt({ message: '入学年份格式不正确' })
  admissionYear?: number;
}
