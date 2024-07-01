import { Injectable } from '@nestjs/common';
import { ResponseRepositories } from 'src/util/response-repositories';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthOwnRepository {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  constructor(private readonly usersRepository: UsersRepository) {}

  
}
