import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import RegisterDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'
import UpdateUserDto from './dto/updateUser.dto'
import ResetPasswordDto from './dto/reset-password.dto'
import { VerificationCodeService } from './verification-code.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private verificationCodeService: VerificationCodeService
  ) { }

  async getUserInfo(userId) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userId: Number(userId)
        }
      })
      if (!user) {
        throw new BadRequestException(`User with ID ${userId} not found`);
      }
      return await this.serializeUser(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to get user info: ${error.message}`);
    }
  }

  async setUserRole(userId, role) {
    const user = await this.prisma.user.update({
      where: {
        userId: Number(userId)
      },
      data: {
        role
      },
    })
    return await this.serializeUser(user);
  }

  async getAllMembers() {
    const users = await this.prisma.user.findMany({})
    return await Promise.all(users.map(async (u) => await this.serializeUser(u)));
  }

  async getCZMembers() {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { role: 'CZ_MEMBER' },
          { role: 'ADMIN' }
        ]
      }
    })
    return await Promise.all(users.map(async (u) => await this.serializeUser(u)));
  }

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: await hash(dto.password),
        email: dto.email,
        major: dto.major,
        grade: dto.grade,
        role: 'COMMON'
      },
    })
    return {
      ...await this.serializeUser(user),
      token: await this.token(user)
    }

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
    return {
      ...await this.serializeUser(user),
      token: await this.token(user)
    }
  }

  async updateUser(dto: UpdateUserDto, token) {
    const userId = (await this.decodeToken(token) as any).sub;

    // 更新用户信息
    const user = await this.prisma.user.update({
      where: {
        userId
      },
      data: {
        username: dto.username,
        avatar: dto.avatar,
        background: dto.background,
        description: dto.description,
        github: dto.github,
        major: dto.major,
        grade: dto.grade,
        badge: dto.badge
      },
    })
    return {
      ...await this.serializeUser(user),
      token: await this.token(user)
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    // 1. 验证验证码
    await this.verificationCodeService.verifyCode(dto.email, dto.code, 'password_reset');

    // 2. 查找用户
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    // 3. 加密新密码并更新
    await this.prisma.user.update({
      where: { email: dto.email },
      data: { password: await hash(dto.newPassword) }
    });
  }

  private async token({ userId, username }) {
    return await this.jwt.signAsync({
      username,
      sub: userId,
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
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      github: user.github,
      major: user.major,
      grade: user.grade,
      badge: user.badge,
      background: user.background,
      description: user.description,
      createdAt: user.createdAt
    }
  }
}
