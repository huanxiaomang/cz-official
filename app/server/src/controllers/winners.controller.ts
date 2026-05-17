import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpStatus, HttpException } from '@nestjs/common';
import { WinnerService } from '../services/winners.service';
import { CreateWinnerDto } from '../winners/dto/create-winner.dto';
import { UpdateWinnerDto } from '../winners/dto/update-winner.dto';
import { Auth, Admin } from '../auth/decorators/auth.decorator';

@Controller('winners')
export class WinnersController {
  constructor(private readonly winnerService: WinnerService) {}

  @Get('test-auth')
  @Admin()
  async testAuth() {
    return {
      code: HttpStatus.OK,
      message: '认证测试成功',
      data: {
        timestamp: new Date().toISOString(),
        message: '您已成功通过管理员权限验证'
      }
    };
  }

  @Get()
  async getAllWinners() {
    try {
      const winners = await this.winnerService.getWinners();
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: winners
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '获取获奖者列表失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('page')
  async getWinnersWithPagination(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Query('name') name?: string,
    @Query('competition') competition?: string,
    @Query('award') award?: string
  ) {
    try {
      const result = await this.winnerService.getWinnersWithPagination(
        parseInt(page),
        parseInt(pageSize),
        name,
        competition,
        award
      );
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: result
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '获取获奖者分页数据失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('filter/award')
  async getWinnersByAward(@Query('award') award: string) {
    try {
      const winners = await this.winnerService.getWinnersByAward(award);
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: winners
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '筛选获奖者失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('filter/competition')
  async getWinnersByCompetition(@Query('competition') competition: string) {
    try {
      const winners = await this.winnerService.getWinnersByCompetition(competition);
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: winners
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '筛选获奖者失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('stats')
  async getWinnersStats() {
    try {
      const stats = await this.winnerService.getWinnersStats();
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: stats
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '获取统计数据失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getWinnerById(@Param('id') id: string) {
    try {
      const winner = await this.winnerService.getWinnerById(parseInt(id));
      if (!winner) {
        throw new HttpException({
          code: HttpStatus.NOT_FOUND,
          message: '获奖者不存在',
          error: 'Winner not found'
        }, HttpStatus.NOT_FOUND);
      }
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: winner
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '获取获奖者详情失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @Admin()
  async createWinner(@Body() createWinnerDto: CreateWinnerDto) {
    try {
      const winner = await this.winnerService.createWinner(createWinnerDto);
      return {
        code: HttpStatus.CREATED,
        message: '获奖者创建成功',
        data: winner
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '创建获奖者失败',
        error: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('batch')
  @Admin()
  async batchCreateWinners(@Body() createWinnerDtos: CreateWinnerDto[]) {
    try {
      const result = await this.winnerService.batchCreateWinners(createWinnerDtos);
      return {
        code: HttpStatus.CREATED,
        message: result.message,
        data: result
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '批量创建获奖者失败',
        error: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @Admin()
  async updateWinner(@Param('id') id: string, @Body() updateWinnerDto: UpdateWinnerDto) {
    try {
      const winner = await this.winnerService.updateWinner(parseInt(id), updateWinnerDto);
      if (!winner) {
        throw new HttpException({
          code: HttpStatus.NOT_FOUND,
          message: '获奖者不存在',
          error: 'Winner not found'
        }, HttpStatus.NOT_FOUND);
      }
      return {
        code: HttpStatus.OK,
        message: '获奖者信息更新成功',
        data: winner
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '更新获奖者信息失败',
        error: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @Admin()
  async deleteWinner(@Param('id') id: string) {
    console.log('收到删除请求', id);
    try {
      const result = await this.winnerService.deleteWinner(parseInt(id));
      if (!result) {
        throw new HttpException({
          code: HttpStatus.NOT_FOUND,
          message: '获奖者不存在',
          error: 'Winner not found'
        }, HttpStatus.NOT_FOUND);
      }
      return {
        code: HttpStatus.OK,
        message: '获奖者删除成功',
        data: null
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '删除获奖者失败',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('batch')
  @Admin()
  async batchDeleteWinners(@Body() body: { ids: number[] }) {
    try {
      const result = await this.winnerService.batchDeleteWinners(body.ids);
      return {
        code: HttpStatus.OK,
        message: result.message,
        data: result
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '批量删除获奖者失败',
        error: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
