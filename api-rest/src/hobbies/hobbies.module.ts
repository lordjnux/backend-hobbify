import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbiesEntity } from 'src/entities/hobbies.entity';
import { HobbiesController } from './hobbies.controller';
import { HobbiesService } from './hobbies.service';
=======
import { HobbiesService } from './hobbies.service';
import { HobbiesController } from './hobbies.controller';
import { HobbiesRepository } from './hobbies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbiesEntity } from 'src/entities/hobbies.entity';
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5

@Module({
  imports: [TypeOrmModule.forFeature([HobbiesEntity])],
  controllers: [HobbiesController],
<<<<<<< HEAD
  providers: [HobbiesService],
=======
  providers: [HobbiesService, HobbiesRepository],
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
})
export class HobbiesModule {}
