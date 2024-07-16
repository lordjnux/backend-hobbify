import { Body, Controller, Post } from '@nestjs/common';
import { AuthzeroService } from './authzero.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginExternalUserDto } from '../dtos/user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthzeroController {
  constructor(private readonly authService: AuthzeroService) {}

  @Post('login')
  @ApiOperation({ summary: 'Ruta redirect por Auth0' })
  externalAuthenticated(@Body() externalUserDto: LoginExternalUserDto) {
    console.log('externalAuthenticated...');
    console.log(externalUserDto);
    return this.authService.externalAuthenticated(externalUserDto);
  }
}
