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
import { Chat } from './entities/chats.entity';
import { PaymentsEntity } from './entities/payments.entity';
import { SuscriptionEntity } from './entities/suscription.entity';
import { FeaturesEntity } from './entities/features.entity';
import { MongodbModule } from './mongodb/mongodb.module';
import { HobbiesModule } from './hobbies/hobbies.module';
import { StripeModule } from './stripe/stripe.module';
import { UploadDataService } from './util/uploadData';
import { HobbiesEntity } from './entities/hobbies.entity';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),

    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
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
      Chat,
      PaymentsEntity,
      SuscriptionEntity,
      FeaturesEntity,
      HobbiesEntity,
    ]),
    CloudinaryModule,
    UsersModule,
    MongodbModule,
    HobbiesModule,
    StripeModule,
    ChatModule,
  ],
  controllers: [MongodbController],
  providers: [MongodbService, MongodbRepository, UploadDataService],
})
export class AppConfigModule {}
