import { Module } from '@nestjs/common';
import { AuthOwnService } from './auth-own.service';
import { AuthOwnController } from './auth-own.controller';
import { AuthOwnRepository } from './auth-own-repository';

@Module({
  controllers: [AuthOwnController],
  providers: [AuthOwnService, AuthOwnRepository],
})
export class AuthOwnModule {}
