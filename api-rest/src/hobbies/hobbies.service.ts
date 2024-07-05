import { Injectable } from '@nestjs/common';
import { HobbiesRepository } from './hobbies.repository';
import { CreateHobbyDto, UpdateHobbyDto } from '../dtos/hobby.dto';

@Injectable()
export class HobbiesService {
  constructor(private readonly hobbiesRepository: HobbiesRepository) {}

  async createHobbie(createHobbyDto: CreateHobbyDto) {
    return await this.hobbiesRepository.createHobbie(createHobbyDto);
  }

  async findAllHobbies() {
    return await this.hobbiesRepository.findAllHobbies();
  }

  async findOneHobbie(id: number) {
    return await this.hobbiesRepository.findOneHobbie(id);
  }

  async updateHobbie(id: number, updateHobbyDto: UpdateHobbyDto) {
    return await this.hobbiesRepository.updateHobbie(id, updateHobbyDto);
  }

  async removeHobbie(id: number) {
    return await this.hobbiesRepository.removeHobbie(id);
  }
}
