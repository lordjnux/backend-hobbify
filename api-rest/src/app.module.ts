import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzeroModule } from './authzero/authzero.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { AuthOwnModule } from './auth-own/auth-own.module';
import { AppConfigModule } from './app.config.module';
import { HobbiesModule } from './hobbies/hobbies.module';
import { WebhookModule } from './webhook/webhook.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authzero/auth/auth.guard';

@Module({
  imports: [
    AppConfigModule,
    AuthzeroModule,
    AuthOwnModule,
    ConfigModule.forRoot(),
    MongodbModule,
    HobbiesModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
