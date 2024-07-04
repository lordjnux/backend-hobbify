import { Injectable } from '@nestjs/common';
import { HobbiesRepository } from './hobbies.repository';
import { CreateHobbyDto, UpdateHobbyDto } from '../dtos/hobby.dto';

@Injectable()
export class HobbiesService {

  constructor(private readonly hobbiesRespository:HobbiesRepository){}

  async create(createHobbyDto: CreateHobbyDto) {
    return await this.hobbiesRespository.newHobby(createHobbyDto);
  }

  findAll() {
    return `This action returns all hobbies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hobby`;
  }

  update(id: number, updateHobbyDto: UpdateHobbyDto) {
    return `This action updates a #${id} hobby`;
  }

  remove(id: number) {
    return `This action removes a #${id} hobby`;
  }
}
