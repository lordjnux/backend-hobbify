import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { HobbiesEntity } from '../entities/hobbies.entity';
import { CreateHobbyDto } from '../dtos/hobby.dto';
import users from './data/users.json';
import hobbies from './data/hobbies.json';

@Injectable()
export class UploadDataService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(HobbiesEntity)
    private readonly hobbiesRepository: Repository<HobbiesEntity>,
  ) {}
  async onApplicationBootstrap() {
    await this.addUsers(users);
    console.log('Users added');
    await this.addHobbies(hobbies);
    console.log('Hobbies added');
  }

  async addUsers(users: CreateUserDto[]): Promise<void> {
    await Promise.all(
      users.map(async (user) => {
        const userEntity = new UsersEntity();
        userEntity.username = user.username;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.phone = user.phone;
        userEntity.country = user.country;
        userEntity.city = user.city;
        const existingUser = await this.userRepository.findOneBy({
          email: user.email,
        });
        if (!existingUser) await this.userRepository.save(userEntity);
      }),
    );
  }

  async addHobbies(hobbies: CreateHobbyDto[]): Promise<void> {
    await Promise.all(
      hobbies.map(async (hobbie) => {
        const hobbieEntity = new HobbiesEntity();
        hobbieEntity.name = hobbie.name;
        hobbieEntity.emoji = hobbie.emoji;
        const existingHobbie = await this.hobbiesRepository.findOneBy({
          name: hobbie.name,
        });
        if (!existingHobbie) await this.hobbiesRepository.save(hobbieEntity);
      }),
    );
  }
}
