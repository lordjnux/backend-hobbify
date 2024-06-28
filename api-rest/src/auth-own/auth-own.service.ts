import {
  Injectable,
  NotFoundException,
  // , NotFoundException
} from '@nestjs/common';
import { CredentialsDto } from '../dtos/auth-own/credentials-auth-own.dto';
import { AuthOwnRepository } from './auth-own-repository';
import { ResponseRepositories } from '../../src/util/response-repositories';
import { ResponseToControllers } from '../../src/util/response-controllers';

@Injectable()
export class AuthOwnService {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  constructor(private readonly authOwnRepository: AuthOwnRepository) {}

  async login(credentials: CredentialsDto): Promise<ResponseToControllers> {
    const { email } = credentials;

    const existsUser: ResponseRepositories =
      await this.authOwnRepository.getUserByEmail(email);

    if (
      existsUser.error ||
      !existsUser.data ||
      existsUser.data.password != credentials.password // TODO: Integrar bcrypt.compare
    )
      throw new NotFoundException('Invalid credentials.');

    return {
      status: 200,
      message: 'Credentials is valid',
      data: existsUser.data,
    };
  }
}
