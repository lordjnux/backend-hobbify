import { Injectable } from '@nestjs/common';
import { BanUserDto, CreateAdminDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService { 
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll()
  }

  findById(id: string) {
    return this.usersRepository.findByIdUser(id)
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.usersRepository.createAdmin(createAdminDto)
  }

  banUser(userId: string, banUserDto: BanUserDto) {
    return this.usersRepository.banUser(userId, banUserDto)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.UpdateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
