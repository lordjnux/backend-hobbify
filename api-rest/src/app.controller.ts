import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({
    status: 200,
    description: 'Devuelve estring: "Ejemplo privado".',
  })
  getEjemploPrivado(): string {
    return this.appService.getEjemploPrivado();
  }
}
