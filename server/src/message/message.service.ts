import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const messages = await this.prisma.message.findMany({});
    return {
      data: messages
    }
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    // 更新项目
    const message = await this.prisma.message.update({
      where: {
        id: id
      },
      data: updateMessageDto
    });
    return {
      data: message
    }
  }

  async create(createMessageDto: CreateMessageDto) {
    // 创建项目
    const message = await this.prisma.message.create({
      data: createMessageDto
    });
    return {
      data: message
    }
  }

  async remove(id: number) {
    // 删除项目
    const message = await this.prisma.message.delete({
      where: {
        id: id
      }
    });
    return {
      data: message
    }
  }
}
