import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { IMessage } from './interfaces/message.interface';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MessageDto, PutMessage } from './dtos/message.dto';
import { ReactionDto } from './dtos/reaction.dto';

@Controller('chats')
@ApiTags('chats')
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}


  @Get()
  @ApiOperation({ summary: 'Method to get all chats' })
  getChats (){
    return this.mongodbService.getChats()
  }

  @Get(':chatId')
  @ApiOperation({ summary: 'Method to get all messages of a chat' })
  @ApiParam({ name: 'chatId', type: String, description: 'Id of chat' })
  getChatMessages(@Param('chatId') chatId: string) {

    return this.mongodbService.getChatMessages(chatId)

  }

  @Get('user/:email')
  @ApiOperation({ summary: 'Method to get all messages of a user' })  
  @ApiBody({ description: 'Email of user' })
  getUserMessages(@Param('email') email: string) { 
    return this.mongodbService.getUserMessages(email)
  }

  @Post(':id')
  @ApiOperation({ summary: 'Method to create new chat' })
  @ApiParam({ name: 'id', type: String, description: 'Id of user' })
  createChat(@Param('id') id: string) : any {
    console.log(id);
    
    return this.mongodbService.createChat(id);
  }

  @Post('messages/reaction/:messageId')
  @ApiOperation({ summary: 'Method to add reaction to message' })
  @ApiParam({ name: 'messageId', type: String, description: 'Id of message' })
  addReaction(@Param('messageId') messageId: string, @Body() reaction: ReactionDto) {
    const {reactions} = reaction
    
    return this.mongodbService.addReaction(messageId, reactions)
  }


  @Post('messages/:chatId')
  @ApiOperation({ summary: 'Method to send new message' })
  @ApiParam({ name: 'chatId', type: String })
  @ApiBody({ description: 'Message to send', type: MessageDto })
  newMessage(@Body() messageData:IMessage, @Param('chatId') chatId: string): Promise<any> {

    return  this.mongodbService.newMessage(chatId, messageData);
  }

  @Put('messages/:messageId')
  @ApiOperation({ summary: 'Method to put a message' })
  @ApiParam({ name: 'messageId', type: String, description: 'Id of message' })
  putMessage(@Body() messageData: PutMessage,@Param('messageId') messageId: string) {

    return this.mongodbService.putMessage(messageId, messageData)


 }
 

  @Delete(':chatId')
  @ApiOperation({ summary: 'Method to delete a chat' })
  @ApiParam({ name: 'chatId', type: String, description: 'Id of chat' })
  deleteChat(@Param('chatId') chatId: string) {
     return this.mongodbService.deleteChat(chatId)
  }

  @Delete('messages/:messageId')
   @ApiOperation({ summary: 'Method to delete a message' })
   @ApiParam({ name: 'messageId', type: String, description: 'Id of message' })
   deleteMessage(@Param('messageId') messageId: string) {
       return this.mongodbService.deleteMessage(messageId)
  }

 
}
