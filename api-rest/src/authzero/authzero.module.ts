import { Module } from '@nestjs/common';
import { AuthzeroController } from './authzero.controller';
import { AuthzeroService } from './authzero.service';

@Module({
  controllers: [AuthzeroController],
  providers: [AuthzeroService]
})
export class AuthzeroModule {}
