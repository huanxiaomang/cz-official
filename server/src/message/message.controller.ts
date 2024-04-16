import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Auth, isCZMember } from '@/auth/decorators/auth.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Get()
  async findAll() {
    return this.messageService.findAll();
  }

  @Auth()
  @Post('/create')
  create(@Body() createmessageDto: CreateMessageDto) {
    return this.messageService.create(createmessageDto);
  }

  @Auth()
  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateArticleDto);
  }

  @Auth()
  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id)
  }
}
