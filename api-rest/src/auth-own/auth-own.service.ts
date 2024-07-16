import {
  BadRequestException,
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
import { Role } from '../roles/roles.enum';
import { plainToClass } from 'class-transformer';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class AuthOwnService {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInUser: CreateUserDto) {
    return await this.usersRepository.signIn(signInUser);
  }

  async login(credentials: LoginUserDto): Promise<ResponseToControllers> {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Email and password are required');
    }

    const existsUser: ResponseRepositories =
      await this.usersRepository.findByCredentials(credentials);

    if (existsUser.error || !existsUser.data) {
      throw new NotFoundException('Invalid credentials.');
    }

    console.log('Exists user:', existsUser); // Log the retrieved user data

    const isValidCredentials = await bcrypt.compare(
      credentials.password,
      existsUser.data.password,
    );

    if (!isValidCredentials) {
      throw new NotFoundException('Invalid credentials.');
    }

    console.log('User isAdmin:', existsUser.data.isAdmin);

    const userPayload = {
      id: existsUser.data.id,
      email: existsUser.data.email,
      roles: existsUser.data.isAdmin ? [Role.Admin] : [Role.User],
    };

    console.log(userPayload.roles);

    const token = this.jwtService.sign(userPayload, {
      secret: process.env.AUTH0_SECRET,
    });

    return {
      status: 200,
      message: 'Credentials are valid, successful login',
      data: {
        token,
        userData: { ...existsUser.data, password: undefined },
      },
    };
  }
}
