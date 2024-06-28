import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { IMessage } from './interfaces/message.interface';

@Controller('chats')
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}

  @Post(':chatId/messages')
  newMessage(@Body() messageData:IMessage, @Param('chatId') chatId: string): Promise<any> {

    return  this.mongodbService.newMessage(chatId, messageData);
  }

  @Post(':id')
  createChat(@Param('id') id: string) : any {
    console.log(id);
    
    return this.mongodbService.createChat(id);
  }

  @Get()
  findAll() {
    return this.mongodbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mongodbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMongodbDto: any) {
    return this.mongodbService.update(+id, updateMongodbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mongodbService.remove(+id);
  }
}
