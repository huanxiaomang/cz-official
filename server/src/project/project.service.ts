import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const projects = await this.prisma.project.findMany({});
    return {
      data: projects
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    // 更新项目
    const project = await this.prisma.project.update({
      where: {
        id: id
      },
      data: updateProjectDto
    });
    return {
      data: project
    }
  }

  async create(createProjectDto: CreateProjectDto) {
    // 创建项目
    const project = await this.prisma.project.create({
      data: createProjectDto
    });
    return {
      data: project
    }
  }

  async remove(id: number) {
    // 删除项目
    const project = await this.prisma.project.delete({
      where: {
        id: id
      }
    });
    return {
      data: project
    }
  }
}
