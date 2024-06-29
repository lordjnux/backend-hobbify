import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import typeorm from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from './mongodb/models/chat.model';
import { messageSchema } from './mongodb/models/message.model';
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
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
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
    CloudinaryModule,
  ],
  controllers: [MongodbController],
  providers: [MongodbService, MongodbRepository],
})
export class AppConfigModule {}
