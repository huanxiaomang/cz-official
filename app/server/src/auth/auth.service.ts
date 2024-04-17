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

  async getCZMembers() {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'CZ_MEMBER'
      }
    })
    return await Promise.all(users.map(async (u) => await this.serializeUser(u)));
  }

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
        email: dto.email,
      },
    })
    return await this.serializeUser(user)

  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })




    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误')
    }
    return await this.serializeUser(user)
  }

  async updateUser(dto: UpdateUserDto, token) {
    const id = (await this.decodeToken(token) as any).sub;

    // 更新用户信息
    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        avatar: dto.avatar,
        background: dto.background,
        description: dto.description,
        github: dto.github,
        password: await hash(dto.password)
      },
    })
    return this.token(user)
  }

  private async token({ id, name }) {
    return await this.jwt.signAsync({
        name,
        sub: id,
      })

  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwt.decode(token);
      return decoded;
    } catch (error) {
      // 处理解密失败的情况
      throw new BadRequestException('token 无效');
    }
  }

  async serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      github: user.github,
      background: user.background,
      description: user.description,
      token: await this.token(user)
    }
  }
}
