import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { Admin } from "../auth/decorators/auth.decorator";

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @Get()
  async findAll() {
    return this.activityService.findAll();
  }

  @Admin()
  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(+id);
  }

  @Admin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
}
