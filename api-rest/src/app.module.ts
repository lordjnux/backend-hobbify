import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzeroModule } from './authzero/authzero.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthzeroModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
