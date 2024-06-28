import { Injectable } from '@nestjs/common';
import { UserMockEntity, usersMock } from './usersMock';
import { ResponseRepositories } from 'src/util/response-repositories';
import { CredentialsDto } from 'src/dtos/auth-own/credentials-auth-own.dto';

@Injectable()
export class AuthOwnRepository {
  private responseRepositories: ResponseRepositories = {
    error: false,
    message: '',
    data: undefined,
  };

  async getUserByEmail(email: string): Promise<ResponseRepositories> {
    this.responseRepositories = new ResponseRepositories();
    try {
      //TODO: REEMPLAZAR ESTA FUENTE DE DATOS POR LA DE LA BASE DE DATOS
      const result: UserMockEntity = await usersMock.filter(
        (user: UserMockEntity) => user.email == email,
      )[0];
      this.responseRepositories.data = result ?? undefined;
    } catch (error: any) {
      console.error(error);

      this.responseRepositories = {
        error: true,
        message: error.message,
        data: error,
      };
    } finally {
      return this.responseRepositories;
    }
  }
}
