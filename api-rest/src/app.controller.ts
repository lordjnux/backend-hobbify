import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './authzero/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HobbieDto } from './dtos/hobbie.dto';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/privado')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Ruta privada. Solo acceso después de login ok' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve estring: "Ejemplo privado".',
  })
  getEjemploPrivado(): string {
    return this.appService.getEjemploPrivado();
  }

  @Post()
  @ApiOperation({ summary: 'Ejemplo de un post' })
  @ApiResponse({
    status: 201,
    description: 'Hobbie creado satisfactoriamente.',
  })
  @ApiBody({ description: 'Item data', type: HobbieDto })
  create(@Body() createItemDto: HobbieDto) {
    return createItemDto;
  }
}
