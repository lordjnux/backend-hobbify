import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, LoginExternalUserDto } from '../dtos/user.dto';
import { UsersRepository } from '../users/users.repository';
import { Role } from '../roles/roles.enum';
import { ResponseRepositories } from '../util/response-repositories';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthzeroService {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async externalAuthenticated(externalUserDto: LoginExternalUserDto) {
    const existUser = await this.userRepository.findByEmail(
      externalUserDto.email,
    );

    if (existUser.error) {
      throw new InternalServerErrorException(
        'Ocurió un error.',
        existUser.message,
      );
    }
    let userPayload = {};

    if (existUser.data) {
      userPayload = {
        id: existUser.data.id,
        email: existUser.data.email,
        roles: existUser.data.isAdmin ? [Role.Admin] : [Role.User],
      };
    } else {
      const newExternalUser: CreateUserDto = {
        username: externalUserDto.username,
        email: externalUserDto.email,
        password: 'Password3$',
        confirmPassword: 'Password3$',
        isExternal: true,
        phone: 1234,
        country: '',
        city: '',
        biography: '',
        idealMate: '',
        hobbyIntensity: '',
      };

      const resulSigIn = await this.userRepository.signIn(newExternalUser);
      if (resulSigIn.error) {
        throw new InternalServerErrorException(
          'Ocurió un error.',
          existUser.message,
        );
      }

      userPayload = {
        id: resulSigIn.data.id,
        email: resulSigIn.data.email,
        roles: resulSigIn.data.isAdmin ? [Role.Admin] : [Role.User],
      };
      existUser.data = { ...resulSigIn.data };
    }

    const token = this.jwtService.sign(userPayload, {
      secret: process.env.AUTH0_SECRET,
    });

    return {
      status: 200,
      message: 'Successful external login',
      data: {
        token,
        userData: { ...existUser.data, password: undefined },
      },
    };
  }
}
