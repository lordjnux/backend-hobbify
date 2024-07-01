import { Module } from '@nestjs/common';
import { AuthOwnService } from './auth-own.service';
import { AuthOwnController } from './auth-own.controller';
import { AuthOwnRepository } from './auth-own-repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), UsersModule],
  controllers: [AuthOwnController],
  providers: [AuthOwnService, AuthOwnRepository],
})
export class AuthOwnModule {}
