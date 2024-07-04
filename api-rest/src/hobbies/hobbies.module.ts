import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbiesEntity } from 'src/entities/hobbies.entity';
import { HobbiesController } from './hobbies.controller';
import { HobbiesService } from './hobbies.service';

@Module({
  imports: [TypeOrmModule.forFeature([HobbiesEntity])],
  controllers: [HobbiesController],
  providers: [HobbiesService],
})
export class HobbiesModule {}
