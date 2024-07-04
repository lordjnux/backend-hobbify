import { BadRequestException, Injectable } from '@nestjs/common';
import { HobbiesEntity } from 'src/entities/hobbies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectRepository(HobbiesEntity)
    private readonly hobbiesRepository: Repository<HobbiesEntity>,
  ) {}

  async createHobbie(hobbie) {
    const foundedHobbie = await this.hobbiesRepository.findOneBy({
      name: hobbie.name,
    });
    if (foundedHobbie) throw new BadRequestException('Registered hobbie');

    await this.hobbiesRepository.save(hobbie);
    return this.hobbiesRepository.findOneBy({ name: hobbie.name });
  }

  async getHobbies() {
    return await this.hobbiesRepository.find();
  }
}
