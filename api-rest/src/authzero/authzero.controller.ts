import { Controller, Get } from '@nestjs/common';
import { AuthzeroService } from './authzero.service';

@Controller('auth')
export class AuthzeroController {
  constructor(private readonly authService: AuthzeroService) {}

  @Get('authredirect')
  externalAuthenticated() {
    console.log('externalAuthenticated...');

    return this.authService.externalAuthenticated();
  }
}
