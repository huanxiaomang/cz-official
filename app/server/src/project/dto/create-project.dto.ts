
import { IsNotEmpty } from 'class-validator'

export class CreateProjectDto {
  @IsNotEmpty({ message: '标题不能为空' })
  title: string
  @IsNotEmpty({ message: '内容不能为空' })
  content: string
  @IsNotEmpty({ message: '技术栈不能为空' })
  stack: string
  @IsNotEmpty({ message: '成员不能为空' })
  members: string

}
