import { Module } from '@nestjs/common';
import { AuthOwnService } from './auth-own.service';
import { AuthOwnController } from './auth-own.controller';
import { AuthOwnRepository } from './auth-own-repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development.local' });

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), UsersModule, JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1h' },
    secret: process.env.AUTH0_SECRET,
  }),],
  controllers: [AuthOwnController],
  providers: [AuthOwnService, AuthOwnRepository],
})
export class AuthOwnModule {}
