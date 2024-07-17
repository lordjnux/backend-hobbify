import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './authzero/auth/auth.guard';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/privado')
  @ApiOperation({ summary: 'Ruta privada. Solo acceso después de login ok' })
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Devuelve estring: "Ejemplo privado".',
  })
  getEjemploPrivado() {
    return {
      status: 200,
      message: 'Credentials is valid, succesful login',
      data: true,
    };
  }
}
