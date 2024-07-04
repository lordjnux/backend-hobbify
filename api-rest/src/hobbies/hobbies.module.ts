import { Module } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbiesController } from './hobbies.controller';
import { HobbiesRepository } from './hobbies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbiesEntity } from 'src/entities/hobbies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HobbiesEntity])],
  controllers: [HobbiesController],
  providers: [HobbiesService, HobbiesRepository],
})
export class HobbiesModule {}
