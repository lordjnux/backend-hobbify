import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzeroModule } from './authzero/authzero.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { AuthOwnModule } from './auth-own/auth-own.module';
import { AppConfigModule } from './app.config.module';

@Module({
  imports: [
    AppConfigModule,
    AuthzeroModule,
    AuthOwnModule,
    ConfigModule.forRoot(),
    MongodbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
