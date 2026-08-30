import { PrismaService } from './../prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import RegisterDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'
import UpdateUserDto from './dto/updateUser.dto'
import ResetPasswordDto from './dto/reset-password.dto'
import { VerificationCodeService } from './verification-code.service'
import { randomBytes } from 'crypto'
import { normalizeAssetUrl } from '../common/asset-url'
import {
  getAcademicAnchorYear,
  getComputedGrade,
  getMemberAcademicLabel,
  getPersistedLegacyGrade,
  getResolvedMemberType,
  normalizeMemberType,
  resolveAdmissionYear,
} from '../common/member-profile'
import AdminUpdateUserDto from './dto/admin-update-user.dto'
import AdminQueryMembersDto from './dto/admin-query-members.dto'

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

  async setUserRole(userId, dto: AdminUpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        userId: Number(userId),
      },
    })

    if (!currentUser) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    const normalizedMemberType = normalizeMemberType(dto.memberType ?? currentUser.memberType, currentUser.badge);
    const admissionYear =
      normalizedMemberType === 'ADVISOR'
        ? null
        : resolveAdmissionYear(dto.admissionYear ?? currentUser.admissionYear, currentUser.grade);

    const user = await this.prisma.user.update({
      where: {
        userId: Number(userId)
      },
      data: {
        role: dto.role !== undefined ? dto.role : currentUser.role,
        memberType: normalizedMemberType,
        admissionYear,
        grade: getPersistedLegacyGrade(admissionYear, normalizedMemberType),
      },
    })
    return await this.serializeUser(user);
  }

  async getAllMembers() {
    const users = await this.prisma.user.findMany({})
    return await Promise.all(users.map(async (u) => await this.serializeUser(u)));
  }

  async getAdminMembers(dto: AdminQueryMembersDto) {
    const page = dto.page ?? 1
    const pageSize = dto.pageSize ?? 10
    const academicAnchorYear = getAcademicAnchorYear()

    const where: Prisma.UserWhereInput = {}

    if (dto.username) {
      where.username = {
        contains: dto.username,
      }
    }

    if (dto.role) {
      where.role = dto.role
    }

    if (dto.major) {
      where.major = {
        contains: dto.major,
      }
    }

    if (dto.memberType === 'ADVISOR') {
      where.memberType = 'ADVISOR'
    }
    else if (dto.memberType === 'GRADUATED') {
      where.OR = [
        { memberType: 'GRADUATED' },
        {
          AND: [
            { memberType: 'STUDENT' },
            {
              admissionYear: {
                lte: academicAnchorYear - 4,
              },
            },
          ],
        },
      ]
    }
    else if (dto.memberType === 'STUDENT') {
      where.memberType = 'STUDENT'
      where.admissionYear = {
        ...(typeof dto.admissionYear === 'number'
          ? { equals: dto.admissionYear }
          : { gt: academicAnchorYear - 4 }),
      }
    }

    if (dto.admissionYear && dto.memberType !== 'STUDENT') {
      where.admissionYear = dto.admissionYear
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count({ where }),
    ])

    return {
      items: await Promise.all(users.map(async (user) => await this.serializeUser(user))),
      total,
    }
  }

  async getAdminUserOptions() {
    return await this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
      },
      orderBy: {
        userId: 'asc',
      },
    })
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
    const invCode = await this.prisma.invitationCode.findUnique({
      where: { code: dto.invitationCode },
    });

    if (!invCode) {
      throw new BadRequestException('无效的邀请码');
    }
    if (invCode.usedCount >= invCode.maxUses) {
      throw new BadRequestException('邀请码使用次数已达上限');
    }
    if (invCode.expiresAt < new Date()) {
      throw new BadRequestException('邀请码已过期');
    }

    const admissionYear = resolveAdmissionYear(dto.admissionYear, dto.grade);

    const user = await this.prisma.$transaction(async (prisma) => {
      // 增加邀请码使用次数
      await prisma.invitationCode.update({
        where: { id: invCode.id },
        data: { usedCount: { increment: 1 } },
      });

      // 创建用户
      return prisma.user.create({
        data: {
          username: dto.username,
          password: await hash(dto.password),
          email: dto.email,
          major: dto.major,
          grade: getPersistedLegacyGrade(admissionYear, 'STUDENT'),
          admissionYear,
          memberType: 'STUDENT',
          role: 'CZ_MEMBER'
        },
      });
    });

    return {
      ...await this.serializeUser(user),
      token: await this.token(user)
    }

  }

  async generateInvitationCode(creatorId: number, maxUses: number, expireDays: number) {
    const code = randomBytes(4).toString('hex').toUpperCase(); // 8 characters
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expireDays);

    const invitationCode = await this.prisma.invitationCode.create({
      data: {
        code,
        maxUses,
        expiresAt,
        creatorId
      }
    });

    return invitationCode;
  }

  async getInvitationCodes() {
    return await this.prisma.invitationCode.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async deleteInvitationCode(id: number) {
    const invitationCode = await this.prisma.invitationCode.findUnique({
      where: { id: Number(id) },
    });

    if (!invitationCode) {
      throw new BadRequestException(`Invitation code with ID ${id} not found`);
    }

    await this.prisma.invitationCode.delete({
      where: { id: Number(id) },
    });

    return { success: true };
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
    const currentUser = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!currentUser) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    const admissionYear = resolveAdmissionYear(dto.admissionYear, dto.grade ?? currentUser.grade);
    const memberType = normalizeMemberType(currentUser.memberType, currentUser.badge);

    // 更新用户信息
    const user = await this.prisma.user.update({
      where: {
        userId
      },
      data: {
        username: dto.username,
        avatar: normalizeAssetUrl(dto.avatar),
        background: normalizeAssetUrl(dto.background),
        description: dto.description,
        github: dto.github,
        major: dto.major,
        grade: getPersistedLegacyGrade(admissionYear, memberType),
        admissionYear,
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
    const admissionYear = resolveAdmissionYear(user.admissionYear, user.grade);
    const memberType = getResolvedMemberType(admissionYear, user.memberType, user.badge);
    const grade = getComputedGrade(admissionYear, memberType);

    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: normalizeAssetUrl(user.avatar),
      github: user.github,
      major: user.major,
      grade: grade ?? (memberType === 'GRADUATED' ? 5 : 0),
      admissionYear,
      memberType,
      gradeLabel: getMemberAcademicLabel(admissionYear, memberType),
      badge: user.badge,
      background: normalizeAssetUrl(user.background),
      description: user.description,
      createdAt: user.createdAt
    }
  }
}
