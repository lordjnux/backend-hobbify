import { Module } from '@nestjs/common';
import { AuthzeroController } from './authzero.controller';
import { AuthzeroService } from './authzero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.AUTH0_SECRET,
    }),
  ],
  controllers: [AuthzeroController],
  providers: [AuthzeroService],
})
export class AuthzeroModule {}
