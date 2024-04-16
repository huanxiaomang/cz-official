import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import RegisterDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import { user } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'
import UpdateUserDto from './dto/updateUser.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
        email: dto.email,
      },
    })
    return this.token(user)
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(dto.id),
      },
    })

    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误')
    }
    return this.token(user)
  }

  async updateUser(dto: UpdateUserDto) {
    // 更新用户信息
    const user = await this.prisma.user.update({
      where: {
        id: Number(dto.id),
      },
      data: {
        name: dto.name,
        avatar: dto.avatar,
        background: dto.background,
        description: dto.description,
        email: dto.email,
        github: dto.github,
        password: dto.password
      },
    })
    return this.token(user)
  }

  private async token({ id, name }) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }),
    }
  }
}
