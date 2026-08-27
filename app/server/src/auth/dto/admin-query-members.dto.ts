import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export default class AdminQueryMembersDto {
  @IsOptional()
  @IsString({ message: '用户名格式不正确' })
  username?: string

  @IsOptional()
  @IsString({ message: '角色格式不正确' })
  role?: string

  @IsOptional()
  @IsString({ message: '专业格式不正确' })
  major?: string

  @IsOptional()
  @IsString({ message: '成员身份格式不正确' })
  memberType?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '入学年份格式不正确' })
  admissionYear?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '页码格式不正确' })
  @Min(1, { message: '页码不能小于 1' })
  page?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '分页大小格式不正确' })
  @Min(1, { message: '分页大小不能小于 1' })
  @Max(100, { message: '分页大小不能大于 100' })
  pageSize?: number
}
