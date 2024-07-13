import { Controller, Body, Post } from '@nestjs/common';
import { AuthOwnService } from './auth-own.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';

@Controller('authown')
@ApiTags('authown')
export class AuthOwnController {
  constructor(private readonly authOwnService: AuthOwnService) {}

  @Post('login')
  @ApiOperation({ summary: 'Method to login througth own system of hobbify' })
  @ApiBody({ description: 'Credentials to acces', type: LoginUserDto })
  login(@Body() credentials: LoginUserDto) {
    // TODO: IMPLEMENTAR INTERCEPTOR PARA VALIDACION DE FORMATOS CORRECTOS EN EMAIL Y PASSWORD
    return this.authOwnService.login(credentials);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Method to create new user' })
  @ApiBody({
    description: 'Information to create new user',
    type: CreateUserDto,
  })
  async signIn(@Body() signInUser: CreateUserDto) {
    return await this.authOwnService.signIn(signInUser);
  }
}
