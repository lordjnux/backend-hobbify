import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from './mongodb/models/chat.model';
import { messageSchema } from './mongodb/models/message.model';
import { AppService } from './app.service';
import { MongodbService } from './mongodb/mongodb.service';
import { MongodbRepository } from './mongodb/mongodb.repository';
import { MongodbController } from './mongodb/mongodb.controller';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGODB_USER')}:${configService.get('MONGODB_PASSWORD')}@${configService.get('MONGODB_CLUSTER')}.jafvbnl.mongodb.net/${configService.get('MONGODB_DATABASE')}?retryWrites=true&w=majority&appName=Micluster`,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'Chat', schema: chatSchema },
      { name: 'Message', schema: messageSchema },
    ]),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
  ],
  controllers: [MongodbController],
  providers: [MongodbService, MongodbRepository],
})
export class AppConfigModule {}
