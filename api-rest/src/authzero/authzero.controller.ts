import { Controller, Get } from '@nestjs/common';
import { AuthzeroService } from './authzero.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthzeroController {
  constructor(private readonly authService: AuthzeroService) {}

  @Get('authredirect')
  @ApiOperation({ summary: 'Ejemplo de ruta redirect manejada por Auth' })
  @ApiResponse({ status: 200, description: 'Redirect exitoso' })
  externalAuthenticated() {
    console.log('externalAuthenticated...');

    return this.authService.externalAuthenticated();
  }
}
