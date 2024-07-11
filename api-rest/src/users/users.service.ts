import { Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
 
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.usersRepository.createAdmin(createAdminDto)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.UpdateUser(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
