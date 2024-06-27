import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthzeroService } from './authzero.service';
import { AuthGuard } from './auth/auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthzeroController {
  constructor(private readonly authService: AuthzeroService) {}

  @Get('authredirect')
  externalAuthenticated() {
    console.log('externalAuthenticated...');

    return this.authService.externalAuthenticated();
  }
}
