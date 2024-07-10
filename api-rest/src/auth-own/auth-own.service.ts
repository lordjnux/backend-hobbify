import {
  Injectable,
  NotFoundException,
  // , NotFoundException
} from '@nestjs/common';
import { ResponseRepositories } from '../../src/util/response-repositories';
import { ResponseToControllers } from '../../src/util/response-controllers';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthOwnService {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  }

  constructor(
    private readonly usersRepository: UsersRepository,  
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInUser: CreateUserDto) {
    return await this.usersRepository.signIn(signInUser);
  }

  async login(credentials: LoginUserDto): Promise<ResponseToControllers> {
    const existsUser: ResponseRepositories =
      await this.usersRepository.findByCredentials(credentials);

    const isValidCredentials = await bcrypt.compare(
      credentials.password,
      existsUser.data.password,
    );

    if (existsUser.error || !existsUser.data || !isValidCredentials)
      throw new NotFoundException('Invalid credentials.');

    const userPayload = {
      id: existsUser.data.id,
      email: existsUser.data.email,
      isAdmin: existsUser.data.isAdmin,
    };
    const token = this.jwtService.sign(userPayload);

    return {
      status: 200,
      message: 'Credentials is valid, succesful login',
      data: token
    };
  }
}
