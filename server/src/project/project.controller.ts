import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { Auth } from '@/auth/decorators/auth.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }
  @Auth()
  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Auth()
  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateArticleDto);
  }

  @Auth()
  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id)
  }
}
