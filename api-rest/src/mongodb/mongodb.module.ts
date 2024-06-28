import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongodbController } from './mongodb.controller';
import { MongodbRepository } from './mongodb.repository';
import { chatModel, chatSchema } from './models/chat.model';
import { messageModel, messageSchema } from './models/message.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: chatSchema }, { name: 'Message', schema: messageSchema }])],
  controllers: [MongodbController],
  providers: [MongodbService, MongodbRepository],
})
export class MongodbModule {}
