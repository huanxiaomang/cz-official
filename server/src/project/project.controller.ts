import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { Admin, Auth } from '@/auth/decorators/auth.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }
    @Admin()
  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

    @Admin()
  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateArticleDto);
  }

    @Admin()
  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id)
  }
}
