import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createHobbie(createHobbyDto: CreateHobbyDto) {
    const hobbieExisting = await this.hobbiesRepository.findOneBy({
      name: createHobbyDto.name,
    });
    if (hobbieExisting) throw new BadRequestException('Hobbie Existing');

    const newHobby = { ...createHobbyDto };
    return await this.hobbiesRepository.save(newHobby);
  }

  async findAllHobbies() {
    return await this.hobbiesRepository.find();
  }

  async findOneHobbie(id) {
    const hobbie = await this.hobbiesRepository.findOneBy({ hobbieId: id });
    if (!hobbie) throw new NotFoundException('Hobbie not found');
    return hobbie;
  }

  async updateHobbie(id, updateHobbyDto) {
    const hobbie = await this.hobbiesRepository.findOneBy({ hobbieId: id });
    if (!hobbie) throw new NotFoundException('Hobbie not found');
    await this.hobbiesRepository.update(id, updateHobbyDto);
    return 'Hobbie actualizado';
  }

  async removeHobbie(id) {
    const hobbie = await this.hobbiesRepository.findOneBy({ hobbieId: id });
    if (!hobbie) throw new NotFoundException('Hobbie not found');
    await this.hobbiesRepository.delete(id);
    return 'Hobbie eliminado';
  }
}
