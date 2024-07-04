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
import { UsersModule } from './users/users.module';
import { UsersEntity } from './entities/users.entity';
import { ChatsEntity } from './entities/chats.entity';
import { PaymentsEntity } from './entities/payments.entity';
import { SuscriptionEntity } from './entities/suscription.entity';
import { FeaturesEntity } from './entities/features.entity';
import { MongodbModule } from './mongodb/mongodb.module';
import { HobbiesModule } from './hobbies/hobbies.module';
console.log(process.env.MONGODB_URI);

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
    TypeOrmModule.forFeature([
      UsersEntity,
      ChatsEntity,
      PaymentsEntity,
      SuscriptionEntity,
      FeaturesEntity,
    ]),
    CloudinaryModule,
    UsersModule,
    MongodbModule,
    HobbiesModule
  ],
  controllers: [MongodbController],
  providers: [MongodbService, MongodbRepository],
})
export class AppConfigModule {}
