import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateWinnerDto } from '../winners/dto/create-winner.dto';
import { UpdateWinnerDto } from '../winners/dto/update-winner.dto';

@Injectable()
export class WinnerService {
  constructor(private prisma: PrismaService) {}

  async getWinnersWithPagination(page = 1, pageSize = 10, name?: string, competition?: string, award?: string) {
    const skip = (page - 1) * pageSize;
    
    // 构建查询条件
    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }
    if (competition) {
      where.competition = { contains: competition };
    }
    if (award) {
      where.award = { contains: award };
    }

    const [winners, total] = await Promise.all([
      this.prisma.winner.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: pageSize
      }),
      this.prisma.winner.count({ where })
    ]);

    return {
      winners,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  }

  async getWinners() {
    return await this.prisma.winner.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getWinnerById(id: number) {
    return await this.prisma.winner.findUnique({
      where: { id }
    });
  }

  async createWinner(createWinnerDto: CreateWinnerDto) {
    const { name, competition, award, avatar } = createWinnerDto;

    // 验证必填字段
    if (!name || !competition || !award) {
      throw new BadRequestException('姓名、比赛名称和获奖等级为必填字段');
    }

    return await this.prisma.winner.create({
      data: {
        name,
        competition,
        award,
        avatar: avatar || null
      }
    });
  }

  async batchCreateWinners(createWinnerDtos: CreateWinnerDto[]) {
    if (!createWinnerDtos || createWinnerDtos.length === 0) {
      throw new BadRequestException('获奖者数据不能为空');
    }

    // 验证所有数据
    for (const dto of createWinnerDtos) {
      if (!dto.name || !dto.competition || !dto.award) {
        throw new BadRequestException('姓名、比赛名称和获奖等级为必填字段');
      }
    }

    const winners = await this.prisma.winner.createMany({
      data: createWinnerDtos.map(dto => ({
        name: dto.name,
        competition: dto.competition,
        award: dto.award,
        avatar: dto.avatar || null
      }))
    });

    return {
      count: winners.count,
      message: `成功创建 ${winners.count} 条获奖者记录`
    };
  }

  async updateWinner(id: number, updateWinnerDto: UpdateWinnerDto) {
    const { name, competition, award, avatar } = updateWinnerDto;

    // 检查获奖者是否存在
    const existingWinner = await this.prisma.winner.findUnique({
      where: { id }
    });

    if (!existingWinner) {
      throw new NotFoundException('获奖者不存在');
    }

    // 验证必填字段
    if (!name || !competition || !award) {
      throw new BadRequestException('姓名、比赛名称和获奖等级为必填字段');
    }

    return await this.prisma.winner.update({
      where: { id },
      data: {
        name,
        competition,
        award,
        avatar: avatar || null
      }
    });
  }

  async deleteWinner(id: number) {
    // 检查获奖者是否存在
    const existingWinner = await this.prisma.winner.findUnique({
      where: { id }
    });

    if (!existingWinner) {
      throw new NotFoundException('获奖者不存在');
    }

    await this.prisma.winner.delete({
      where: { id }
    });

    return true;
  }

  async batchDeleteWinners(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('删除ID列表不能为空');
    }

    // 检查所有ID是否存在
    const existingWinners = await this.prisma.winner.findMany({
      where: {
        id: { in: ids }
      }
    });

    if (existingWinners.length !== ids.length) {
      throw new BadRequestException('部分获奖者不存在');
    }

    const result = await this.prisma.winner.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return {
      count: result.count,
      message: `成功删除 ${result.count} 条获奖者记录`
    };
  }

  async getWinnersByAward(award: string) {
    if (!award) {
      throw new BadRequestException('获奖等级参数不能为空');
    }

    return await this.prisma.winner.findMany({
      where: {
        award: {
          contains: award
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getWinnersByCompetition(competition: string) {
    if (!competition) {
      throw new BadRequestException('比赛名称参数不能为空');
    }

    return await this.prisma.winner.findMany({
      where: {
        competition: {
          contains: competition
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getWinnersStats() {
    const totalWinners = await this.prisma.winner.count();
    
    const awardStats = await this.prisma.winner.groupBy({
      by: ['award'],
      _count: {
        award: true
      }
    });

    const competitionStats = await this.prisma.winner.groupBy({
      by: ['competition'],
      _count: {
        competition: true
      }
    });

    return {
      totalWinners,
      awardStats,
      competitionStats
    };
  }
}
