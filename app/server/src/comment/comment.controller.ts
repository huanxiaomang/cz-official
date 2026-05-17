import {
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('sort', new DefaultValuePipe('latest')) sort: string,
    @Query('category') category?: string,
    @Query('include_deleted') includeDeleted?: string,
  ) {
    const include = includeDeleted === 'true';
    return this.commentService.findAll(page, pageSize, sort, include, category);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Auth()
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser('userId') userId: number,
    @CurrentUser('role') userRole?: string,
  ) {
    return this.commentService.create(createCommentDto, userId, userRole);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser('userId') userId: number,
    @CurrentUser('role') userRole?: string,
  ) {
    return this.commentService.update(id, updateCommentDto, userId, userRole);
  }

  @Auth()
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
    @CurrentUser('role') userRole?: string,
  ) {
    return this.commentService.remove(id, userId, userRole);
  }

  @Auth()
  @Post(':id/like')
  async like(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ) {
    return this.commentService.toggleLike(id, userId);
  }
}
