import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, UsersEntity]), UsersModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
