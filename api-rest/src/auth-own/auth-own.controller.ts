import { Controller, Body, Get } from '@nestjs/common';
import { AuthOwnService } from './auth-own.service';
import { CredentialsDto } from '../dtos/auth-own/credentials-auth-own.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth-own')
@ApiTags('auth-own')
export class AuthOwnController {
  constructor(private readonly authOwnService: AuthOwnService) {}

  @Get("login")
  @ApiOperation({ summary: 'Method to login througth own system of hobbify' })
  @ApiResponse({
    status: 200,
    description: 'Credentials sent are ok',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Some internal errors from backend server',
  })
  @ApiBody({ description: 'Credentials to acces', type: CredentialsDto })
  login(@Body() credentials: CredentialsDto) {
    // TODO: IMPLEMENTAR INTERCEPTOR PARA VALIDACION DE FORMATOS CORRECTOS EN EMAIL Y PASSWORD
    return this.authOwnService.login(credentials);
  }
}
