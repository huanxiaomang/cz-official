import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateWinnerDto } from '../winners/dto/create-winner.dto';
import { UpdateWinnerDto } from '../winners/dto/update-winner.dto';
import { normalizeAssetUrl } from '../common/asset-url';

const MEMBER_INCLUDE = {
  members: {
    include: { user: true },
    orderBy: { sortOrder: 'asc' as const },
  },
};

@Injectable()
export class WinnerService {
  constructor(private prisma: PrismaService) {}

  async getWinnersWithPagination(page = 1, pageSize = 10, title?: string, award?: string, category?: string) {
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (title) {
      where.title = { contains: title };
    }
    if (award) {
      where.award = { contains: award };
    }
    if (category) {
      where.category = category;
    }

    const [winners, total] = await Promise.all([
      this.prisma.winner.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: MEMBER_INCLUDE,
        skip,
        take: pageSize,
      }),
      this.prisma.winner.count({ where }),
    ]);

    return {
      winners: winners.map((winner) => this.serializeWinner(winner)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getWinners(category?: string) {
    const where: any = {};
    if (category) {
      where.category = category;
    }

    const winners = await this.prisma.winner.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: MEMBER_INCLUDE,
    });

    return winners.map((winner) => this.serializeWinner(winner));
  }

  async getWinnerById(id: number) {
    const winner = await this.prisma.winner.findUnique({
      where: { id },
      include: MEMBER_INCLUDE,
    });

    return winner ? this.serializeWinner(winner) : winner;
  }

  async createWinner(createWinnerDto: CreateWinnerDto) {
    const { title, award, category, avatar, memberIds } = createWinnerDto;

    if (!title || !award) {
      throw new BadRequestException('成就名称和获奖等级为必填字段');
    }

    const winner = await this.prisma.winner.create({
      data: {
        title,
        award,
        category: category || 'COMPETITION',
        avatar: normalizeAssetUrl(avatar) || null,
      },
    });

    if (memberIds && memberIds.length > 0) {
      await this.prisma.winnerMember.createMany({
        data: memberIds.map((userId, index) => ({
          winnerId: winner.id,
          userId,
          sortOrder: index,
        })),
      });
    }

    return this.getWinnerById(winner.id);
  }

  async batchCreateWinners(createWinnerDtos: CreateWinnerDto[]) {
    if (!createWinnerDtos || createWinnerDtos.length === 0) {
      throw new BadRequestException('成就数据不能为空');
    }

    const created = [];
    for (const dto of createWinnerDtos) {
      created.push(await this.createWinner(dto));
    }

    return {
      count: created.length,
      message: `成功创建 ${created.length} 条成就记录`,
    };
  }

  async updateWinner(id: number, updateWinnerDto: UpdateWinnerDto) {
    const existingWinner = await this.prisma.winner.findUnique({ where: { id } });
    if (!existingWinner) {
      throw new NotFoundException('成就不存在');
    }

    const { title, award, category, avatar, memberIds } = updateWinnerDto;

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (award !== undefined) data.award = award;
    if (category !== undefined) data.category = category || 'COMPETITION';
    if (avatar !== undefined) data.avatar = normalizeAssetUrl(avatar) || null;

    if (Object.keys(data).length > 0) {
      await this.prisma.winner.update({ where: { id }, data });
    }

    if (memberIds !== undefined) {
      await this.prisma.winnerMember.deleteMany({ where: { winnerId: id } });
      if (memberIds.length > 0) {
        await this.prisma.winnerMember.createMany({
          data: memberIds.map((userId, index) => ({
            winnerId: id,
            userId,
            sortOrder: index,
          })),
        });
      }
    }

    return this.getWinnerById(id);
  }

  async deleteWinner(id: number) {
    const existingWinner = await this.prisma.winner.findUnique({ where: { id } });
    if (!existingWinner) {
      throw new NotFoundException('成就不存在');
    }

    await this.prisma.winner.delete({ where: { id } });

    return true;
  }

  async batchDeleteWinners(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('删除ID列表不能为空');
    }

    const existingWinners = await this.prisma.winner.findMany({
      where: { id: { in: ids } },
    });

    if (existingWinners.length !== ids.length) {
      throw new BadRequestException('部分成就不存在');
    }

    const result = await this.prisma.winner.deleteMany({
      where: { id: { in: ids } },
    });

    return {
      count: result.count,
      message: `成功删除 ${result.count} 条成就记录`,
    };
  }

  async getWinnersByAward(award: string) {
    if (!award) {
      throw new BadRequestException('获奖等级参数不能为空');
    }

    const winners = await this.prisma.winner.findMany({
      where: { award: { contains: award } },
      include: MEMBER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });

    return winners.map((winner) => this.serializeWinner(winner));
  }

  async getWinnersByTitle(title: string) {
    if (!title) {
      throw new BadRequestException('成就名称参数不能为空');
    }

    const winners = await this.prisma.winner.findMany({
      where: { title: { contains: title } },
      include: MEMBER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });

    return winners.map((winner) => this.serializeWinner(winner));
  }

  async getWinnersStats() {
    const totalWinners = await this.prisma.winner.count();

    const awardStats = await this.prisma.winner.groupBy({
      by: ['award'],
      _count: { award: true },
    });

    const titleStats = await this.prisma.winner.groupBy({
      by: ['title'],
      _count: { title: true },
    });

    const categoryStats = await this.prisma.winner.groupBy({
      by: ['category'],
      _count: { category: true },
    });

    return {
      totalWinners,
      awardStats,
      titleStats,
      categoryStats,
    };
  }

  private serializeWinner(winner: any) {
    const { members, ...rest } = winner;
    return {
      ...rest,
      avatar: normalizeAssetUrl(winner.avatar),
      members: (members || []).map((member: any) => ({
        sortOrder: member.sortOrder,
        user: member.user
          ? {
              userId: member.user.userId,
              username: member.user.username,
              email: member.user.email,
              avatar: normalizeAssetUrl(member.user.avatar),
              major: member.user.major,
              badge: member.user.badge,
            }
          : null,
      })),
    };
  }
}
