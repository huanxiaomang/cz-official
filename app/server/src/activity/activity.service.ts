import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const activities = await this.prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return activities;
  }

  async create(createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: createActivityDto,
    });
  }

  async findOne(id: number) {
    return this.prisma.activity.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}
