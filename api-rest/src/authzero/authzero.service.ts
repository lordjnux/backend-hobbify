import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthzeroService {
  externalAuthenticated() {
    return 'usuario autenticado por servicio externo';
  }
}
