<<<<<<< HEAD
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
=======
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
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
  }
}
