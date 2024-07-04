import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HobbiesEntity } from '../entities/hobbies.entity';
import { ResponseRepositories } from 'src/util/response-repositories';
import { Repository } from 'typeorm';
import { CreateHobbyDto } from 'src/dtos/hobby.dto';

@Injectable()
export class HobbiesRepository {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  constructor(
    @InjectRepository(HobbiesEntity)
    private hobbiesRepository: Repository<HobbiesEntity>,
  ) {}

  async newHobby(createHobbyDto: CreateHobbyDto) {
    const newHobby = { ...createHobbyDto };
    return await this.hobbiesRepository.save(newHobby);
  }
}
